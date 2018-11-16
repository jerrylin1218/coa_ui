import React, { Component } from 'react';
import { Grid, Col } from "react-bootstrap";
import LocationDetails from "./LocationDetails";

import "./Site.css";

class Site extends Component {
  componentDidMount() {
  }
  
  render() {
    return (
      <Grid fluid>
        <Col xs={12}>
        <LocationDetails />
        </Col>
      </Grid>
    );
  }
}

export default Site;