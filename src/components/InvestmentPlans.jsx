import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function InvestmentPlans() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    gender: "",
    contact: "",
  });

  const [age, setAge] = useState(null);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Calculate Age
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let userAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      userAge--;
    }
    setAge(userAge);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      let cleaned = value.replace(/\D/g, "");
      if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
      if (cleaned.length > 5)
        cleaned = cleaned.slice(0, 5) + " " + cleaned.slice(5);
      setFormData({ ...formData, contact: cleaned });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "dob") {
      calculateAge(value);
    }
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, dob, email, gender, contact } = formData;

    if (!fullName || !dob || !email || !gender || !contact) {
      setError("⚠️ Please fill in all fields before proceeding.");
    } else if (contact.replace(/\s/g, "").length !== 10) {
      setError("⚠️ Please enter a valid 10-digit contact number.");
    } else {
      setError("");
      setShowPopup(true); // Show popup only if validation passes
    }
  };

  // Close popup and navigate to Home section
  const closePopupAndNavigate = () => {
    setShowPopup(false);
    navigate("/", { state: { scrollTo: "home" } }); // scroll to home section
  };

  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">
          Investment Plans
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Grow your wealth with smart investment strategies tailored to your
          goals. Secure your financial future and make your money work for you.
        </p>

        <div className="bg-white shadow-md rounded-xl p-8 text-left">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-[#0b3554] mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>

            {/* Date of Birth */}
            <div className="relative">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-[#0b3554] mb-1"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#0b3554] mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Contact */}
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-[#0b3554] mb-1"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
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
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-400"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-400"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="col-span-2 text-center text-red-600 text-sm mt-2">
                {error}
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
