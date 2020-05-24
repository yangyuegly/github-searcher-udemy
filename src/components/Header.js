import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

class Header extends Component {
  onLogin() {
    this.props.onLogin();
  }

  onLogout() {
    this.props.onLogout();
  }

  render() {
    let page;
    if (this.props.idToken) {
      page = (
        <Nav.Link onClick={this.onLogout.bind(this)} href="#">
          {" "}
          Logout
        </Nav.Link>
      );
    } else {
      page = (
        <Nav.Link onClick={this.onLogin.bind(this)} href="#">
          {" "}
          Login
        </Nav.Link>
      );
    }

    return (
      <Navbar>
        <Navbar.Brand>Github Searcher</Navbar.Brand>
        <Nav className="mr-auto">{page}</Nav>
      </Navbar>
    );
  }
}

export default Header;
