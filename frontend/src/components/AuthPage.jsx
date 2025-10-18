// AuthPage.jsx

import React, { useState } from 'react';
import Login from '../components/auth/Login';    // ADJUST PATHS AS NEEDED
import Signin from '../components/auth/Signin';  // ADJUST PATHS AS NEEDED

export default function AuthPage() {
    // State to determine which component to show: 'login' or 'signup'
    const [currentView, setCurrentView] = useState('login'); 
    
    // Function to switch the view state
    const switchToSignup = () => setCurrentView('signup');
    const switchToLogin = () => setCurrentView('login');

    // Handler for successful authentication (Login or Signup)
    const handleAuthSuccess = (userData, type) => {
        console.log(`${type} successful, token received:`, userData.token);
        // NOTE: Redirection to the dashboard or home page should happen here
    };
    
    // --- Render Logic ---
    return (
        // Centers the form on the page, matching the desired screenshot look
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-sm">
                
                {/* Conditional Rendering based on the 'view' state */}
                {currentView === 'login' ? (
                    <>
                        {/* Header matching your screenshot */}
                        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
                        <p className="text-center text-gray-500 mb-6">Please login to continue</p>
                        
                        <Login 
                            onLogin={handleAuthSuccess}
                            onSwitchToSignup={switchToSignup} // Passed for the 'Sign Up' link
                        />
                    </>
                ) : (
                    <>
                        <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
                        <p className="text-center text-gray-500 mb-6">Sign up to start your journey</p>
                        
                        <Signin 
                            onSignup={handleAuthSuccess}
                            onSwitchToLogin={switchToLogin} // Passed for the 'Login' link
                        />
                    </>
                )}
            </div>
        </div>
    );
}