import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ContactForm = ({
  fields = ["fullName", "dob", "email", "gender", "contact"],
  gender,
  members,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

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
  const [loading, setLoading] = useState(false); // 👈 for spinner

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let userAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
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

    for (const field of fields) {
      if (!formData[field]) {
        setError("⚠️ Please fill in all required fields.");
        return;
      }
    }

    if (
      fields.includes("contact") &&
      formData.contact.replace(/\s/g, "").length !== 10
    ) {
      setError("⚠️ Please enter a valid 10-digit contact number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName || "",
            dob: formData.dob || "",
            email: formData.email || "",
            gender: formData.gender || gender || "",
            insuranceType: location.pathname.split("/")[1],
            members: members || [],
            phoneNo: parseInt(formData.contact.replace(/\s/g, ""), 10),
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setError(`⚠️ ${data.message || "Something went wrong"}`);
        return;
      }

      setShowPopup(true);
      setFormData({
        fullName: "",
        dob: "",
        email: "",
        gender: "",
        contact: "",
      });
    } catch (err) {
      setError(`⚠️ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const closePopupAndNavigate = () => {
    setShowPopup(false);
    navigate("/", { state: { scrollTo: "home" } });
  };

  return (
    <div className="md:px-8">
      <div className="bg-white shadow-md rounded-xl p-6 md:p-8 text-left max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          {fields.includes("fullName") && (
            <div>
              <label className="block text-sm font-medium text-[#0b3554] mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>
          )}

          {/* DOB */}
          {fields.includes("dob") && (
            <div className="relative">
              <label className="block text-sm font-medium text-[#0b3554] mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {age !== null && (
                <div className="absolute right-2 top-9 bg-blue-100 text-blue-800 text-xs md:text-sm font-medium px-2 py-1 rounded-md">
                  {age} years
                </div>
              )}
            </div>
          )}

          {/* Email */}
          {fields.includes("email") && (
            <div>
              <label className="block text-sm font-medium text-[#0b3554] mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>
          )}

          {/* Contact */}
          {fields.includes("contact") && (
            <div>
              <label className="block text-sm font-medium text-[#0b3554] mb-1">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleContactChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your contact number"
              />
            </div>
          )}

          {/* Gender */}
          {fields.includes("gender") && (
            <div className="col-span-1 md:col-span-2 flex flex-col items-start md:items-center">
              <label className="text-[#0b3554] font-medium mb-2">Gender</label>
              <div className="flex items-center space-x-6">
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

          {/* Error */}
          {error && (
            <div className="col-span-1 md:col-span-2 text-center text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center bg-[#0b3554] text-white px-8 py-3 rounded-lg transition ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-900"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-2">
              Thank You for Connecting with Us!
            </h2>
            <p className="mb-4">We will contact you as soon as possible.</p>
            <button
              onClick={closePopupAndNavigate}
              className="bg-[#0b3554] text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition w-full"
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
