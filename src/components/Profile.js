import { useState, useContext } from 'react';
import Calculator from './Calculator';
import DietGenerator from './DietGenerator';
import { parsedCookies } from '../consts.js';
import AuthContext from "./AuthContext";
import '../styles/Profile.css';


export default function Profile() {
  const { logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('calculator');

  const renderContent = () => {
    switch (activeTab) {
      case 'calculator':
        return <Calculator />;
      case 'diet':
        return <DietGenerator />;
      case 'info':
        return (
          <div className="user-info">
            <h2>User Profile Information</h2>
            <div>
              <p><strong>Nickname:</strong> {parsedCookies.username}</p>
            </div>
            <div>
              <p><strong>Name:</strong> {parsedCookies.name}</p>
            </div>
            <div>
              <p><strong>Email:</strong> {parsedCookies.email}</p>
            </div>
          </div>
        );
      default:
        return <Calculator />;
    }
  };

  return (
    <div className="profile-container">
      <nav className="navbar">
        <button 
          className={`nav-button ${activeTab === 'calculator' ? 'active' : ''}`} 
          onClick={() => setActiveTab('calculator')}
        >
          Calorie Calculator
        </button>
        <button 
          className={`nav-button ${activeTab === 'diet' ? 'active' : ''}`} 
          onClick={() => setActiveTab('diet')}
        >
          Diet Generator
        </button>
        <button 
          className={`nav-button ${activeTab === 'info' ? 'active' : ''}`} 
          onClick={() => setActiveTab('info')}
        >
          Personal Info
        </button>
        <button 
          className={`nav-button`} 
          onClick={logout}
        >
          Logout
        </button>
      </nav>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}
