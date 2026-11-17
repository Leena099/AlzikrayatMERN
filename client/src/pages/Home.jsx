import { Link } from 'react-router-dom';

export default function Home({ user }) {
  return (
    <div>
      <section className="banner">
        <h1>Alzikrayat</h1>
        <p>Your memories, shared with the people you love.</p>
        <div className="banner-buttons">
          <Link to="/gallery" className="btn">Browse the gallery</Link>
          {!user && <Link to="/login" className="btn">Login / Register</Link>}
        </div>
      </section>

      <div className="container">
        <p className="intro">
          Alzikrayat is a simple photo-sharing app. Upload your favorite moments,
          explore photos from others, and tell them what you think.
        </p>
        <div className="features">
          <div className="feature">
            <h3>Share</h3>
            <p>Upload photos with a title and a short story.</p>
          </div>
          <div className="feature">
            <h3>Explore</h3>
            <p>Browse the gallery in a grid or a list.</p>
          </div>
          <div className="feature">
            <h3>Comment</h3>
            <p>Join the conversation on any photo.</p>
          </div>
        </div>
      </div>
    </div>
  );
}