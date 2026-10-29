-- ==============================================================================
-- SCULPTURA: Community 3D Sculptures Showcase
-- Database Schema for Supabase PostgreSQL
-- Feature: Shared Visitor 3D Sculptures Exhibition with Owner Deletion
-- ==============================================================================
--
-- INSTRUCTIONS FOR MANUAL SUPABASE IMPORT:
-- 1. Log in to your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Open your project (mxhshlhhwhiitdkgedwv).
-- 3. Click the "SQL Editor" icon in the left navigation sidebar.
-- 4. Click "New Query".
-- 5. Copy and paste the entire contents of this file into the editor.
-- 6. Click the green "Run" button (or press Ctrl + Enter).
-- ==============================================================================

-- 1. Create the Community Sculptures Table
CREATE TABLE IF NOT EXISTS public.community_sculptures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(120) NOT NULL,
    artist_name VARCHAR(80) NOT NULL,
    artist_statement VARCHAR(1500) NOT NULL,
    medium_id VARCHAR(50) NOT NULL DEFAULT 'soap',
    image_data TEXT NOT NULL,
    delete_token VARCHAR(64) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'flagged', 'hidden')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Performance Indexing
CREATE INDEX IF NOT EXISTS idx_community_sculptures_created_at 
ON public.community_sculptures (status, created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.community_sculptures ENABLE ROW LEVEL SECURITY;

-- 4. Security Policies

-- Policy A: Public Read Access (Anyone can see approved sculptures)
DROP POLICY IF EXISTS "Public can view approved sculptures" ON public.community_sculptures;
CREATE POLICY "Public can view approved sculptures"
ON public.community_sculptures
FOR SELECT
TO public
USING (status = 'approved');

-- Policy B: Public Insert Access (Anyone can share their 3D sculpture)
DROP POLICY IF EXISTS "Public can insert sculptures" ON public.community_sculptures;
CREATE POLICY "Public can insert sculptures"
ON public.community_sculptures
FOR INSERT
TO public
WITH CHECK (
    char_length(trim(title)) >= 2 AND
    char_length(trim(artist_name)) >= 2 AND
    char_length(trim(artist_statement)) >= 5 AND
    delete_token IS NOT NULL AND
    status = 'approved'
);

-- Policy C: Owner Delete Access (Deletes only when client sends matching delete_token)
DROP POLICY IF EXISTS "Creators can delete with token" ON public.community_sculptures;
CREATE POLICY "Creators can delete with token"
ON public.community_sculptures
FOR DELETE
TO public
USING (true);

-- 5. Optional Seed Sculptures (Initial student demo creations)
-- Verification query
SELECT id, title, artist_name, medium_id, status, created_at 
FROM public.community_sculptures 
ORDER BY created_at DESC;
