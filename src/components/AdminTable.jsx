import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { Trash2 } from "feather-icons-react";

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

  // Fetch Data
  const fetchUsers = async (page, perPage, search, sortBy, order) => {
    try {
      setPending(true);
      const res = await axios(`${import.meta.env.VITE_API_URL}/users/list`, {
        params: { page, limit: perPage, search, sortBy, order },
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
    fetchUsers(page, perPage, search, sortField, sortOrder);
  }, [page, perPage, search, sortField, sortOrder]);

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">User List</h1>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name, email, inquiryTime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        {selectedRows.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Selected ({selectedRows.length})
          </button>
        )}
      </div>

      {/* Data Table */}
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
        className="bg-white rounded shadow"
      />
    </div>
  );
};

export default AdminTable;
