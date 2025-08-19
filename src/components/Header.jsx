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
      <div className="header__container">
        <div className="header__content">
          {/* Logo */}
          <div className="header__logo-container" onClick={() => navigate('/')}>
            <img src={Logo} alt="Logo" className="header__logo" />
          </div>

          {/* Desktop Navigation */}
          <nav className="header__desktop-nav">
            <button onClick={() => navigate('/')} className="header__nav-button">
              Home
            </button>
            <button onClick={() => navigate('/about')} className="header__nav-button">
              About
            </button>
            <button onClick={() => navigate('/product')} className="header__nav-button">
              Products
            </button>
          </nav>

          {/* Auth Buttons (only if NOT logged in) */}
          {!isAuthenticated ? (
            <div className="header__auth-buttons">
              <button
                onClick={() => navigate('/login')}
                className="btn header__signup-button"
              >
                <User className="header__button-icon" />
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn header__signup-button"
              >
                <UserRoundPlus className="header__button-icon" />
                Sign Up
              </button>
            </div>
          ) : (
            <div className="header__auth-buttons">
              <button
                onClick={handleLogout}
                className="btn header__signup-button"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="header__mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="header__icon" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="header__mobile-nav">
            <div className="header__mobile-nav-content">
              <button
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
                className="header__mobile-nav-button"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate('/about');
                  setIsMenuOpen(false);
                }}
                className="header__mobile-nav-button"
              >
                About
              </button>
              <button
                onClick={() => {
                  navigate('/product');
                  setIsMenuOpen(false);
                }}
                className="header__mobile-nav-button"
              >
                Products
              </button>

              {!isAuthenticated ? (
                <div className="header__mobile-auth-buttons">
                  <Button
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="btn header__mobile-login-button"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="btn header__mobile-signup-button"
                  >
                    Sign Up
                  </Button>
                </div>
              ) : (
                <div className="header__mobile-auth-buttons">
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="btn header__mobile-login-button"
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