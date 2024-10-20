import { Link } from 'react-router-dom';
import '../styles/App.css';


export default function App() {
  return (
    <div className="landing-page">
      <div className="container">
        <h1 className="title">Welcome to FitLife App</h1>
        <p className="description">
          Track your calories, generate diet plans, and monitor your weight loss progress!
        </p>

        <div className="button-container">
          <Link to="/login" className="button">Login</Link>
          <Link to="/register" className="button register-button">Register</Link>
        </div>
      </div>
    </div>
  );
}
