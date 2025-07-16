import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => (
  <Container className="mt-4 text-center">
    <h2>MIS Applications</h2>
    <Row className="justify-content-center mt-3">
      {[
        { to: "/app1", title: "NOT/IN Creator (Remove Double Quotes)" },
        { to: "/app2", title: "NOT/IN Creator (From Unquoted List)" },
        { to: "/app3", title: "Saved Queries" },
        { to: "/todo", title: "Todo App" },
        { to: "/xml", title: "XML to JSON Converter" },
        { to: "/sql", title: "SQL Prettifier" },
        { to: "/case", title: "Case Converter" },
        { to: "/xmlviewer", title: "XML Viewer" },
        { to: "/d365list", title: "D365 List" }
      ].map((item, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
          <Card className="h-100 shadow">
            <Card.Body className="d-flex align-items-center justify-content-center">
              <Card.Title className="text-center">
                <Link to={item.to} className="stretched-link text-dark text-decoration-none">
                  {item.title}
                </Link>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default Home;
