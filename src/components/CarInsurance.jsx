import ContactForm from "../common/ContactForm";
import Header from "./Header";
import React from "react";

export default function CarInsurance() {

  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">Car Insurance</h1>
        <p className="text-gray-700 text-lg mb-8">
          Protect your car and your finances with reliable car insurance plans.
          Drive with confidence knowing you’re covered against accidents and
          damages.
        </p>

       <ContactForm fields={['fullName','contact','email']}  />
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
