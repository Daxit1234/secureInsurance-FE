import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import Header from "./Header";

const HealthInsurance = () => {
  const navigate = useNavigate(); // ✅ initialize navigate
  const [gender, setGender] = useState("Male");
  const [selectedMembers, setSelectedMembers] = useState(["Self"]);
  const [showMore, setShowMore] = useState(false);

  const memberImages = {
    Self:
      gender === "Male" ? "/images/self-male.png" : "/images/self-female.png",
    Wife: "/images/wife.png",
    Husband: "/images/husband.png",
    Son: "/images/son.png",
    Daughter: "/images/daughter.png",
    Father: "/images/father.png",
    Mother: "/images/mother.png",
    Grandfather: "/images/grandfather.png",
    Grandmother: "/images/grandmother.png",
    "Father-in-law": "/images/fatherinlaw.png",
    "Mother-in-law": "/images/motherinlaw.png",
  };

  const baseMembers = [
    { name: "Self" },
    { name: gender === "Male" ? "Wife" : "Husband" },
    { name: "Son" },
    { name: "Daughter" },
    { name: "Father" },
    { name: "Mother" },
  ];

  const extraMembers = [
    { name: "Grandfather" },
    { name: "Grandmother" },
    { name: "Father-in-law" },
    { name: "Mother-in-law" },
  ];

  const handleSelect = (member) => {
    setSelectedMembers((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  // ✅ Navigate to Health.jsx page
  const handleContinue = () => {
    navigate(
      `/health?insuranceType=Health%20Insurance&gender=${encodeURIComponent(gender)}&members=${encodeURIComponent(selectedMembers.join(","))}`
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f8ff]">
      <Header />

      <div className="flex flex-col items-center justify-center p-6">
        {/* Gender Selection */}
        <div className="flex space-x-2 mb-6">
          <button
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              gender === "Male"
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-300 text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setGender("Male")}
          >
            Male
          </button>
          <button
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              gender === "Female"
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-300 text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setGender("Female")}
          >
            Female
          </button>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Select members you want to insure
        </h2>

        {/* Member Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
          {[...baseMembers, ...(showMore ? extraMembers : [])].map((member) => (
            <div
              key={member.name}
              onClick={() => handleSelect(member.name)}
              className={`flex items-center justify-start border rounded-xl p-3 cursor-pointer transition-all w-full ${
                selectedMembers.includes(member.name)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <img
                src={memberImages[member.name]}
                alt={member.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <p
                className={`font-medium text-base ${
                  selectedMembers.includes(member.name)
                    ? "text-blue-600"
                    : "text-gray-800"
                }`}
              >
                {member.name}
              </p>
            </div>
          ))}
        </div>

        {/* Show More */}
        {!showMore && (
          <button
            className="text-blue-600 mt-4 text-sm underline"
            onClick={() => setShowMore(true)}
          >
            More members ▼
          </button>
        )}

        {/* Continue Button */}
        <button
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-medium px-10 py-3 rounded-lg transition-all shadow-md"
          onClick={handleContinue} // ✅ navigate on click
        >
          Continue ›
        </button>

        {/* Back to home link */}
        <div className="mt-10">
          <a
            href="/"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default HealthInsurance;
