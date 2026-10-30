import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import { 
  isSupabaseConfigured, 
  getComments, 
  postComment 
} from '../lib/supabaseClient';
import { 
  MessageSquare, 
  Send, 
  Database, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Star, 
  RefreshCw, 
  Tag, 
  User, 
  Sparkles,
  ExternalLink,
  Code2,
  CornerDownRight,
  ChevronDown,
  ChevronUp,
  MessageCircleReply
} from 'lucide-react';

export default function CommunityWall({ initialArtworkFilter = 'all' }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Form states (Main discussion post)
  const [displayName, setDisplayName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [artworkId, setArtworkId] = useState(initialArtworkFilter !== 'all' ? initialArtworkFilter : 'general');
  const [rating, setRating] = useState(5);

  // Reply states (Threaded replies)
  const [replyingTo, setReplyingTo] = useState(null); // { id, name, artwork_id }
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replySubmitting, setReplySubmitting] = useState(false);
  const [replyError, setReplyError] = useState(null);
  const [expandedThreads, setExpandedThreads] = useState({});

  // Filter state for viewing
  const [viewFilter, setViewFilter] = useState(initialArtworkFilter);

  // Artwork mapping for tags
  const artworkLabels = {
    all: 'All Discussions',
    general: 'General Museum Experience',
    'people-power': 'People Power Monument',
    david: 'David (Michelangelo)',
    'the-thinker': 'The Thinker (Rodin)',
    'great-sphinx': 'The Great Sphinx of Giza',
    'christ-redeemer': 'Christ the Redeemer',
    studio: 'Digital Sculpture Studio',
  };

  const fetchCommentsList = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    const { data, error } = await getComments(viewFilter);
    if (error) {
      setErrorMessage(error.message || 'Failed to retrieve comments from Supabase PostgreSQL.');
      setComments([]);
    } else {
      setComments(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCommentsList();
  }, [viewFilter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    const cleanName = displayName.trim();
    const cleanText = commentText.trim();

    if (cleanName.length < 2 || cleanName.length > 60) {
      setErrorMessage('Please provide a display name between 2 and 60 characters.');
      return;
    }

    if (cleanText.length < 3 || cleanText.length > 1000) {
      setErrorMessage('Your comment must be between 3 and 1000 characters.');
      return;
    }

    if (!isSupabaseConfigured) {
      setErrorMessage('Supabase is not configured yet. Follow the manual setup instructions below to connect your database.');
      return;
    }

    setSubmitting(true);
    const { data, error } = await postComment({
      displayName: cleanName,
      commentText: cleanText,
      artworkId,
      rating
    });

    if (error) {
      setErrorMessage(`Database submission error: ${error.message}`);
    } else {
      setSuccessMessage('Your comment has been shared to the Supabase Community Wall!');
      setCommentText('');
      setDisplayName('');
      fetchCommentsList();
      setTimeout(() => setSuccessMessage(null), 5000);
    }
    setSubmitting(false);
  };

  // Reply Handlers
  const handleStartReply = (parentComment, targetAuthorName = null) => {
    setReplyingTo({
      id: parentComment.id,
      name: targetAuthorName || parentComment.display_name,
      artwork_id: parentComment.artwork_id || 'general'
    });
    setReplyError(null);
    // If target is another replier, pre-fill tag
    if (targetAuthorName && targetAuthorName !== parentComment.display_name) {
      setReplyText(`@${targetAuthorName} `);
    } else {
      setReplyText('');
    }
    // Auto-expand thread
    setExpandedThreads(prev => ({ ...prev, [parentComment.id]: true }));
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText('');
    setReplyError(null);
  };

  const handleToggleThread = (commentId) => {
    setExpandedThreads(prev => ({
      ...prev,
      [commentId]: prev[commentId] === false ? true : false
    }));
  };

  const isThreadExpanded = (commentId) => {
    // Default to true (expanded) unless user explicitly collapses it
    return expandedThreads[commentId] !== false;
  };

  const handleReplySubmit = async (e, parentComment) => {
    e.preventDefault();
    setReplyError(null);

    const cleanName = replyName.trim();
    const cleanText = replyText.trim();

    if (cleanName.length < 2 || cleanName.length > 60) {
      setReplyError('Please provide a display name between 2 and 60 characters.');
      return;
    }

    if (cleanText.length < 3 || cleanText.length > 1000) {
      setReplyError('Your reply must be between 3 and 1000 characters.');
      return;
    }

    setReplySubmitting(true);
    const { data, error } = await postComment({
      displayName: cleanName,
      commentText: cleanText,
      artworkId: parentComment.artwork_id || 'general',
      rating: 5,
      parentId: parentComment.id
    });

    if (error) {
      setReplyError(error.message);
    } else {
      setReplyText('');
      setReplyingTo(null);
      setExpandedThreads(prev => ({ ...prev, [parentComment.id]: true }));
      fetchCommentsList();
    }
    setReplySubmitting(false);
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Just now';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  // Group comments into hierarchy: Top-level threads and nested replies
  const parentIds = new Set(comments.map(c => c.id));
  const topLevelComments = comments.filter(c => !c.parent_id || !parentIds.has(c.parent_id));
  const repliesMap = comments.reduce((acc, c) => {
    if (c.parent_id && parentIds.has(c.parent_id)) {
      if (!acc[c.parent_id]) acc[c.parent_id] = [];
      acc[c.parent_id].push(c);
    }
    return acc;
  }, {});

  // Sort replies chronologically ascending (oldest first so it reads as a natural conversation)
  Object.keys(repliesMap).forEach(parentId => {
    repliesMap[parentId].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  });

  return (
    <section id="community-wall" className="py-24 bg-[#FAF8F4] border-t border-stone-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          tag="Community & Peer Exchange"
          title="The Sculpture Community Wall"
          subtitle="Share your insights, reply to classmate reflections, and discuss sculptural form together. Powered by persistent Supabase PostgreSQL."
        />

        {/* ======================================================== */}
        {/* CASE 1: SUPABASE NOT CONFIGURED (MANUAL SETUP NOTICE)    */}
        {/* ======================================================== */}
        {!isSupabaseConfigured && (
          <div className="max-w-4xl mx-auto mb-12 bg-white rounded-3xl border-2 border-stone-gray/40 p-6 sm:p-10 shadow-museum-lg animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                <Database className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display-serif text-2xl font-bold text-charcoal">
                    Supabase Database Waiting to Connect
                  </h3>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-stone-gray/20 text-charcoal-700 px-3 py-1 rounded-full">
                    Manual Setup Mode
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                  As instructed, SCULPTURA does not execute remote SQL or auto-generate credentials. 
                  The entire backend client code and SQL schema are generated and ready for your manual import!
                </p>

                {/* Quick Steps Box */}
                <div className="p-4 bg-ivory rounded-2xl border border-stone-gray/30 text-xs text-charcoal-800 space-y-2">
                  <span className="font-bold text-terracotta block uppercase tracking-wider text-[11px]">
                    4 Simple Steps to Activate Live Community Wall:
                  </span>
                  <ol className="list-decimal list-inside space-y-1.5 text-charcoal-700">
                    <li>
                      Open your <strong>Supabase Dashboard</strong> and navigate to the <strong>SQL Editor</strong>.
                    </li>
                    <li>
                      Copy and run the generated <code className="bg-white px-1.5 py-0.5 rounded-sm border border-stone-gray/30 font-mono text-terracotta font-semibold">database/schema.sql</code> file to create the <code className="font-mono">public.comments</code> table and RLS policies.
                    </li>
                    <li>
                      Create a <code className="bg-white px-1.5 py-0.5 rounded-sm border border-stone-gray/30 font-mono text-terracotta font-semibold">.env</code> file from <code className="font-mono">.env.example</code> with your project's <code className="font-mono">VITE_SUPABASE_URL</code> and <code className="font-mono">VITE_SUPABASE_ANON_KEY</code>.
                    </li>
                    <li>
                      Restart the local Vite server (<code className="font-mono">npm run dev</code>). Your community comments and threaded replies will immediately persist across all devices!
                    </li>
                  </ol>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-charcoal-500">
                  <span className="flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-terracotta" />
                    Schema Location: <code className="font-mono text-charcoal font-semibold">database/schema.sql</code>
                  </span>
                  <a 
                    href="#references" 
                    className="text-terracotta hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    View Setup Documentation in README →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Community Wall Layout: Submission Form & Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Left Column: Comment Submission Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-stone-gray/30 p-6 sm:p-8 shadow-museum sticky top-28">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-gray/20">
                <MessageSquare className="w-5 h-5 text-terracotta" />
                <h3 className="font-display-serif text-xl font-bold text-charcoal">
                  Start a Discussion
                </h3>
              </div>

              {/* Status Notifications */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Display Name */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal-500 block mb-1">
                    Your Name / Peer Alias *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-stone-dark" />
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Maria Santos (Student)"
                      maxLength={60}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-gray/40 bg-ivory/30 focus:bg-white focus:outline-hidden focus:border-terracotta"
                    />
                  </div>
                  <span className="text-[10px] text-charcoal-400 mt-0.5 block text-right">
                    {displayName.length}/60 chars
                  </span>
                </div>

                {/* Related Section / Artwork */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal-500 block mb-1">
                    Topic or Artwork
                  </label>
                  <div className="relative">
                    <Tag className="w-4 h-4 absolute left-3 top-3 text-stone-dark" />
                    <select
                      value={artworkId}
                      onChange={(e) => setArtworkId(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-gray/40 bg-ivory/30 focus:bg-white focus:outline-hidden focus:border-terracotta text-charcoal"
                    >
                      <option value="general">General Website & Impressions</option>
                      <option value="people-power">People Power Monument</option>
                      <option value="david">David by Michelangelo</option>
                      <option value="the-thinker">The Thinker by Rodin</option>
                      <option value="great-sphinx">Great Sphinx of Giza</option>
                      <option value="christ-redeemer">Christ the Redeemer</option>
                      <option value="studio">Digital Sculpture Studio Experience</option>
                    </select>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal-500 block mb-1">
                    Rating / Appreciation
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-charcoal-300 hover:text-amber-500 transition-colors focus:outline-hidden cursor-pointer"
                      >
                        <Star 
                          className={`w-5 h-5 ${
                            star <= rating 
                              ? 'text-amber-500 fill-amber-500' 
                              : 'text-stone-light'
                          }`} 
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-charcoal-600 ml-2">
                      {rating} of 5 Stars
                    </span>
                  </div>
                </div>

                {/* Comment Text */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal-500 block mb-1">
                    Comment / Reflection *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share what you learned about sculpture, techniques, or your reaction to the artworks..."
                    maxLength={1000}
                    className="w-full p-3 text-xs rounded-xl border border-stone-gray/40 bg-ivory/30 focus:bg-white focus:outline-hidden focus:border-terracotta leading-relaxed"
                  ></textarea>
                  <span className="text-[10px] text-charcoal-400 mt-0.5 block text-right">
                    {commentText.length}/1000 chars
                  </span>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-terracotta text-white font-semibold text-xs hover:bg-terracotta-dark transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{submitting ? 'Transmitting to Supabase...' : 'Publish Discussion'}</span>
                </button>

                {!isSupabaseConfigured && (
                  <p className="text-[10px] text-charcoal-400 text-center italic">
                    Submissions require Supabase URL and anon public key configuration in .env.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Right Column: Live Comments Feed & Threaded Replies */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Feed Filter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-gray/20 gap-3">
              <div className="flex items-center gap-2">
                <span className="font-display-serif text-lg font-bold text-charcoal">
                  Shared Feed
                </span>
                <span className="text-xs text-charcoal-500 font-semibold bg-ivory px-2.5 py-0.5 rounded-full border border-stone-gray/30">
                  {topLevelComments.length} Discussions • {comments.length} Total
                </span>
              </div>

              {/* Filter Dropdown & Refresh */}
              <div className="flex items-center gap-2">
                <select
                  value={viewFilter}
                  onChange={(e) => setViewFilter(e.target.value)}
                  className="text-xs py-1.5 px-3 rounded-lg border border-stone-gray/40 bg-white text-charcoal focus:outline-hidden focus:border-terracotta"
                >
                  <option value="all">All Discussions</option>
                  <option value="general">General Impressions</option>
                  <option value="people-power">People Power Monument</option>
                  <option value="david">David (Michelangelo)</option>
                  <option value="the-thinker">The Thinker</option>
                  <option value="great-sphinx">Great Sphinx</option>
                  <option value="christ-redeemer">Christ the Redeemer</option>
                  <option value="studio">Digital Studio</option>
                </select>

                <button
                  onClick={fetchCommentsList}
                  disabled={loading}
                  className="p-1.5 rounded-lg border border-stone-gray/30 bg-white text-charcoal-500 hover:text-terracotta transition-colors cursor-pointer"
                  title="Refresh Community Feed"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-terracotta' : ''}`} />
                </button>
              </div>
            </div>

            {/* Feed List Display */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(n => (
                  <div key={n} className="bg-white rounded-2xl p-6 border border-stone-gray/20 animate-pulse space-y-3">
                    <div className="h-4 bg-stone-light/40 rounded-sm w-1/4"></div>
                    <div className="h-3 bg-stone-light/20 rounded-sm w-full"></div>
                    <div className="h-3 bg-stone-light/20 rounded-sm w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : topLevelComments.length > 0 ? (
              <div className="space-y-5">
                {topLevelComments.map((comment) => {
                  const replies = repliesMap[comment.id] || [];
                  const isReplying = replyingTo?.id === comment.id;
                  const threadOpen = isThreadExpanded(comment.id);

                  return (
                    <div 
                      key={comment.id}
                      className="bg-white rounded-2xl border border-stone-gray/30 p-5 sm:p-6 hover:shadow-xs transition-shadow space-y-3"
                    >
                      {/* Comment Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-ivory border border-stone-gray/30 flex items-center justify-center font-bold text-xs text-charcoal">
                            {comment.display_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-xs text-charcoal">
                              {comment.display_name}
                            </h4>
                            <span className="text-[10px] text-charcoal-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(comment.created_at)}
                            </span>
                          </div>
                        </div>

                        {/* Tag & Rating */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-olive-dark bg-olive/10 px-2.5 py-0.5 rounded-full">
                            {artworkLabels[comment.artwork_id] || comment.artwork_id}
                          </span>
                          {comment.rating && (
                            <div className="flex text-amber-500">
                              {Array.from({ length: comment.rating }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-500" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Comment Text */}
                      <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light whitespace-pre-wrap">
                        {comment.comment_text}
                      </p>

                      {/* Comment Action Row: Reply Button & Thread Toggle */}
                      <div className="pt-2 border-t border-stone-gray/15 flex items-center justify-between text-xs">
                        <button
                          onClick={() => handleStartReply(comment)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:text-terracotta-dark transition-colors px-2.5 py-1 rounded-lg hover:bg-terracotta/10 cursor-pointer"
                        >
                          <CornerDownRight className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </button>

                        {replies.length > 0 && (
                          <button
                            onClick={() => handleToggleThread(comment.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-charcoal-500 hover:text-charcoal-800 transition-colors px-2 py-1 rounded-lg hover:bg-stone-gray/10 cursor-pointer"
                          >
                            <MessageCircleReply className="w-3.5 h-3.5 text-olive" />
                            <span>
                              {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                            </span>
                            {threadOpen ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* INLINE REPLY FORM */}
                      {isReplying && (
                        <form 
                          onSubmit={(e) => handleReplySubmit(e, comment)}
                          className="mt-3 p-4 rounded-xl bg-ivory/80 border border-stone-gray/30 space-y-3 animate-fadeIn"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-charcoal-700 flex items-center gap-1">
                              <CornerDownRight className="w-3.5 h-3.5 text-terracotta" />
                              Replying to <span className="text-terracotta font-bold">@{replyingTo.name}</span>
                            </span>
                            <button
                              type="button"
                              onClick={handleCancelReply}
                              className="text-charcoal-400 hover:text-charcoal-700 text-[11px] underline cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>

                          {replyError && (
                            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                              {replyError}
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                            <div className="sm:col-span-6">
                              <input
                                type="text"
                                required
                                value={replyName}
                                onChange={(e) => setReplyName(e.target.value)}
                                placeholder="Your name or alias *"
                                maxLength={60}
                                className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-gray/30 bg-white focus:outline-hidden focus:border-terracotta"
                              />
                            </div>
                            <div className="sm:col-span-6 flex justify-end items-center text-[10px] text-charcoal-400">
                              <span>{replyText.length}/1000 chars</span>
                            </div>
                          </div>

                          <textarea
                            required
                            rows={2}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Write your reply to ${replyingTo.name}...`}
                            maxLength={1000}
                            className="w-full p-2.5 text-xs rounded-lg border border-stone-gray/30 bg-white focus:outline-hidden focus:border-terracotta leading-relaxed"
                          ></textarea>

                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={handleCancelReply}
                              className="px-3 py-1.5 text-xs rounded-lg text-charcoal-600 hover:bg-stone-gray/20 transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={replySubmitting}
                              className="px-4 py-1.5 text-xs rounded-lg bg-terracotta text-white font-medium hover:bg-terracotta-dark transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-xs"
                            >
                              {replySubmitting ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Send className="w-3.5 h-3.5" />
                              )}
                              <span>{replySubmitting ? 'Posting Reply...' : 'Post Reply'}</span>
                            </button>
                          </div>
                        </form>
                      )}

                      {/* NESTED THREADED REPLIES */}
                      {replies.length > 0 && threadOpen && (
                        <div className="mt-4 pt-3 border-t border-stone-gray/15 space-y-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block mb-2">
                            Thread Replies ({replies.length})
                          </span>
                          
                          {replies.map((reply) => (
                            <div 
                              key={reply.id} 
                              className="flex items-start gap-3 pl-3 sm:pl-4 border-l-2 border-terracotta/40 bg-ivory/40 p-3.5 rounded-r-xl hover:bg-ivory/70 transition-colors"
                            >
                              <div className="w-7 h-7 rounded-full bg-olive/15 border border-olive/30 flex items-center justify-center font-bold text-[11px] text-olive-dark shrink-0 mt-0.5">
                                {reply.display_name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex flex-wrap items-center justify-between gap-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-xs text-charcoal">
                                      {reply.display_name}
                                    </span>
                                    <span className="text-[9px] font-semibold text-olive-dark bg-olive/10 px-2 py-0.5 rounded-full">
                                      Peer Reply
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-charcoal-400">
                                    {formatDate(reply.created_at)}
                                  </span>
                                </div>
                                <p className="text-xs text-charcoal-700 leading-relaxed font-light whitespace-pre-wrap pt-0.5">
                                  {reply.comment_text}
                                </p>
                                
                                <div className="pt-1">
                                  <button
                                    onClick={() => handleStartReply(comment, reply.display_name)}
                                    className="text-[11px] font-medium text-terracotta hover:underline inline-flex items-center gap-1 cursor-pointer"
                                  >
                                    <CornerDownRight className="w-3 h-3" />
                                    <span>Reply to {reply.display_name}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-white rounded-2xl border border-stone-gray/30 p-12 text-center space-y-3">
                <MessageSquare className="w-8 h-8 text-stone-dark mx-auto" />
                <h4 className="font-display-serif text-lg font-bold text-charcoal">
                  No Comments on This Wall Yet
                </h4>
                <p className="text-xs text-charcoal-500 max-w-sm mx-auto leading-relaxed">
                  Be the first visitor to share a thought! Once submitted, comments will be stored in your 
                  connected Supabase database and seen by peers across devices.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
