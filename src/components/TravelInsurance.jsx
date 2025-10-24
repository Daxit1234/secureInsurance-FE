import ContactForm from "../common/ContactForm";
import Header from "./Header";
import React from "react";

export default function TravelInsurance() {

  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">
          Travel Insurance
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Travel with confidence knowing you’re covered with reliable travel
          insurance. Get protection against trip cancellations, medical
          emergencies, and lost baggage.
        </p>
        <ContactForm fields={["fullName", "contact", "email"]} />
      </div>
    </div>
  );
}
