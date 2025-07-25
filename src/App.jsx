import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Home from "./components/Home";
import App1 from "./components/App1";
import App2 from "./components/App2";
import App3 from "./components/App3";
import TodoApp from "./components/TodoApp";
import XmlToJsonConverter from "./components/XmlToJsonConverter";
import SqlPrettifier from "./components/SqlPrettifier";
import CaseConverter from "./components/CaseConverter";
import XmlViewer from "./components/XmlViewer";
import D365List from "./components/D365List";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={darkMode ? "bg-dark text-white" : "bg-light text-dark"} style={{ minHeight: "100vh" }}>
        <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">MIS Tools</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/app1">Remove Double Quotes</Nav.Link>
              <Nav.Link as={Link} to="/app2">Create From List</Nav.Link>
              <Nav.Link as={Link} to="/app3">Saved Queries</Nav.Link>
              <Nav.Link as={Link} to="/todo">Todo</Nav.Link>
              <Nav.Link as={Link} to="/xml">XML to JSON</Nav.Link>
              <Nav.Link as={Link} to="/sql">SQL Prettifier</Nav.Link>
              <Nav.Link as={Link} to="/case">Case Converter</Nav.Link>
              <Nav.Link as={Link} to= "/xmlviewer">XML Viewer</Nav.Link>
              <Nav.Link as={Link} to="/d365list">D365 List</Nav.Link>
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
          <Route path="/app3" element={<App3 />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/xml" element={<XmlToJsonConverter />} />
          <Route path="/sql" element={<SqlPrettifier />} />
          <Route path="/case" element={<CaseConverter />} />
          <Route path="/xmlviewer" element={<XmlViewer />} />
          <Route path="/d365List" element={<D365List />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



