import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Home from "./components/Home";
import App1 from "./components/App1";
import App2 from "./components/App2";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={darkMode ? "bg-dark text-white" : "bg-light text-dark"} style={{ minHeight: "100vh" }}>
        <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Korber Support</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/app1">Remove Double Quotes</Nav.Link>
              <Nav.Link as={Link} to="/app2">Convert List</Nav.Link>
            </Nav>
            <Button variant={darkMode ? "light" : "dark"} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app1" element={<App1 />} />
          <Route path="/app2" element={<App2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
