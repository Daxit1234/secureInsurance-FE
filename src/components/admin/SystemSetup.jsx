import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Nav,
} from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";
import DynamicForm from "./DynamicForm";
import Sidebar from "./Sidebar";
import DataTable from "react-data-table-component";
import { Edit3, PlusCircle, Trash2 } from "feather-icons-react";

export default function SystemSetup() {
  const [systemList, setSystemList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [editId, setEditId] = useState(null);

  const tabs = [
    { key: "All", value: "" },
    { key: "About Us", value: "about_us" },
    { key: "Insurance Plans Us", value: "insurance_plans" },
    { key: "Investment Services", value: "investment_services" },
    { key: "Financial Planning", value: "financial_planning" },
    { key: "Services", value: "services" },
  ];

  useEffect(() => {
    fetchSystemList();
  }, []);

  const fetchSystemList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/system/list?section=${activeTab}&page=${page}&limit=${perPage}`
      );
      setTotalRows(res?.data?.total);
      setSystemList(res?.data?.data);
    } catch (err) {
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemList();
  }, [activeTab, page, perPage]);
  const handleAdd = () => {
    setSelectedItem(null);
    setDrawerOpen(true);
  };

  const handleEdit = (item) => {
    setEditId(item?._id);
    setDrawerOpen(true);
  };
  const handleDelete = async (ids) => {
    setLoading(true);
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
          `${import.meta.env.VITE_API_URL}/system/delete`,
          { ids },
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.status === 200) {
          setSelectedRows([]);
          fetchSystemList();

          Swal.fire(
            "Deleted!",
            ids.length > 1
              ? "Selected data have been deleted successfully."
              : "Data deleted successfully.",
            "success"
          );
        } else {
          Swal.fire("Error", "Failed to delete Data.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete data.", "error");
      }
    }
    setLoading(false);
  };
  const handleDeleteSelected = () => {
    if (selectedRows.length === 0)
      return Swal.fire(
        "No Selection",
        "Please select at least one record!",
        "info"
      );

    handleDelete(selectedRows); // use same API
  };

  const handleSelectedRowsChange = (state) => {
    const ids = state.selectedRows.map((r) => r._id);
    setSelectedRows(ids);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    fetchSystemList();
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Order",
      selector: (row) => row.order,
    },
    {
      name: "Section",
      selector: (row) => row.section,
    },
    {
      name: "Image",
      selector: (row) => (
        <>
          <div className="h-[100px] w-[100px] p-1 overflow-hidden rounded-lg">
            <img
              src={row?.imageUrl}
              alt={row?.title || ""}
              className="h-full w-full object-cover"
            />
          </div>
        </>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex">
          <div className="cursor-pointer" onClick={() => handleEdit(row)}>
            <Edit3 size={20} />
          </div>
          <div
            onClick={() => handleDelete([row._id])}
            className="cursor-pointer" // pass array with single ID
          >
            <Trash2 size={20} color="red" />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="d-flex">
      <div className="md:w-1/4">
        <Sidebar />
      </div>
      <Container className="pt-3 vh-100 overflow-scroll ">
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
        <Row>
          {/* Search & Delete */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3 mb-4 gap-3">
            <Col>
              <Button
                color="primary flex align-items-center"
                onClick={handleAdd}
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add
              </Button>
            </Col>
            {selectedRows.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete Selected ({selectedRows.length})
              </button>
            )}
          </div>
        </Row>

        <Row>
          <Col>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <DataTable
                  columns={columns}
                  data={systemList}
                  progressPending={loading}
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
                  highlightOnHover
                  striped
                  responsive
                  className="w-full"
                />
              </div>
            )}
          </Col>
        </Row>

        {/* Drawer / Offcanvas */}
        <Offcanvas
          isOpen={drawerOpen}
          toggle={closeDrawer}
          className="w-50"
          direction="end"
        >
          <OffcanvasHeader toggle={closeDrawer}>
            {editId ? "Edit Item" : "Add New Item"}
          </OffcanvasHeader>
          <OffcanvasBody>
            <DynamicForm
              setEditId={setEditId}
              editId={editId} // Pass existing data to prefill form
              onSuccess={closeDrawer} // Close drawer after save
            />
          </OffcanvasBody>
        </Offcanvas>
      </Container>
    </div>
  );
}
