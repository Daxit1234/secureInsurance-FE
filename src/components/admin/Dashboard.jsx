import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const insuranceType = [
  { key: "Term Life Insurance", value: "TermLife" },
  { key: "Health Insurance", value: "Health" },
  { key: "Investment Plans", value: "InvestmentPlans" },
  { key: "Car Insurance", value: "CarInsurance" },
  { key: "2 Wheeler Insurance", value: "TwoWheeler" },
  // { key: "Family Health Insurance", value: "FamilyHealth" },
  { key: "Travel Insurance", value: "TravelInsurance" },
  { key: "Mortgage Loan", value: "MortgageLoan" },
  { key: "Term Plan with Return", value: "TermPlanwithReturns" },
  { key: "Guaranteed Return Plan", value: "GuaranteedReturnPlans" },
  { key: "Child Savings Plan", value: "ChildSavingsPlans" },
  { key: "Retirement Plan", value: "RetirementPlans" },
  { key: "Home Loan", value: "HomeLoan" },
  { key: "Personal Loan", value: "PersonalLoan" },
];

const SummaryCard = ({ title, value, type }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/admin/inquiry?type=${type}`)}
      className="bg-white p-6 rounded-md shadow-md text-center"
    >
      <h5 className="text-md font-semibold mb-2">{title}</h5>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [overall, setOverall] = useState({});
  const [byType, setByType] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/users/searchall`
      );
      setLeads(res?.data?.data || []);
    };
    fetchData();
  }, []); // IMPORTANT: Add [] to prevent infinite loop

  useEffect(() => {
    if (leads.length > 0) {
      calculateStats();
    }
  }, [leads]);

  // 🎯 FUNCTION TO CALCULATE ALL STATISTICS
  const calculateStats = () => {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    // ---------- OVERALL STATS ----------
    const todayLeads = leads.filter(
      (lead) => new Date(lead.createdAt).toDateString() === now.toDateString()
    );

    const last7Leads = leads.filter(
      (lead) => new Date(lead.createdAt) >= sevenDaysAgo
    );

    const overallStats = {
      today: todayLeads.length,
      last7: last7Leads.length,
      total: leads.length,
    };
    setOverall(overallStats);

    const typeStats = {};

    insuranceType
      .map((type) => type.value)
      .forEach((type) => {
        const filtered = leads.filter((l) => l.insuranceType === type);

        typeStats[type] = {
          today: filtered.filter(
            (l) => new Date(l.createdAt).toDateString() === now.toDateString()
          ).length,
          last7: filtered.filter((l) => new Date(l.createdAt) >= sevenDaysAgo)
            .length,
          total: filtered.length,
        };
      });

    console.log(typeStats);
    setByType(typeStats);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full md:w-1/4 shadow-md">
        <Sidebar />
      </div>

      <div className="w-full vh-100 md:w-2/2 p-6 overflow-y-auto">
        <h3 className="text-2xl font-semibold mb-6">Dashboard Summary</h3>
        {/* OVERALL ROW */}
        <h1 className="text-2xl font-semibold mb-3">Over All Leads</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <SummaryCard
            title="Today's Total Leads"
            value={overall.today}
            type={""}
          />
          <SummaryCard
            title="Last 7 Total Leads"
            value={overall.last7}
            type={""}
          />
          <SummaryCard
            title="Total Total Leads"
            value={overall.total}
            type={""}
          />
        </div>

        {/* INSURANCE TYPE WISE ROWS */}
        {insuranceType.map((type) => (
          <div key={type.value} className="mb-2">
            <h4 className="text-xl font-semibold mb-3">{type?.key}</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <SummaryCard
                title={`Today's Leads`}
                value={byType?.[type.value]?.today || 0}
                type={type.value}
              />
              <SummaryCard
                title={`Last 7 Days Leads`}
                value={byType?.[type.value]?.last7 || 0}
                type={type.value}
              />
              <SummaryCard
                title={`Total Leads`}
                value={byType?.[type.value]?.total || 0}
                type={type.value}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
