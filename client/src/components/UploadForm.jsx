import { useState } from 'react';

export default function UploadForm({ user, onUploaded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!file) {
      setError('Please choose an image');
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('description', description);
      data.append('userId', user._id);
      data.append('image', file);

      const res = await fetch('/api/photos', { method: 'POST', body: data });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setTitle('');
      setDescription('');
      setFile(null);
      form.reset();
      onUploaded();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h3>Add a photo</h3>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      {error && <p className="error">{error}</p>}
      <button className="btn" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
    </form>
  );
}