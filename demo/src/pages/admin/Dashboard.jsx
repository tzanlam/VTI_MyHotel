import React from "react";
import { Card, Table, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div className="p-4 bg-light min-vh-100">
      <h2 className="mb-4 fw-bold">📊 Dashboard</h2>

      {/* Statistics Cards */}
      <Row className="mb-4">
        {[
          { label: "Total Bookings", value: 12 },
          { label: "Available Rooms", value: 8 },
          { label: "Check-ins", value: 24 },
          { label: "Check-outs", value: 18 },
        ].map((stat, index) => (
          <Col md={3} key={index}>
            <Card className="shadow-sm text-center">
              <Card.Body>
                <h3 className="fw-bold text-primary">{stat.value}</h3>
                <p className="mb-0 text-muted">{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Bookings */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="fw-bold">🧾 Recent Bookings</Card.Header>
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-in</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>John Doe</td><td>101</td><td>2024-04-22</td></tr>
              <tr><td>Jane Smith</td><td>202</td><td>2024-04-25</td></tr>
              <tr><td>Robert Brown</td><td>105</td><td>2024-04-24</td></tr>
              <tr><td>Emily Johnson</td><td>210</td><td>2024-04-28</td></tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Room Status */}
      <Card className="shadow-sm">
        <Card.Header className="fw-bold">🛏️ Room Status</Card.Header>
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Room</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Room 101</td><td className="text-danger">Occupied</td></tr>
              <tr><td>Room 102</td><td className="text-success">Vacant</td></tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
