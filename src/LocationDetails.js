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
        <Grid fluid>
        <Row>
          <Col xs={2}>
            <h4>Site Details</h4>
            </Col>
            <Col xs={10}>
              <Select
                className="select-location"
                defaultValue={defaultSiteOptions[0]}
                options={defaultGroupedOptions}
                onChange={this.handleLocationChanged.bind(this)}>
              </Select>
            </Col>
          </Row>
        <Col>
        </Col>
        </Grid>
        <DirtyDozenComponent
          ref={(dirtyDozen) => {this.dirtyDozen = dirtyDozen; }}
          >
        </DirtyDozenComponent>
      </div>
      
    );
  }
}

export default LocationDetails;
