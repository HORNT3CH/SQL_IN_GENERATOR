import React from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => (
  <Container className="mt-4 text-center">
    <h2>Korber Support Tools</h2>
    <div className="d-flex justify-content-center gap-3">
      <Card bg="primary" text="white" className="p-2">
        <Card.Title><Link to="/app1" className="text-white text-decoration-none">Remove Double Quotes</Link></Card.Title>
      </Card>
      <Card bg="primary" text="white" className="p-2">
        <Card.Title><Link to="/app2" className="text-white text-decoration-none">Convert List</Link></Card.Title>
      </Card>
    </div>
  </Container>
);

export default Home;
