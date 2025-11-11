import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import { formConfig } from "./FormConfig";
import Swal from "sweetalert2";
import { PlusCircle } from "feather-icons-react";

export default function DynamicForm({ editId = null, setEditId, onSuccess }) {
  const [step, setStep] = useState(null); // Step 1: select section
  const [section, setSection] = useState("");
  const [formData, setFormData] = useState({});
  const [listInputs, setListInputs] = useState({});
  const [image, setImage] = useState(null);
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: handle section select
  const handleSectionSelect = (e) => {
    setSection(e.target.value);
    setStep(2);
  };
  useEffect(() => {
    if (editId) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/system/details/${editId}`)
        .then((res) => {
          setFormData(res.data?.details);
          setListInputs(res.data?.details || []);
          setImage(res.data?.imageUrl);
          setOrder(res.data?.order);
          setSection(res.data?.section);
          setStep(2);
        })
        .finally(() => setLoading(false));
    }
    return () => {
      setEditId(null);
    };
  }, [editId]);
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
      debugger;
      const details = { ...formData };
      if (listInputs?.benefits) details.benefits = listInputs.benefits;
      const uploadData = new FormData();
      uploadData.append("section", section);
      uploadData.append("order", order);
      uploadData.append("details", JSON.stringify(details));
      if (image) uploadData.append("image", image);

      const API_URL = `${import.meta.env.VITE_API_URL}/system`;

      if (editId) {
        await axios.put(`${API_URL}/edit/${editId}`, uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire(
          "Updated!",
          "Your data has been updated successfully.",
          "success"
        );
      } else {
        await axios.post(`${API_URL}/add`, uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire(
          "Saved!",
          "Your data has been saved successfully.",
          "success"
        );
      }

      setFormData({});
      setListInputs({});
      setImage(null);
      setSection("");
      setStep(1);
      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to save data.", "error");
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
          <h4 className="mb-4 text-primary text-capitalize">
            {section.replace("_", " ")}
          </h4>

          {fields.map((field, i) => (
            <FormGroup key={i}>
              <Label for={field?.name}>{field?.label}</Label>

              {field.type === "text" && (
                <Input
                  type="text"
                  required={field?.required}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(e, field.name)}
                />
              )}

              {field.type === "textarea" && (
                <Input
                  type="textarea"
                  required={field?.required}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(e, field.name)}
                />
              )}
              {field.type === "number" && (
                <Input
                  type="text"
                  required={field?.required}
                  value={order || ""}
                  onChange={(e) => {
                    setOrder(e.target.value);
                  }}
                />
              )}

              {field.type === "list" && (
                <div>
                  {(listInputs?.[field.name] || []).map((val, idx) => (
                    <Row key={idx} className="mb-2">
                      <Col xs="10">
                        <Input
                          value={val}
                          onChange={(e) =>
                            handleListChange(field.name, idx, e.target.value)
                          }
                        />
                      </Col>
                      <Col xs="2">
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => removeListItem(field.name, idx)}
                        >
                          ✕
                        </Button>
                      </Col>
                    </Row>
                  ))}

                  <Button
                    color="secondary"
                    size="sm"
                    className="flex"
                    onClick={() => addListItem(field.name)}
                  >
                    <PlusCircle /> Add {field.label}
                  </Button>
                </div>
              )}

              {field.type === "image" && (
                <div className="mb-4">
                  <Input
                    type="file"
                    required={field?.required && !image}
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <div className="h-40 w-40 rounded-lg">
                    {image &&
                      (typeof image === "string" ? (
                        <img
                          src={image}
                          alt="Uploaded Image"
                          className="h-[100%] w-[100%] mt-4"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Uploaded Image"
                          className="h-[100%] w-[100%] mt-4"
                        />
                      ))}
                  </div>
                </div>
              )}
            </FormGroup>
          ))}

          <Button color="primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : editId ? "Update Data" : "Save Data"}
          </Button>
        </>
      )}
    </Form>
  );
}
