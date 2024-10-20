import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import App from './components/App'; 
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Calculator from './components/Calculator';
import DietGenerator from './components/DietGenerator';
import Profile from './components/Profile';
import * as Sentry from '@sentry/react';


Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_URL,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["api", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/calculator" element={<ProtectedRoute element={<Calculator />} />} />
                <Route path="/diet-generator" element={<ProtectedRoute element={<DietGenerator />} />} />
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            </Routes>
        </AuthProvider>
    </Router>
);
