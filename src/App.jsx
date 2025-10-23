import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import TermLife from "./components/TermLife";
import HealthInsurance from "./components/HealthInsurance";
import Health from "./components/Health";
import InvestmentPlans from "./components/InvestmentPlans";
import CarInsurance from "./components/CarInsurance";
import TwoWheeler from "./components/TwoWheeler";
import FamilyHealth from "./components/FamilyHealth";
import TravelInsurance from "./components/TravelInsurance";
import MourgageLoan from "./components/MourgageLoan";
import TermPlanwithReturns from "./components/TermPlanwithReturns";
import GuaranteedReturnPlans from "./components/GuaranteedReturnPlans";
import ChildSavingsPlans from "./components/ChildSavingsPlans.jsx";
import RetirementPlans from "./components/RetirementPlans";
import HomeLoan from "./components/HomeLoan";
import PersonalLoan from "./components/PersonalLoan";
import AdminTable from "./components/AdminTable";


function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page (All sections) */}
        <Route
          path="/"
          element={
            <div className="App">
              <Header />
              <main>
                <section id="home"><Hero /></section>
                <section id="about"><About /></section>
                <section id="services"><Services /></section>
                <section id="contact"><Contact /></section>
              </main>
            </div>
          }
        />

        {/* Individual Pages */}
        <Route path="/admin" element={<AdminTable />} />

        <Route path="/hero" element={<Hero />} />
        <Route path="/TermLife" element={<TermLife />} />
        <Route path="/HealthInsurance" element={<HealthInsurance />} />
        <Route path="/Health" element={<Health />} /> {/* ✅ Added Health route */}
        <Route path="/InvestmentPlans" element={<InvestmentPlans />} />
        <Route path="/CarInsurance" element={<CarInsurance />} />
        <Route path="/TwoWheeler" element={<TwoWheeler />} />
        <Route path="/FamilyHealth" element={<FamilyHealth />} />
        <Route path="/TravelInsurance" element={<TravelInsurance />} />
        <Route path="/MourgageLoan" element={<MourgageLoan />} />
        <Route path="/TermPlanwithReturns" element={<TermPlanwithReturns />} />
        <Route path="/GuaranteedReturnPlans" element={<GuaranteedReturnPlans />} />
        <Route path="/ChildSavingsPlans" element={<ChildSavingsPlans />} />
        <Route path="/RetirementPlans" element={<RetirementPlans />} />
        <Route path="/HomeLoan" element={<HomeLoan />} />
        <Route path="/PersonalLoan" element={<PersonalLoan />} />
      </Routes>
    </Router>
  );
}

export default App;
