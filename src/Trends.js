import React, { Component } from "react";

import { Grid, Row, Col, Panel } from "react-bootstrap";

import { FilterComponent } from './FilterComponent';

import "./Trends.css";

export class Trends extends Component {
  render() {
    return (
      <Grid fluid>
        <Col xs={11}>
        </Col>
        <Col xs={1}>
          <FilterComponent />
        </Col>
      </Grid>
    );
  }
}

export default Trends;