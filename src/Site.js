import React, { Component } from 'react';
import { Grid, Col } from "react-bootstrap";
import LocationDetails from "./LocationDetails";

import "./Site.css";

class Site extends Component {
  componentDidMount() {
    console.log("didmount");
      fetch(`http://coa-flask-app-dev.us-east-1.elasticbeanstalk.com/sitecategoriesbreakdown`,
            {"method": 'GET', "mode": "cors"}) 
          .then(
              function(results) {
                console.log("hello");
                results.json().then(
                  function(data) {
                    console.log(data);
                  });
              }
            , function() { console.log("Failed to hit back-end server."); });
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