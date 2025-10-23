import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function HomeLoan() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
  });

  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, contact } = formData;

    if (!fullName || !email || !contact) {
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
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">
          Home Loan
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Make your dream home a reality with our flexible and affordable home
          loan plans. Enjoy quick approvals, low interest rates, and easy
          repayment options.
        </p>

        <div className="bg-white shadow-md rounded-xl p-8 text-left">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#0b3554] mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#0b3554] mb-1">
                Email
              </label>
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
            <div className="col-span-2 flex flex-col items-center">
              <label className="block text-sm font-medium text-[#0b3554] mb-1">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full sm:w-1/2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                placeholder="Enter your contact number"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="col-span-2 text-center text-red-600 text-sm mt-2">
                {error}
              </div>
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
          <a
            href="/"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
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

// Popup styles
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
