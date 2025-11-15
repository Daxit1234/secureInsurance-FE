import React, { useState } from "react";
import Swal from "sweetalert2";

const tabs = [
  { key: "Term Life Insurance", value: "TermLife" },
  { key: "Health Insurance", value: "Health" },
  { key: "Investment Plans", value: "InvestmentPlans" },
  { key: "Car Insurance", value: "CarInsurance" },
  { key: "2 Wheeler Insurance", value: "TwoWheeler" },
  { key: "Travel Insurance", value: "TravelInsurance" },
  { key: "Mortgage Loan", value: "MortgageLoan" },
  { key: "Term Plan with Return", value: "TermPlanwithReturns" },
  { key: "Guaranteed Return Plan", value: "GuaranteedReturnPlans" },
  { key: "Child Savings Plan", value: "ChildSavingsPlans" },
  { key: "Retirement Plan", value: "RetirementPlans" },
  { key: "Home Loan", value: "HomeLoan" },
  { key: "Personal Loan", value: "PersonalLoan" },
];

const OfflineInquiry = ({ closeDrawer }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    phoneNo: "",
    insuranceType: "",
    members: [],
    aadharNo: "",
    panNo: "",
    vehicleNo: "",
    loanAmount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(`⚠️ ${data.message || "Something went wrong"}`);
      return;
    } else {
      Swal.fire("Saved!", "Your data has been saved successfully.", "success");
      closeDrawer();
    }
  };

  const toggleMember = (label) => {
    if (form.members.includes(label)) {
      setForm({ ...form, members: form.members.filter((m) => m !== label) });
    } else {
      setForm({ ...form, members: [...form.members, label] });
    }
  };
  // Conditional fields
  const showVehicle =
    form.insuranceType === "CarInsurance" ||
    form.insuranceType === "TwoWheeler";

  const showLoanAmount =
    form.insuranceType === "HomeLoan" || form.insuranceType === "PersonalLoan";

  const showAadharAndPan = form.insuranceType === "PersonalLoan";

  const showMember = form.insuranceType === "Health";
  return (
    <div className="max-w-2xl mx-auto shadow-md rounded-lg bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Insurance Type */}
        <div>
          <label className="font-medium">Insurance Type</label>
          <select
            name="insuranceType"
            className="w-full border p-2 rounded"
            value={form.insuranceType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            {tabs.map((t) => (
              <option key={t.value} value={t.value}>
                {t.key}
              </option>
            ))}
          </select>
        </div>
        {/* Name */}
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* DOB */}
        <div>
          <label className="font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="w-full border p-2 rounded"
            value={form.dob}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <div className="flex items-center">
          <label className="font-medium">Gender</label>
          <div className="flex items-center ml-4">
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="font-medium">Phone Number</label>
          <input
            type="number"
            name="phoneNo"
            className="w-full border p-2 rounded"
            value={form.phoneNo}
            onChange={handleChange}
          />
        </div>

        {/* Members */}
        {showMember && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              "Self",
              "Wife",
              "Son",
              "Daughter",
              "Father",
              "Mother",
              "Grandfather",
              "Grandmother",
              "Father-in-law",
              "Mother-in-law",
            ].map((label) => (
              <label
                key={label}
                className="flex items-center gap-2 bg-white rounded-lg cursor-pointer hover:bg-blue-100"
              >
                <input
                  type="checkbox"
                  checked={form.members.includes(label)}
                  onChange={() => toggleMember(label)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        )}

        {/* Aadhaar */}
        {showAadharAndPan && (
          <>
            <div>
              <label className="font-medium">Aadhar Number</label>
              <input
                type="number"
                name="aadharNo"
                className="w-full border p-2 rounded"
                value={form.aadharNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-medium">PAN Number</label>
              <input
                type="text"
                name="panNo"
                className="w-full border p-2 rounded"
                value={form.panNo}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* Vehicle Number → only for car / 2 wheeler */}
        {showVehicle && (
          <div>
            <label className="font-medium">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNo"
              className="w-full border p-2 rounded"
              value={form.vehicleNo}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Loan Amount → only for loans */}
        {showLoanAmount && (
          <div>
            <label className="font-medium">Loan Amount</label>
            <input
              type="number"
              name="loanAmount"
              className="w-full border p-2 rounded"
              value={form.loanAmount}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 text-white w-full p-2 rounded mt-4"
        >
          Submit Offline Inquiry
        </button>
      </form>
    </div>
  );
};

export default OfflineInquiry;
