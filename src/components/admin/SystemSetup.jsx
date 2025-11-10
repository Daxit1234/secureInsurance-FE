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
    OffcanvasBody
} from "reactstrap";
import axios from "axios";
import DynamicForm from "./DynamicForm";
import Sidebar from "./Sidebar";


export default function SystemSetup() {
    const [systemList, setSystemList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchSystemList();
    }, []);

    const fetchSystemList = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:4000/api/system/list`);
            setSystemList(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedItem(null);
        setDrawerOpen(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setDrawerOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete?")) return;
        try {
            await axios.delete(`http://localhost:4000/api/system/delete/${id}`);
            fetchSystemList();
            alert("Deleted successfully");
        } catch (err) {
            console.error(err);
            alert("Delete failed");
        }
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        fetchSystemList();
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <Container className="mt-5">
                <Row className="mb-3">
                    <Col>
                        <Button color="primary" onClick={handleAdd}>➕ Add New</Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ListGroup>
                                {systemList.map((item) => (
                                    <ListGroupItem key={item._id} className="d-flex justify-content-between align-items-center">
                                        <div>{item.section}: {item.details?.title || "No Title"}</div>
                                        <div>
                                            <Button color="info" size="sm" className="me-2" onClick={() => handleEdit(item)}>Edit</Button>
                                            <Button color="danger" size="sm" onClick={() => handleDelete(item._id)}>Delete</Button>
                                        </div>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </Col>
                </Row>

                {/* Drawer / Offcanvas */}
                <Offcanvas isOpen={drawerOpen} toggle={closeDrawer} className="w-50" direction="end">
                    <OffcanvasHeader toggle={closeDrawer}>
                        {selectedItem ? "Edit Item" : "Add New Item"}
                    </OffcanvasHeader>
                    <OffcanvasBody>
                        <DynamicForm
                            existingData={selectedItem}  // Pass existing data to prefill form
                            onSuccess={closeDrawer}      // Close drawer after save
                        />
                    </OffcanvasBody>
                </Offcanvas>
            </Container>
        </div>
    );
}
