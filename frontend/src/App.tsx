import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ItemManagement from './components/ItemManagement';
import { authService } from './services/authService';

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'dashboard'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            setCurrentView('dashboard');
          } else {
            // Token is invalid, clear it
            authService.logout();
            setCurrentView('login');
          }
        } else {
          setCurrentView('login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        authService.logout();
        setCurrentView('login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (authService.isAuthenticated()) {
        const hash = window.location.hash.slice(1);
        if (hash === 'register') {
          setCurrentView('register');
        } else if (hash === 'login') {
          setCurrentView('login');
        } else {
          setCurrentView('dashboard');
        }
      } else {
        const hash = window.location.hash.slice(1);
        if (hash === 'register') {
          setCurrentView('register');
        } else {
          setCurrentView('login');
        }
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setCurrentView('login');
    window.location.hash = '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'register') {
    return <Register />;
  } else if (currentView === 'login') {
    return <Login />;
  } else if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">Item Management</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ItemManagement />
        </main>
      </div>
    );
  }

  return null;
}

export default App;