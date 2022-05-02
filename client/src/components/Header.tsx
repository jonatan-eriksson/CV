import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (<>
    <Navbar bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand>CV</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  </>)
}

export default Header;
