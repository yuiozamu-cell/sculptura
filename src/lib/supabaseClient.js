import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check whether the user has provided valid environment variables
const isPlaceholderOrEmpty = (val) => {
  return !val || 
         val.includes('your-project-id') || 
         val.includes('your-anon-public-key') ||
         val.trim() === '';
};

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !isPlaceholderOrEmpty(supabaseUrl) && 
  !isPlaceholderOrEmpty(supabaseAnonKey)
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false // Anonymous public community wall does not require session persistence
      }
    })
  : null;

/**
 * Fetch approved comments from the Supabase 'comments' table.
 * Filtered by status = 'approved' and ordered by created_at descending.
 */
export async function getComments(artworkId = 'all') {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: null,
      error: new Error('Supabase is not configured yet. Please configure your .env file with your project URL and anon public key.')
    };
  }

  try {
    let query = supabase
      .from('comments')
      .select('id, display_name, comment_text, artwork_id, rating, status, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (artworkId && artworkId !== 'all') {
      query = query.eq('artwork_id', artworkId);
    }

    const { data, error } = await query;
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Insert a new comment into the Supabase 'comments' table.
 * Enforces client-side validation that matches RLS database check constraints.
 */
export async function postComment({ displayName, commentText, artworkId = 'general', rating = 5 }) {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: null,
      error: new Error('Supabase is not configured. Please connect your Supabase database before submitting comments.')
    };
  }

  const cleanName = displayName ? displayName.trim() : '';
  const cleanComment = commentText ? commentText.trim() : '';

  if (cleanName.length < 2 || cleanName.length > 60) {
    return { data: null, error: new Error('Name must be between 2 and 60 characters.') };
  }

  if (cleanComment.length < 3 || cleanComment.length > 1000) {
    return { data: null, error: new Error('Comment must be between 3 and 1000 characters.') };
  }

  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          display_name: cleanName,
          comment_text: cleanComment,
          artwork_id: artworkId,
          rating: Number(rating) || 5,
          status: 'approved' // matches RLS policy
        }
      ])
      .select();

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Fetch approved community 3D sculptures from the Supabase 'community_sculptures' table.
 */
export async function getCommunitySculptures() {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: null,
      error: new Error('Supabase is not configured yet. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.')
    };
  }

  try {
    const { data, error } = await supabase
      .from('community_sculptures')
      .select('id, title, artist_name, artist_statement, medium_id, image_data, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Publish a new 3D sculpture snapshot to the community showcase.
 */
export async function postCommunitySculpture({
  title,
  artistName,
  artistStatement,
  mediumId = 'soap',
  imageData,
  deleteToken
}) {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: null,
      error: new Error('Supabase is not configured yet.')
    };
  }

  const cleanTitle = (title || 'Untitled Sculpture').trim();
  const cleanArtist = (artistName || 'Anonymous Student').trim();
  const cleanStatement = (artistStatement || 'No statement provided.').trim();

  if (!imageData) {
    return { data: null, error: new Error('Sculpture snapshot image is required.') };
  }

  if (!deleteToken) {
    return { data: null, error: new Error('Delete token is required for owner controls.') };
  }

  try {
    const { data, error } = await supabase
      .from('community_sculptures')
      .insert([
        {
          title: cleanTitle,
          artist_name: cleanArtist,
          artist_statement: cleanStatement,
          medium_id: mediumId,
          image_data: imageData,
          delete_token: deleteToken,
          status: 'approved'
        }
      ])
      .select('id, title, artist_name, artist_statement, medium_id, image_data, created_at');

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Delete a sculpture from the community showcase using the creator's secret deleteToken.
 */
export async function deleteCommunitySculpture({ id, deleteToken }) {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: null,
      error: new Error('Supabase is not configured yet.')
    };
  }

  if (!id || !deleteToken) {
    return {
      data: null,
      error: new Error('Sculpture ID and owner delete token are required.')
    };
  }

  try {
    const { data, error } = await supabase
      .from('community_sculptures')
      .delete()
      .eq('id', id)
      .eq('delete_token', deleteToken);

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}
