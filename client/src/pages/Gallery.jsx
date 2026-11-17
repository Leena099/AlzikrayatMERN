import { useState, useEffect } from 'react';
import PhotoCard from '../components/PhotoCard';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [view, setView] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
  }, []);

  return (
    <div className="container">
      <div className="gallery-header">
        <h2>Gallery</h2>
        <button className="btn" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
          {view === 'grid' ? 'List view' : 'Grid view'}
        </button>
      </div>

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