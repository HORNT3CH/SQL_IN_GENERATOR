import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => (
  <Container className="mt-4 text-center">
    <h2>MIS Applications</h2>
    <div className="d-flex justify-content-center gap-3">
      <Card bg="primary" text="white" className="p-2">
        <Card.Title><Link to="/app1" className="text-white text-decoration-none">NOT/IN Creator (Remove Double Quotes)</Link></Card.Title>
      </Card>
      <Card bg="primary" text="white" className="p-2">
        <Card.Title><Link to="/app2" className="text-white text-decoration-none">NOT/IN Creator (From Unquoted List)</Link></Card.Title>
      </Card>
      <Card bg="primary" text="white" className="p-2">
        <Card.Title><Link to="/app3" className="text-white text-decoration-none">Saved Queries</Link></Card.Title>
      </Card>
      <Card bg="primary" text="white" className="p-2">
        <Card.Title><Link to="/todo" className="text-white text-decoration-none">Todo App</Link></Card.Title>
      </Card>
    </div>
  </Container>
);

export default Home;
