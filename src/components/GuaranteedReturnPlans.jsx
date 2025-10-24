import ContactForm from "../common/ContactForm";
import Header from "./Header";
import React from "react";

export default function GuaranteedReturnPlans() {

  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">
          Guaranteed Return Plans
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Build a secure future with a guaranteed return plan. Enjoy life cover
          protection along with assured returns at the end of the policy term.
        </p>

        <ContactForm />
      </div>
    </div>
  );
}

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
