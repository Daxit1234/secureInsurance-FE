import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function RetirementPlans() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    contact: "",
    gender: "",
  });

  const [age, setAge] = useState(null);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let userAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      userAge--;
    }
    setAge(userAge);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      let contactValue = value.replace(/\D/g, "");
      if (contactValue.length > 10) contactValue = contactValue.slice(0, 10);
      if (contactValue.length > 5) contactValue = contactValue.slice(0, 5) + " " + contactValue.slice(5);
      setFormData({ ...formData, contact: contactValue });
      return;
    }

    setFormData({ ...formData, [name]: value });
    if (name === "dob") calculateAge(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, dob, email, contact, gender } = formData;

    if (!fullName || !dob || !email || !contact || !gender) {
      setError("⚠️ Please fill in all fields before proceeding.");
      return;
    }

    if (contact.replace(/\s/g, "").length !== 10) {
      setError("⚠️ Please enter a valid 10-digit contact number.");
      return;
    }

    setError("");
    setShowPopup(true);
  };

  const closePopupAndNavigate = () => {
    setShowPopup(false);
    navigate("/", { state: { scrollTo: "home" } });
  };

  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">Retirement Plans</h1>
        <p className="text-gray-700 text-lg mb-8">
          Plan your retirement with confidence and financial freedom. Invest today to enjoy a steady income and a worry-free life after retirement.
        </p>

        <div className="bg-white shadow-md rounded-xl p-8 text-left">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#0b3554] mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>

            {/* Date of Birth with Age Badge */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#0b3554] mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {age !== null && (
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-[#0b3554] mb-1">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your contact number"
              />
            </div>

            {/* Gender - centered */}
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
              <div className="col-span-2 text-center text-red-600 text-sm mt-2">{error}</div>
            )}

            {/* Submit Button */}
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

        {/* Back to Home */}
        <div className="mt-10">
          <a href="/" className="text-blue-600 hover:underline text-sm font-medium">
            ← Back to Home
          </a>
        </div>

        {/* Popup */}
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
