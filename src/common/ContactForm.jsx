import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactForm = ({ fields = ["fullName", "dob", "email", "gender", "contact"] }) => {
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
    setFormData({ ...formData, [name]: value });
    if (name === "dob") calculateAge(value);
  };

  const handleContactChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length > 5) value = value.slice(0, 5) + " " + value.slice(5);
    setFormData({ ...formData, contact: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only validate visible fields
    for (const field of fields) {
      if (!formData[field]) {
        setError("⚠️ Please fill in all required fields.");
        return;
      }
    }

    if (fields.includes("contact") && formData.contact.replace(/\s/g, "").length !== 10) {
      setError("⚠️ Please enter a valid 10-digit contact number.");
      return;
    }

    setError("");

    try {
      const response = await fetch("https://secure-insurance-be.vercel.app/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          dob: formData.dob,
          email: formData.email,
          gender: formData.gender,
          phoneNo: parseInt(formData.contact.replace(/\s/g, ""), 10),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(`⚠️ ${data.message || "Something went wrong"}`);
        return;
      }

      setShowPopup(true);
      setFormData({ fullName: "", dob: "", email: "", gender: "", contact: "" });
    } catch (err) {
      setError(`⚠️ ${err.message}`);
    }
  };

  const closePopupAndNavigate = () => {
    setShowPopup(false);
    navigate("/", { state: { scrollTo: "home" } });
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-xl p-8 text-left">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {fields.includes("fullName") && (
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
          )}

          {fields.includes("dob") && (
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
          )}

          {fields.includes("email") && (
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
          )}

          {fields.includes("contact") && (
            <div>
              <label className="block text-sm font-medium text-[#0b3554] mb-1">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleContactChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your contact number"
              />
            </div>
          )}

          {fields.includes("gender") && (
            <div className="col-span-2 flex justify-center mt-4">
              <div className="flex items-center space-x-6">
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
          )}

          {error && <div className="col-span-2 text-center text-red-600 text-sm mt-2">{error}</div>}

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
  );
};

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

export default ContactForm;
