import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Menu, UserRoundPlus, LogOut, UserCog } from 'lucide-react';
import { Button, Dropdown } from 'react-bootstrap';
import Logo from '../assets/rythubowl-logo.png';
import '../components/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    const userData = localStorage.getItem('userDetails');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userDetails');
    navigate('/');
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="profile-avatar-toggle"
    >
      {children}
    </button>
  ));

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
            <button
              onClick={() => navigate('/')}
              className="header__nav-button"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/about')}
              className="header__nav-button"
            >
              About
            </button>
            <button
              onClick={() => navigate('/product')}
              className="header__nav-button"
            >
              Products
            </button>
            <button
              onClick={() => navigate('/order-tracking')}
              className="header__nav-button"
            >
              orders
            </button>
          </nav>

          {/* Auth Buttons */}
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
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  <div className="profile-avatar">
                    {userDetails?.name
                      ? userDetails.name.charAt(0).toUpperCase()
                      : 'U'}
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="profile-dropdown">
                  <Dropdown.Item
                    onClick={() => navigate('/profile')}
                    className="profile-dropdown-item"
                  >
                    <UserCog size={16} />
                    <span>Edit Profile</span>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="profile-dropdown-item"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
                      navigate('/profile');
                      setIsMenuOpen(false);
                    }}
                    className="btn header__mobile-login-button"
                  >
                    Profile
                  </Button>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="btn header__mobile-signup-button"
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
