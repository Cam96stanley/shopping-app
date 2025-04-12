import { NavLink, Outlet } from "react-router-dom";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  return (
    <>
      <Navbar bg="info" variant="light" expand="lg" className="p-2 mb-4">
        <Navbar.Brand href="/">DevMart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={NavLink} to="/" activeclassname="active">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" activeclassname="active">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-products" activeclassname="active">
              Add Products
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
    </>
  );
};

export default NavBar;
