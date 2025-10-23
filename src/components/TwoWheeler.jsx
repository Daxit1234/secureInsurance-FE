import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function TwoWheeler() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
  });

  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // Popup state

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      let formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 5)
        formattedValue = formattedValue.slice(0, 5) + " " + formattedValue.slice(5, 10);
      if (formattedValue.length > 11)
        formattedValue = formattedValue.slice(0, 11);
      setFormData({ ...formData, contact: formattedValue });
      setError("");
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
    setShowPopup(true); // Show popup only if validation passes
  };

  const closePopupAndNavigate = () => {
    setShowPopup(false);
    navigate("/", { state: { scrollTo: "home" } }); // Scroll to home section
  };

  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">
          Two Wheeler Insurance
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Keep your ride and yourself protected with affordable two-wheeler
          insurance. Stay worry-free on every journey with coverage for
          accidents, theft, and damages.
        </p>

        <div className="bg-white shadow-md rounded-xl p-8 text-left">
          <form onSubmit={handleSubmit}>
            {/* Full Name + Email side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            </div>

             {/* Contact Number (centered below both fields) */}
            <div className="col-span-2 sm:col-span-2 flex flex-col items-center">
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
              <div className="text-center text-red-600 text-sm mt-4">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
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
          <a
            href="/"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
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
