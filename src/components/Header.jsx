// Header.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollToId, setScrollToId] = React.useState(null);

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
    <header className="bg-[#f0f9ff] text-[#0b3554] px-8 flex items-center justify-between sticky top-0 z-50 h-20 shadow-md">
      <div className="flex items-center space-x-4 h-full">
        <div className="h-16 w-16 sm:h-20 sm:w-20 overflow-hidden flex-shrink-0 flex items-center justify-center">
          <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-bold text-2xl">SECURE INVEST</span>
      </div>
      <nav className="flex space-x-8 text-base font-medium h-full items-center">
        <button onClick={() => handleNavClick("home")} className="hover:text-blue-600">Home</button>
        <button onClick={() => handleNavClick("about")} className="hover:text-blue-600">About</button>
        <button onClick={() => handleNavClick("services")} className="hover:text-blue-600">Services</button>
        <button onClick={() => handleNavClick("contact")} className="hover:text-blue-600">Contact</button>
      </nav>
    </header>
  );
};

export default Header;
