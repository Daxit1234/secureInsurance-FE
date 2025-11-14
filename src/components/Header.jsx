// Header.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollToId, setScrollToId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setScrollToId(null); // reset
      }
    }
  }, [location, scrollToId]);

  const handleNavClick = (id) => {
  if (location.pathname === "/") {
    // already home → scroll directly
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  } else {
    // navigate home first, then scroll
    navigate("/", { state: { scrollTo: id } });
  }
};

// inside useEffect
useEffect(() => {
  if (location.state && location.state.scrollTo) {
    const element = document.getElementById(location.state.scrollTo);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    // clear state to prevent repeated scroll
    navigate(location.pathname, { replace: true, state: {} });
  }
}, [location]);


  return (
    <>
      <header className="bg-[#f0f9ff] text-[#0b3554] px-6 flex items-center justify-between sticky top-0 z-50 shadow">
        {/* --- Left: Logo + Brand --- */}
        <div className="flex items-center space-x-4">
          <div className="h-14 w-14 sm:h-16 sm:w-16 overflow-hidden flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-bold text-xl sm:text-2xl">SECURE INVEST</span>
        </div>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden md:flex space-x-8 text-base font-medium">
          <button
            onClick={() => handleNavClick("home")}
            className="hover:text-blue-600"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className="hover:text-blue-600"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("services")}
            className="hover:text-blue-600"
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="hover:text-blue-600"
          >
            Contact
          </button>
        </nav>

        {/* --- Mobile Menu Button --- */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 border rounded-full hover:bg-gray-200 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {/* --- Mobile Navigation Menu --- */}
      {mobileMenuOpen && (
        <div className="fixed top-[56px] sm:top-[72px] left-0 w-full bg-[#f0f9ff] text-[#0b3554] shadow-lg py-6 flex flex-col items-center space-y-6 animate-slide-down z-50">
          <button
            onClick={() => {
              handleNavClick("home");
              setMobileMenuOpen(false);
            }}
            className="hover:text-blue-600"
          >
            Home
          </button>

          <button
            onClick={() => {
              handleNavClick("about");
              setMobileMenuOpen(false);
            }}
            className="hover:text-blue-600"
          >
            About
          </button>

          <button
            onClick={() => {
              handleNavClick("services");
              setMobileMenuOpen(false);
            }}
            className="hover:text-blue-600"
          >
            Services
          </button>

          <button
            onClick={() => {
              handleNavClick("contact");
              setMobileMenuOpen(false);
            }}
            className="hover:text-blue-600"
          >
            Contact
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
