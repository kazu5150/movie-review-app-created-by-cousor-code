-- Matching App Database Schema
-- This replaces the movie review app with a matching app

-- Drop existing tables
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS movies;

-- User profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INTEGER CHECK (age >= 18 AND age <= 100) NOT NULL,
  gender VARCHAR(20) NOT NULL CHECK (gender IN ('男性', '女性', 'その他')),
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Likes table (stores who liked whom)
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(sender_id, receiver_id)
);

-- Matches table (created when mutual likes exist)
CREATE TABLE matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_a_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  user_b_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  matched_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_a_id, user_b_id)
);

-- Messages table (chat messages between matched users)
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for likes
CREATE POLICY "Users can view likes they sent or received" ON likes FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);
CREATE POLICY "Users can insert their own likes" ON likes FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can delete their own likes" ON likes FOR DELETE USING (auth.uid() = sender_id);

-- RLS Policies for matches
CREATE POLICY "Users can view their own matches" ON matches FOR SELECT USING (
  auth.uid() = user_a_id OR auth.uid() = user_b_id
);

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their matches" ON messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM matches 
    WHERE matches.id = messages.match_id 
    AND (matches.user_a_id = auth.uid() OR matches.user_b_id = auth.uid())
  )
);
CREATE POLICY "Users can insert messages in their matches" ON messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM matches 
    WHERE matches.id = messages.match_id 
    AND (matches.user_a_id = auth.uid() OR matches.user_b_id = auth.uid())
  )
);

-- Function to create match when mutual like exists
CREATE OR REPLACE FUNCTION create_match_on_mutual_like()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if there's already a like from receiver to sender
  IF EXISTS (
    SELECT 1 FROM likes 
    WHERE sender_id = NEW.receiver_id 
    AND receiver_id = NEW.sender_id
  ) THEN
    -- Create match with consistent ordering (smaller UUID first)
    INSERT INTO matches (user_a_id, user_b_id)
    VALUES (
      LEAST(NEW.sender_id, NEW.receiver_id),
      GREATEST(NEW.sender_id, NEW.receiver_id)
    )
    ON CONFLICT (user_a_id, user_b_id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create match on mutual like
CREATE TRIGGER create_match_trigger
  AFTER INSERT ON likes
  FOR EACH ROW
  EXECUTE FUNCTION create_match_on_mutual_like();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();