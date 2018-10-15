import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

import { FilterComponent } from './FilterComponent';
import { DirtyDozenComponent } from './DirtyDozen';

import "./LocationDetails.css"



const transformSiteNamesToSelectOptions =
  (data) => { return data.map((name)=>{ return {label: name, value: name}; }); };

class LocationDetails extends Component {
    
  constructor(props)
  {
    super(props);
    this.state = {
      locationOptions: [{
        label: "Sites",
        options: []
      }]
    };
  }

  componentDidMount()
  {
    //TODO: axiom request for stuff
    fetch(`http://coa-flask-app-dev.us-east-1.elasticbeanstalk.com/getsitesdropdownlist`,
            {"method": 'GET', "mode": "cors"}) 
          .then(
              function(results) {
                console.log("hello");
                results.json().then(this.updateLocationOptions.bind(this));
              }.bind(this)
            , function() { console.log("Failed to hit back-end service."); });
  }

  updateLocationOptions(data)
  {
    console.log("updateLocationOptions", data);
    this.setState({
      locationOptions: [
        {
          label: "Sites",
          options: transformSiteNamesToSelectOptions(data.site_names)
        }
      ],
      // location: {label: data.site_names[2], value: data.site_names[2]}
    });
    // TODO: remove -- this just provides a valid start-up value to populate the screen
    // need to also select the right value in the Select dropdown
    // this.handleLocationChanged({value: data.site_names[2]});
  }

  handleLocationChanged(selection, action)
  {
    console.log(selection, action);
    this.dirtyDozen.setLocation(selection.value);
  }

  render() {
    return (
      <div className="LocationDetails">
        <Grid>
        <Row>
            <Col xs={2} md={1}>
                <h4>Location</h4>
            </Col>
            <Col xs={8} md={4}>
              <Select
                className="select-location"
                options={this.state.locationOptions}
                onChange={this.handleLocationChanged.bind(this)}
                setValue={(a, b) => { console.log("select setValue", a, b); }}
                ref={(selectLocation) => {this.selectLocation = selectLocation; }}
              >
              </Select>
            </Col>
        </Row>
        </Grid>
        <DirtyDozenComponent
          ref={(dirtyDozen) => {this.dirtyDozen = dirtyDozen; }}
          >
        </DirtyDozenComponent>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
            </Col>
            <Col xs={6} md={4}>
              <FilterComponent />
            </Col>
          </Row>
        </Grid>
      </div>
      
    );
  }
}

export default LocationDetails;