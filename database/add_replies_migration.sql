-- ==============================================================================
-- SCULPTURA: Add Threaded Reply to Comment Migration
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard
-- ==============================================================================

-- 1. Add parent_id column referencing comments(id)
ALTER TABLE public.comments 
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE;

-- 2. Add performance index for nested reply threads
CREATE INDEX IF NOT EXISTS idx_comments_parent_id 
ON public.comments (parent_id);

-- 3. Verify column addition
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'comments' AND column_name = 'parent_id';
