import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CommentForm from '../components/CommentForm';

export default function PhotoDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    fetch(`/api/photos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Photo not found');
        return res.json();
      })
      .then(data => setPhoto(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));

    fetch(`/api/photos/${id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this photo?')) return;
    const res = await fetch(`/api/photos/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user._id })
    });
    if (res.ok) {
      navigate('/gallery');
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error || !photo) {
    return (
      <div className="container">
        <p className="error">{error || 'Photo not found'}</p>
        <Link to="/gallery">Back to gallery</Link>
      </div>
    );
  }

  const isOwner = user && photo.userId?._id === user._id;

  return (
    <div className="container">
      <Link to="/gallery">&larr; Back to gallery</Link>

      <div className="detail">
        <img src={`/uploads/${photo.fileName}`} alt={photo.title} />
        <h2>{photo.title}</h2>
        <p className="meta">
          by {photo.userId?.firstName} {photo.userId?.lastName} · {new Date(photo.dateTime).toLocaleString()}
        </p>
        {photo.description && <p>{photo.description}</p>}
        {isOwner && <button className="btn" onClick={handleDelete}>Delete photo</button>}
      </div>

            <div className="comments-header">
        <h3>Comments ({comments.length})</h3>
        {user && (
          <button className="btn" onClick={() => setShowCommentForm(!showCommentForm)}>
            {showCommentForm ? 'Cancel' : 'Add comment'}
          </button>
        )}
      </div>

      {!user && <p>Please login to comment.</p>}

      {user && showCommentForm && (
        <CommentForm
          photoId={id}
          user={user}
          onAdded={(c) => {
            setComments([...comments, c]);
            setShowCommentForm(false);
          }}
        />
      )}

      <ul className="comments">
        {comments.map(c => (
          <li key={c._id}>
            <strong>{c.userId?.firstName} {c.userId?.lastName}</strong>{' '}
            <span className="meta">{new Date(c.dateTime).toLocaleString()}</span>
            <p>{c.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}