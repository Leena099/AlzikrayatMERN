import { Link } from 'react-router-dom';

export default function PhotoCard({ photo, view }) {
  return (
    <Link to={`/photos/${photo._id}`} className={`photo-card ${view}`}>
      <img src={`/uploads/${photo.fileName}`} alt={photo.title} />
      <div className="photo-info">
        <h3>{photo.title}</h3>
        <p>by {photo.userId?.firstName} {photo.userId?.lastName}</p>
      </div>
    </Link>
  );
}