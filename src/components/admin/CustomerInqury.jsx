import { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import Sidebar from "./Sidebar";
import { exportToExcel } from "../../helper";
import AdminTable from "./AdminTable";

const insuranceTabs = [
  "All",
  "Health Insurance",
  "Life Insurance",
  "Vehicle Insurance",
  "Travel Insurance",
  "Property Insurance",
  "Investment Plans",
  "Retirement Plans",
  "Travel Insurance",
  "Property Insurance",
  "Investment Plans",
  "Retirement Plans",
];

export default function CustomerInquiry() {
  const [activeTab, setActiveTab] = useState("All");
  const data = [
    {
      name: "John Doe",
      email: "Hw9n4@example.com",
      phone: "123-456-7890",
      members: ["abc", "self", "def"],
    },
    {
      name: "Jane Smith",
      email: "mH5wT@example.com",
      phone: "987-654-3210",
      members: ["abc", "self", "def"],
    },
    {
      name: "Alice Johnson",
      email: "mH5wT@example.com",
      phone: "987-654-3210",
      members: ["abc", "self", "def"],
    },
    {
      name: "Bob Brown",
      email: "mH5wT@example.com",
      phone: "987-654-3210",
      members: ["abc", "self", "def"],
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);

  const fetchUsers = async () => {};

  return (
    <>
      <AdminTable />
    </>
  );
}
