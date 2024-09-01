import "../index.css"; // Import your CSS file for styling
import { Link } from "react-router-dom"; // Adjust as per your routing setup

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="speech-bubble">
          <h1>404</h1>
          <h2>Oops! Page Not Found</h2>
          <p>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="button">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
