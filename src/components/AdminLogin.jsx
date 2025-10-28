import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      sessionStorage.setItem("admin", "true");
      navigate("/admin");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Row className="w-100">
        <Col md={{ size: 4, offset: 4 }}>
          <Card className="shadow-lg">
            <CardBody>
              <CardTitle tag="h3" className="text-center mb-4">
                Admin Login
              </CardTitle>
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </FormGroup>
                <Col className="text-center">
                  <Button color="primary" block type="submit">
                    Login
                  </Button>
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
