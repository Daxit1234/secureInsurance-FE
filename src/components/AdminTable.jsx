import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { Trash2 } from "feather-icons-react";
import Sidebar from "./admin/Sidebar";
import { exportToExcel } from "../helper";
import { Nav, NavItem, NavLink, Button } from "reactstrap";

const AdminTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pending, setPending] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { key: "All", value: "" },
    { key: "Term Life Insurance", value: "TermLife" },
    { key: "Health Insurance", value: "HealthInsurance" },
    { key: "Investment Plans", value: "InvestmentPlans" },
    { key: "Car Insurance", value: "CarInsurance" },
    { key: "2 Wheeler Insurance", value: "TwoWheeler" },
    { key: "Family Health Insurance", value: "FamilyHealth" },
    { key: "Travel Insurance", value: "TravelInsurance" },
    { key: "Mourgage Loan", value: "MourgageLoan" },
    { key: "Term Plan with Return", value: "TermPlanwithReturns" },
    { key: "Guaranteed Return Plan", value: "GuaranteedReturnPlans" },
    { key: "Child Savings Plan", value: "ChildSavingsPlans" },
    { key: "Retirement Plan", value: "RetirementPlans" },
    { key: "Home Loan", value: "HomeLoan" },
    { key: "Personal Loan", value: "PersonalLoan" },
  ];

  // Fetch Data
  const fetchUsers = async (
    page,
    perPage,
    search,
    sortBy,
    order,
    activeTab
  ) => {
    try {
      setPending(true);
      const insuranceType = activeTab === "All" ? "" : activeTab;
      // const res = await axios(`${import.meta.env.VITE_API_URL}/users/list`, {
      const res = await axios(`http://localhost:4000/api/users/list`, {
        params: { page, limit: perPage, search, sortBy, order, insuranceType },
      });

      setUsers(res?.data?.data);
      setTotalRows(res?.data?.total);
    } catch (err) {
      console.error(err);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, perPage, search, sortField, sortOrder, activeTab);
  }, [page, perPage, search, sortField, sortOrder, activeTab]);

  // Unified delete function (works for single or multiple)
  const handleDelete = async (ids) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text:
        ids.length > 1
          ? `You are about to delete ${ids.length} users!`
          : "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/delete`,
          { ids },
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.status === 200) {
          setSelectedRows([]);
          fetchUsers(page, perPage, search, sortField, sortOrder);

          Swal.fire(
            "Deleted!",
            ids.length > 1
              ? "Selected users have been deleted successfully."
              : "User deleted successfully.",
            "success"
          );
        } else {
          Swal.fire("Error", "Failed to delete users.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete users.", "error");
      }
    }
  };

  // Columns
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      sortField: "name",
    },
    {
      name: "Date of Birth",
      selector: (row) => (row.dob ? moment(row.dob).format("DD-MM-YYYY") : "-"),
      sortable: true,
      sortField: "dob",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      sortField: "email",
    },
    { name: "Contact", selector: (row) => row.phoneNo },
    { name: "Insurance Type", selector: (row) => row.insuranceType || "-" },
    {
      name: "Members",
      cell: (row) => {
        const members = row?.members || [];
        if (members.length === 0) return "-";

        const displayText =
          members.length > 2
            ? `${members.slice(0, 2).join(", ")} +${members.length - 2} more`
            : members.join(", ");

        return (
          <>
            <div
              data-tooltip-id={`members-${row._id}`}
              data-tooltip-content={members.join(", ")} // ✅ full list in tooltip
              className="truncate max-w-[180px] cursor-pointer"
            >
              {displayText}
            </div>
            <Tooltip
              id={`members-${row._id}`}
              place="top"
              style={{
                backgroundColor: "#0b3554",
                color: "white",
                fontSize: "13px",
              }}
            />
          </>
        );
      },
    },

    { name: "Gender", selector: (row) => row.gender || "-" },
    {
      name: "InquiryDate",
      selector: (row) => moment(row.createdAt).format("DD-MM-YYYY"),
    },
    {
      name: "Action",
      cell: (row) => (
        <div
          onClick={() => handleDelete([row._id])}
          className="cursor-pointer" // pass array with single ID
        >
          <Trash2 size={20} color="red" />
        </div>
      ),
    },
  ];

  // Handle selection
  const handleSelectedRowsChange = (state) => {
    const ids = state.selectedRows.map((r) => r._id);
    setSelectedRows(ids);
  };

  // Handle multiple delete
  const handleDeleteSelected = () => {
    if (selectedRows.length === 0)
      return Swal.fire(
        "No Selection",
        "Please select at least one record!",
        "info"
      );

    handleDelete(selectedRows); // use same API
  };

  // Handle sorting
  const handleSort = (column, sortDirection) => {
    setSortField(column.sortField);
    setSortOrder(sortDirection);
  };

  const exportClick = async () => {
    const res = await axios(`http://localhost:4000/api/users/searchall`);
    generateExcel(res?.data?.data);
  };

  const generateExcel = (data) => {
    // Define Excel headers
    const headerAry = [
      "Name",
      "Email",
      "Phone No",
      "Insurance Type",
      "Members",
      "Created At",
    ];

    // Format and map data
    const expData = data?.map((cDetails) => ({
      Name: cDetails?.name || "",
      Email: cDetails?.email || "",
      "Phone No": cDetails?.phoneNo || "",
      "Insurance Type": cDetails?.insuranceType || "",
      Members: Array.isArray(cDetails?.members)
        ? cDetails.members.join(", ")
        : "",
      "Created At": cDetails?.createdAt
        ? new Date(cDetails.createdAt).toLocaleString()
        : "",
    }));

    // Export to Excel
    exportToExcel(expData, "Customer_Inquiry", headerAry);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - 30% width on desktop, full width on small screens */}
      <div className="w-full md:w-1/4  shadow-md">
        <Sidebar />
      </div>

      {/* Main Content - 70% width on desktop */}
      <div className="w-full vh-100 md:w-2/2 p-6 overflow-y-auto">
        <h3 className="text-2xl font-semibold mb-4">Customer Inquiry</h3>

        <button
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
          onClick={exportClick}
        >
          Export to Excel
        </button>

        <Nav pills className="flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded transition-all ${
                activeTab === tab.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.key}
            </button>
          ))}
        </Nav>

        {/* Search & Delete */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {selectedRows.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete Selected ({selectedRows.length})
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <DataTable
            columns={columns}
            data={users}
            progressPending={pending}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangePage={(page) => setPage(page)}
            onChangeRowsPerPage={(newPerPage) => {
              setPerPage(newPerPage);
              setPage(1);
            }}
            selectableRows
            onSelectedRowsChange={handleSelectedRowsChange}
            sortServer
            onSort={handleSort}
            highlightOnHover
            striped
            responsive
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
