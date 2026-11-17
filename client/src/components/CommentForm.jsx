import { useState } from 'react';

export default function CommentForm({ photoId, user, onAdded }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/photos/${photoId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, comment: text })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      onAdded(data);
      setText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input placeholder="Write a comment..." value={text} onChange={(e) => setText(e.target.value)} />
        <button className="btn" disabled={loading}>{loading ? 'Posting...' : 'Post'}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
}