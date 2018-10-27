import React, { Component } from "react";

import { Grid, Col, Panel } from "react-bootstrap";

import { FilterComponent } from './FilterComponent';
import { HistoricalTrendsComponent } from './HistoricalTrendsChart';

import "./Trends.css";

export class Trends extends Component {
  render() {
    return (
      <Grid fluid>
        <Panel>
          <Panel.Heading>Historical Trends</Panel.Heading>
          <Panel.Body>
            <Col md={9}>
              <div>
                <HistoricalTrendsComponent/>
              </div>
            </Col>
            <Col md={3}>
              <div>
                <FilterComponent />
              </div>
            </Col>
          </Panel.Body>
        </Panel>
      </Grid>
    );
  }
}

export default Trends;