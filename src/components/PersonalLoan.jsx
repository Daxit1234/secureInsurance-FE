import ContactForm from "../common/ContactForm";
import Header from "./Header";
import React from "react";

export default function PersonalLoan() {
  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">
          Personal Loan
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Fulfill your needs and goals with our quick and flexible personal loan
          plans. Get instant approval, low interest rates, and easy repayment
          options.
        </p>

        <ContactForm
          fields={[
            "fullName",
            "dob",
            "email",
            "gender",
            "contact",
            "panNo",
            "aadharNo",
          ]}
        />
      </div>
    </div>
  );
}
