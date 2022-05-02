import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Documents from "./document/Documents";

const Layout = () => {
  return (<>
    <Header />
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="p-0">
          <Documents />
        </Col>
        <Col md={9} lg={10}>
          <Container className="py-2">
            <Outlet />
          </Container>
        </Col>
      </Row>
    </Container>
  </>)
}

export default Layout;
