import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import ContactForm from "../common/ContactForm";

export default function Health() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">
          {queryParams.get("insuranceType") || "Health Insurance"} 
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Protect your family's future with affordable term life insurance
          plans.
        </p>
        <ContactForm
          fields={["fullName", "dob", "contact", "email"]}
          gender={queryParams.get("gender")}
          members={queryParams.get("members").split(",")}
        />
      </div>
    </div>
  );
}
