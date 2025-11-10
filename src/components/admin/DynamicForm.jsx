import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import { formConfig } from "./FormConfig";

export default function DynamicForm({ existingData = null, onSuccess }) {
    const [step, setStep] = useState(existingData ? 2 : 1); // Step 1: select section
    const [section, setSection] = useState(existingData?.section || "");
    const [formData, setFormData] = useState(existingData?.details || {});
    const [listInputs, setListInputs] = useState(existingData?.details || {});
    const [image, setImage] = useState(existingData?.imageUrl || null);
    const [order, setOrder] = useState(existingData?.order || "");
    const [loading, setLoading] = useState(false);

    // Step 1: handle section select
    const handleSectionSelect = (e) => {
        setSection(e.target.value);
        setStep(2);
    };

    // Step 2: form field handlers
    const handleChange = (e, name) => {
        setFormData({ ...formData, [name]: e.target.value });
    };

    const handleListChange = (name, index, value) => {
        const list = [...(listInputs[name] || [])];
        list[index] = value;
        setListInputs({ ...listInputs, [name]: list });
    };

    const addListItem = (name) => {
        setListInputs({ ...listInputs, [name]: [...(listInputs[name] || []), ""] });
    };

    const removeListItem = (name, index) => {
        const list = [...(listInputs[name] || [])];
        list.splice(index, 1);
        setListInputs({ ...listInputs, [name]: list });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const details = { ...formData, ...listInputs };
            const uploadData = new FormData();
            uploadData.append("section", section);
            uploadData.append("order", order);
            uploadData.append("details", JSON.stringify(details));
            if (image) uploadData.append("image", image);

            const API_URL = "http://localhost:4000/api/system";

            if (existingData) {
                await axios.put(`${API_URL}/edit/${existingData._id}`, uploadData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("✅ Updated successfully!");
            } else {
                await axios.post(`${API_URL}/add`, uploadData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("✅ Created successfully!");
            }

            setFormData({});
            setListInputs({});
            setImage(null);
            setSection("");
            setStep(1);
            onSuccess && onSuccess();
        } catch (err) {
            console.error(err);
            alert("❌ Save failed");
        } finally {
            setLoading(false);
        }
    };

    // Get fields dynamically based on selected section
    const fields = section ? formConfig[section] || [] : [];

    return (
        <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <FormGroup>
                <Label>Select Section</Label>
                <Input type="select" value={section} onChange={handleSectionSelect}>
                    <option value="">-- Select Section --</option>
                    {Object.keys(formConfig).map((key) => (
                        <option key={key} value={key}>
                            {key.replace("_", " ")}
                        </option>
                    ))}
                </Input>
            </FormGroup>

            {section && (
                <>
                    <h4 className="mb-4 text-primary text-capitalize">{section.replace("_", " ")}</h4>

                    {fields.map((field, i) => (
                        <FormGroup key={i}>
                            <Label for={field?.name}>{field?.label}</Label>

                            {field.type === "text" && (
                                <Input type="text" required={field?.required} value={formData[field.name] || ""} onChange={(e) => handleChange(e, field.name)} />
                            )}

                            {field.type === "textarea" && (
                                <Input type="textarea" required={field?.required} value={formData[field.name] || ""} onChange={(e) => handleChange(e, field.name)} />
                            )}
                            {field.type === "number" && (
                                <Input type="number" required={field?.required} value={order || ""} onChange={(e) => setOrder(e.target.value)} />
                            )}

                            {field.type === "list" && (
                                <div>
                                    {(listInputs[field.name] || []).map((val, idx) => (
                                        <Row key={idx} className="mb-2">
                                            <Col xs="10">
                                                <Input value={val} onChange={(e) => handleListChange(field.name, idx, e.target.value)} />
                                            </Col>
                                            <Col xs="2">
                                                <Button color="danger" size="sm" onClick={() => removeListItem(field.name, idx)}>✕</Button>
                                            </Col>
                                        </Row>
                                    ))}
                                    <Button color="secondary" size="sm" onClick={() => addListItem(field.name)}>➕ Add {field.label}</Button>
                                </div>
                            )}

                            {field.type === "image" && (
                                <div className="mb-4">
                                    <Input type="file" required={field?.required && !image} accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                    {image && (
                                        typeof image === "string" ? (
                                            <img src={image} alt="Uploaded Image" className="img-fluid mt-4" />
                                        ) : (
                                            <img src={URL.createObjectURL(image)} alt="Uploaded Image" className="img-fluid mt-4" />
                                        )
                                    )}
                                </div>
                            )}
                        </FormGroup>
                    ))}

                    <Button color="primary" type="submit" disabled={loading}>
                        {loading ? "Saving..." : existingData ? "Update Data" : "Save Data"}
                    </Button>
                </>
            )}
        </Form>
    );
}
