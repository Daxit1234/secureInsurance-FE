import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function TermLife() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [age, setAge] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Popup state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !dob || !email || !contact || !gender) {
      setErrorMessage("⚠️ Please fill in all fields before proceeding.");
    } else if (contact.replace(/\s/g, "").length !== 10) {
      setErrorMessage("⚠️ Please enter a valid 10-digit contact number.");
    } else {
      setErrorMessage("");
      setShowPopup(true); // Show thank you popup
    }
  };

  const handleDobChange = (e) => {
    const value = e.target.value;
    setDob(value);
    setAge(value ? calculateAge(value) : null);
  };

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleContactChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length > 5) value = value.slice(0, 5) + " " + value.slice(5);
    setContact(value);
  };

  // Close popup and navigate to Hero page
  const closePopupAndNavigate = () => {
  setShowPopup(false);
  navigate("/", { state: { scrollTo: "home" } }); // scroll home section
};


  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">Term Life Insurance</h1>
        <p className="text-gray-700 text-lg mb-8">
          Protect your family's future with affordable term life insurance plans.
        </p>

        <div className="bg-white shadow-md rounded-xl p-8 text-left">
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#0b3554] mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>

            {/* DOB */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#0b3554] mb-1">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={handleDobChange}
                className="w-full border border-gray-300 rounded-lg p-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {age && (
                <div className="absolute right-2 top-[35px] bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-md">
                  {age} years
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#0b3554] mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-[#0b3554] mb-1">Contact Number</label>
              <input
                type="text"
                value={contact}
                onChange={handleContactChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your contact number"
              />
            </div>

            {/* Gender */}
            <div className="col-span-2 flex justify-center mt-4">
              <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-2 sm:space-y-0">
                <span className="text-[#0b3554] font-medium mr-2">Gender:</span>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="text-blue-600 focus:ring-blue-400"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="text-blue-600 focus:ring-blue-400"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Error */}
            {errorMessage && (
              <div className="col-span-2 text-center text-red-600 text-sm mt-2">
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <div className="col-span-2 flex justify-center mt-8">
              <button
                type="submit"
                className="bg-[#0b3554] hover:bg-blue-900 text-white px-8 py-3 rounded-lg transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10">
          <a href="/" className="text-blue-600 hover:underline text-sm font-medium">
            ← Back to Home
          </a>
        </div>

        {/* Thank You Popup */}
        {showPopup && (
          <div style={popupStyle}>
            <div style={popupContentStyle}>
              <h2 className="text-2xl font-bold mb-2">Thank You for Connecting with Us!</h2>
              <p className="mb-4">We will contact you as soon as possible.</p>
              <button
                onClick={closePopupAndNavigate}
                className="bg-[#0b3554] text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Popup Styles
const popupStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const popupContentStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "8px",
  textAlign: "center",
  maxWidth: "400px",
};
