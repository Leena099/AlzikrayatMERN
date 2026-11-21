import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import PhotoCard from '../components/PhotoCard';
import UploadForm from '../components/UploadForm';

export default function Gallery({ user }) {
  const [photos, setPhotos] = useState([]);
  const [view, setView] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    fetch('/api/photos')
      .then(res => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then(data => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load photos');
        setLoading(false);
      });
  }, [refresh]);

  useEffect(() => {
    const socket = io();
    socket.on('newPhoto', (data) => {
      setRefresh(r => r + 1);
      setNotice(`New photo: ${data.title}`);
      setTimeout(() => setNotice(''), 4000);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div className="container">
      <div className="gallery-header">
        <h2>Gallery</h2>
        <div className="header-buttons">
          {user && (
            <button className="btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : 'Add photo'}
            </button>
          )}
          <button className="btn" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
            {view === 'grid' ? 'List view' : 'Grid view'}
          </button>
        </div>
      </div>

      {notice && <p className="notice">{notice}</p>}

      {!user && <p>Please login to upload photos.</p>}

      {user && showForm && (
        <UploadForm
          user={user}
          onUploaded={() => {
            setRefresh(r => r + 1);
            setShowForm(false);
          }}
        />
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && photos.length === 0 && <p>No photos yet.</p>}

      <div className={`photos ${view}`}>
        {photos.map(photo => (
          <PhotoCard key={photo._id} photo={photo} view={view} />
        ))}
      </div>
    </div>
  );
}