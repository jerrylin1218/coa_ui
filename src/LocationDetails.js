import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

import { FilterComponent } from './FilterComponent';
import { DirtyDozenComponent } from './DirtyDozen';

import "./LocationDetails.css"

const defaultCountyOptions = [
    {
        label: "County 1",
        value: "county1",
    },
    {
        label: "County 2",
        value: "county2"
    }
]

const defaultSiteOptions = [
    {
        label: "Site 1",
        value: "site1"
    },
    {
        label: "Site 2",
        value: "site2"
    }
]

const defaultGroupedOptions = [
    {
        label: "Counties",
        options: defaultCountyOptions
    },
    {
        label: "Sites",
        options: defaultSiteOptions
    }
]

class LocationDetails extends Component {
    
  constructor(props)
  {
    super(props);
    this.state = {
      siteId: 214
    };
  }

  componentDidMount()
  {
    //TODO: axiom request for stuff
    this.setState({
    });
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
