import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import AdminTable from "./components/admin/AdminTable.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import CustomerInquiry from "./components/admin/CustomerInqury.jsx";
import SystemSetup from "./components/admin/SystemSetup.jsx";
import { getSystemSetupData } from "./redux/actions/system.js";
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "./common/pageLoader.jsx";
import WhatsappBot from "./common/WhatsappBot.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import SIP from "./components/SIP.jsx";
import MutualFunds from "./components/MutualFunds.jsx";

function ProtectedRoute({ children }) {
  const isAdmin = sessionStorage.getItem("admin");
  return isAdmin ? children : <Navigate to="/adminLogin" />;
}

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.systemReducer);
  useEffect(() => {
    getSystemSetupData(dispatch);
  }, []);
  return (
    <>
      {loading && <FullPageLoader />}
      <Router>
        <Routes>
          {/* Home Page (All sections) */}
          <Route
            path="/"
            element={
              <div className="App">
                <Header />
                <main>
                  <section id="home">
                    <Hero />
                  </section>
                  <section id="services">
                    <Services />
                  </section>
                  <section id="contact">
                    <Contact />
                  </section>
                </main>
              </div>
            }
          />
          {/* Individual Pages */}
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route
            path="/admin/inquiry"
            element={
              <ProtectedRoute>
                <AdminTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/system-setup"
            element={
              <ProtectedRoute>
                <SystemSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/hero" element={<Hero />} />
          <Route path="/TermLife" element={<TermLife />} />
          <Route path="/HealthInsurance" element={<HealthInsurance />} />
          <Route path="/Health" element={<Health />} />{" "}
          {/* ✅ Added Health route */}
          <Route path="/InvestmentPlans" element={<InvestmentPlans />} />
          <Route path="/CarInsurance" element={<CarInsurance />} />
          <Route path="/TwoWheeler" element={<TwoWheeler />} />
          <Route path="/FamilyHealth" element={<FamilyHealth />} />
          <Route path="/TravelInsurance" element={<TravelInsurance />} />
          <Route path="/MortgageLoan" element={<MourgageLoan />} />
          <Route
            path="/TermPlanwithReturns"
            element={<TermPlanwithReturns />}
          />
          <Route
            path="/GuaranteedReturnPlans"
            element={<GuaranteedReturnPlans />}
          />
          <Route path="/ChildSavingsPlans" element={<ChildSavingsPlans />} />
          <Route path="/RetirementPlans" element={<RetirementPlans />} />
          <Route path="/HomeLoan" element={<HomeLoan />} />
          <Route path="/PersonalLoan" element={<PersonalLoan />} />
          <Route path="/SIP" element={<SIP />} />
          <Route path="/MutualFunds" element={<MutualFunds />} />
        </Routes>
      </Router>
      <WhatsappBot />
    </>
  );
}

export default App;
