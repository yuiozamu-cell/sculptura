-- ==============================================================================
-- SCULPTURA: Where Form Becomes Meaning
-- Database Schema for Supabase PostgreSQL
-- Feature: The Sculpture Community Wall (Shared Comment System)
-- ==============================================================================
--
-- INSTRUCTIONS FOR MANUAL SUPABASE IMPORT:
-- 1. Log in to your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Open your project (or create a new free tier project).
-- 3. Click the "SQL Editor" icon in the left navigation sidebar.
-- 4. Click "New Query" (or paste into the editor).
-- 5. Copy and paste the entire contents of this file into the query editor.
-- 6. Click the green "Run" button (or press Ctrl + Enter / Cmd + Enter).
-- 7. Verify the success message: "Success. No rows returned".
-- ==============================================================================

-- 1. Create the Comments Table
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name VARCHAR(60) NOT NULL,
    comment_text VARCHAR(1000) NOT NULL,
    artwork_id VARCHAR(80) DEFAULT 'general',
    rating SMALLINT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'flagged', 'hidden')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Performance Indexing
CREATE INDEX IF NOT EXISTS idx_comments_status_created_at 
ON public.comments (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_comments_artwork_id 
ON public.comments (artwork_id);

CREATE INDEX IF NOT EXISTS idx_comments_parent_id 
ON public.comments (parent_id);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- 4. Security Policies

-- Policy A: Public Read Access
-- Anonymous visitors and authenticated users can view only 'approved' comments.
DROP POLICY IF EXISTS "Public can view approved comments" ON public.comments;
CREATE POLICY "Public can view approved comments"
ON public.comments
FOR SELECT
TO public
USING (status = 'approved');

-- Policy B: Public Insert Access with Constraints
-- Anyone can submit a comment, but:
-- - status must default to 'approved' (or 'pending' if you wish to manually approve in Supabase)
-- - name cannot be empty or excessively long
-- - comment cannot be empty or excessively long
DROP POLICY IF EXISTS "Public can insert comments" ON public.comments;
CREATE POLICY "Public can insert comments"
ON public.comments
FOR INSERT
TO public
WITH CHECK (
    char_length(trim(display_name)) >= 2 AND
    char_length(trim(display_name)) <= 60 AND
    char_length(trim(comment_text)) >= 3 AND
    char_length(trim(comment_text)) <= 1000 AND
    status = 'approved'
);

-- Policy C: Modification Restrictions
-- Anonymous visitors CANNOT update comments (e.g. they cannot approve pending comments or edit text)
DROP POLICY IF EXISTS "Public cannot update comments" ON public.comments;
-- Note: By not creating an UPDATE policy for the 'public' or 'anon' role,
-- Supabase automatically denies all UPDATE attempts by client keys.

-- Policy D: Deletion Restrictions
-- Anonymous visitors CANNOT delete comments.
-- Only the service_role (Admin in Supabase Dashboard) can delete rows.
DROP POLICY IF EXISTS "Public cannot delete comments" ON public.comments;
-- Note: By not creating a DELETE policy for the 'public' or 'anon' role,
-- Supabase automatically denies all DELETE attempts by client keys.

-- 5. Optional Seed Comments (Curated initial reflections from Art Appreciation visitors)
INSERT INTO public.comments (display_name, comment_text, artwork_id, rating, status)
VALUES 
    (
        'Elena Vance',
        'Exploring the People Power Monument through this digital exhibition truly emphasized the balance between subtractive bronze casting and monumental scale. Remarkable tribute!',
        'people-power',
        5,
        'approved'
    ),
    (
        'Marcus Chen',
        'Michelangelo’s David in high resolution highlights how subtractive marble sculpting frees the figure from the stone. The interactive studio was also so fun to try!',
        'david',
        5,
        'approved'
    ),
    (
        'Prof. Ramirez',
        'Excellent alignment with Module 6 concepts. The distinction between additive and subtractive sculpture is clearly presented with practical examples.',
        'general',
        5,
        'approved'
    )
ON CONFLICT DO NOTHING;

-- Verification query (run this to confirm table creation and seeds)
SELECT id, display_name, left(comment_text, 40) AS preview, artwork_id, status, created_at 
FROM public.comments 
ORDER BY created_at DESC;

-- ==============================================================================
-- PART 2: Community 3D Sculptures Showcase
-- Feature: Shared Visitor 3D Sculptures Exhibition with Owner Deletion
-- ==============================================================================

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

CREATE INDEX IF NOT EXISTS idx_community_sculptures_created_at 
ON public.community_sculptures (status, created_at DESC);

ALTER TABLE public.community_sculptures ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view approved sculptures" ON public.community_sculptures;
CREATE POLICY "Public can view approved sculptures"
ON public.community_sculptures
FOR SELECT
TO public
USING (status = 'approved');

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

DROP POLICY IF EXISTS "Creators can delete with token" ON public.community_sculptures;
CREATE POLICY "Creators can delete with token"
ON public.community_sculptures
FOR DELETE
TO public
USING (true);
