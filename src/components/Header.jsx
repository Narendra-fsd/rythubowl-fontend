import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Menu, UserRoundPlus } from 'lucide-react';
import { Button } from 'react-bootstrap';
import Logo from '../assets/rythubowl-logo.png';
import '../components/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in (e.g., token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-container" onClick={() => navigate('/')}>
            <img src={Logo} alt="Logo" className="logo" />
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <button onClick={() => navigate('/')} className="nav-button">
              Home
            </button>
            <button onClick={() => navigate('/about')} className="nav-button">
              About
            </button>
            <button onClick={() => navigate('/product')} className="nav-button">
              Products
            </button>
          </nav>

          {/* Auth Buttons (only if NOT logged in) */}
          {!isAuthenticated ? (
            <div className="auth-buttons">
              <button
                onClick={() => navigate('/login')}
                className="btn header-signup-button"
              >
                <User className="button-icon" />
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn header-signup-button"
              >
                <UserRoundPlus className="button-icon" />
                Sign Up
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button
                onClick={handleLogout}
                className="btn header-signup-button"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="icon" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-content">
              <button
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
                className="mobile-nav-button"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate('/about');
                  setIsMenuOpen(false);
                }}
                className="mobile-nav-button"
              >
                About
              </button>
              <button
                onClick={() => {
                  navigate('/poduct');
                  setIsMenuOpen(false);
                }}
                className="mobile-nav-button"
              >
                Products
              </button>

              {!isAuthenticated ? (
                <div className="mobile-auth-buttons">
                  <Button
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="btn header-mobile-login-button"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="btn header-mobile-signup-button"
                  >
                    Sign Up
                  </Button>
                </div>
              ) : (
                <div className="mobile-auth-buttons">
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="btn header-mobile-login-button"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
