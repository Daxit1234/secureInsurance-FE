import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import ContactForm from "../common/ContactForm";

export default function ChildSavingsPlans() {
 
  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">
          Child Savings Plans
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Secure your child’s future with a reliable child savings plan. Build a strong financial foundation to support their education and life goals.
        </p>
        <ContactForm/>
      </div>
    </div>
  );
}
