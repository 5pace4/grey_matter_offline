import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { greymatter } from '../assets';
import { navigation } from '../constants/index.js';
import Button from './Button';
import { HamburgerMenu } from './design/Header';
import SignUpModal from './SignupModal';
import SignInModal from './SigninModal';
import 'react-responsive-modal/styles.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const handleSignupOpen = () => {
    setSignupOpen(true);
  };

  const handleSignupClose = () => {
    setSignupOpen(false);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleClick = (event, url) => {
    event.preventDefault();
    if (url === 'journal-ranking') {
      navigate('/journal-ranking');
    } else if (url === 'paper-writing') {
      navigate('/paper-writing');
    } else if (url === 'research-roadmap') {
      // If on the homepage, scroll to the section
      if (window.location.pathname === '/') {
        const element = document.querySelector('#research-roadmap');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to the homepage and scroll
        navigate('/', { replace: true });
        setTimeout(() => {
          const element = document.querySelector('#research-roadmap');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500); // Wait for the navigation to complete
      }
    } else if (url === 'wannabe-a-researcher') {
      navigate('/wannabe-a-researcher');
    } else if (url === 'Home') {
      navigate('/');
    } else {
      navigate('/');
    }
    setMobileMenuOpen(false);
    setOverlayOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setOverlayOpen(!mobileMenuOpen);
  };

  const handleOverlayClick = () => {
    setMobileMenuOpen(false);
    setOverlayOpen(false);
  };

  return (
    <div className="relative z-50">
      <div className="top-0 left-0 w-full border-b border-n-6 lg:bg-n-7/90 lg:backdrop-blur-sm bg-n-8/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 py-4 lg:py-6">
          <a
            className="block w-[10rem] lg:w-[12rem] xl:mr-8 cursor-pointer"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            <div className="flex items-center" onClick={handleMobileMenuToggle}>
              <img
                src={greymatter}
                width={50}
                height={30}
                alt="Grey Matter"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))',
                }}
              />
              <span
                className="ml-1 text-n-1 text-lg lg:text-xl"
                style={{ textShadow: '0 0 5px rgba(255, 255, 255, 1)' }}
              >
                Grey Matter
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex lg:mx-auto">
            <div className="flex flex-col items-center justify-center lg:flex-row">
              {navigation.map((elem) => (
                <a
                  key={elem.id}
                  href={elem.url}
                  onClick={(event) => handleClick(event, elem.url)}
                  className={`block relative font-code text-s lg:text-s uppercase text-n-1 transition-colors hover:text-color-1 px-4 py-2 lg:px-6 lg:py-4 ${
                    elem.url === location.hash ? 'text-n-1' : 'text-n-1/50'
                  } lg:leading-5 lg:hover:text-n-1 xl:px-8`}
                >
                  {elem.title}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex space-x-2 items-center">
            <a
              href="#signin"
              className="text-gray-300 hover:text-white transition-colors duration-300 py-2 px-4 text-sm lg:text-s font-medium uppercase"
              onClick={handleLoginOpen}
            >
              Sign In
            </a>

            <Button
              href="#login"
              className="text-s lg:text-s font-medium h-8 lg:h-6 w-[15px] px-4 lg:px-6 transition-all duration-300 hover:bg-gradient-to-r hover:text-black"
              onClick={handleSignupOpen}
            >
              Join!
            </Button>
          </div>

          <div className="lg:hidden">
            <HamburgerMenu onClick={handleMobileMenuToggle} />
          </div>
        </div>
      </div>

      {overlayOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={handleOverlayClick}
        />
      )}

      {mobileMenuOpen && (
        <nav className="fixed top-0 left-0 w-full h-full bg-n-8/90 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center justify-center py-4 h-full">
            {navigation.map((elem) => (
              <a
                key={elem.id}
                href={elem.url}
                onClick={(event) => handleClick(event, elem.url)}
                className={`block text-center font-code text-lg uppercase text-n-1 transition-colors hover:text-color-1 py-4`}
              >
                {elem.title}
              </a>
            ))}
          </div>
        </nav>
      )}

      <SignUpModal open={signupOpen} onClose={handleSignupClose} />
      <SignInModal open={loginOpen} onClose={handleLoginClose} />
    </div>
  );
};

export default Header;
