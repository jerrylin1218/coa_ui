import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import "./HeaderNavigation.css"

class HeaderNavigation extends Component {
  render() {
    return (
      <div className="HeaderNavigation">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/about">Clean Ocean Action</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullRight>
            <NavItem href="/map">Map</NavItem>
            <NavItem href="/site">Site</NavItem>
            <NavItem href="/trends">Trends</NavItem>
            <NavItem href="/about">About</NavItem>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default HeaderNavigation;
