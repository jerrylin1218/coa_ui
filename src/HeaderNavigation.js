import React, { Component } from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap'

class HeaderNavigation extends Component {
  render() {
    return (
      <div className="HeaderNavigation">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Clean Ocean Action</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Map</NavItem>
            <NavItem eventKey={2} href="#">Site</NavItem>
            <NavItem eventKey={3} href="#">Trends</NavItem>
            <NavItem eventKey={4} href="#">About</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default HeaderNavigation;
