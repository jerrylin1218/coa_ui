import React, { Component } from 'react';

import { Panel, Grid, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

import { FilterComponent } from './FilterComponent';
import { DirtyDozenComponent } from './DirtyDozen';
import { DebrisBreakdownComponent } from './DebrisBreakdown';
import { LineChartComponent } from './LineChart';

import "./LocationDetails.css"
import { DateRangeComponent } from './DateRange';

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
      }],
      locationTypes: [{
        label: "Sites",
        value: "Sites"
      }],
      dirtyDozen: undefined,      // Component for 12 most common debris items
      debrisBreakdown: undefined  // Component for hierarchical breakdown of debris items
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
    console.log("LocationDetails::updateLocationOptions", data);
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
        console.log("LocationDetails::handleLocationChanged", selection, action);
        this.dirtyDozen.setLocation(selection.value);
        this.debrisBreakdown.setLocation(selection.value);
    }

    handleDateRangeChanged(startDate, endDate)
    {
        console.log("LocationDetails::handleDateRangeChanged", startDate, endDate);
        this.setState({
            "startDate": startDate,
            "endDate": endDate
        });
        if (this.dirtyDozen) {
            this.dirtyDozen.setDateRange(startDate, endDate);
        }
        if (this.debrisBreakdown) {
            this.debrisBreakdown.setDateRange(startDate, endDate);
        }
        //this.queryDirtyDozen(this.state.location.category, this.state.location.name, startDate, endDate);
    }

    render() {
    return (
        <div>
            <Grid fluid>
                <span>
                    <h3 className="locDetailsHeading">Location Details </h3>
                </span>
                <span>
                    <Select
                        bsStyle="default"
                        className="select-location-type"
                        options={this.state.locationTypes}
                        placeholder={"Select location type..."}
                        defaultValue={{label: "Sites", value: "Sites"}}
                        >
                    </Select>
                </span>
                <span>
                    <Select
                        bsStyle="default"
                        className="select-location"
                        options={this.state.locationOptions}
                        onChange={this.handleLocationChanged.bind(this)}
                        ref={(selectLocation) => { this.selectLocation = selectLocation; }}
                        placeholder={"Select location..."}
                        >
                    </Select>
                </span>
            </Grid>

            <Panel>
                <Panel.Heading>Debris Breakdown</Panel.Heading>
                <Panel.Body>
                    <Grid fluid>
                        <Row>
                            <Col md={12}>
                                <DateRangeComponent
                                    onDateRangeChanged={this.handleDateRangeChanged.bind(this)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} >
                                <Panel>
                                    <Panel.Heading>Hierarchy</Panel.Heading>
                                    <Panel.Body>
                                        <DebrisBreakdownComponent
                                          ref={(debrisBreakdown) => {this.debrisBreakdown = debrisBreakdown; }}/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col md={6}>
                                <Panel>
                                    <Panel.Heading>Dirty Dozen</Panel.Heading>
                                    <Panel.Body>
                                        <DirtyDozenComponent
                                            ref={(dirtyDozen) => {this.dirtyDozen = dirtyDozen; }}/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                         </Row>
                     </Grid>
                  </Panel.Body>
              </Panel>
              <Panel>
                  <Panel.Heading>Historical Trends</Panel.Heading>
                  <Panel.Body>
                      <Grid fluid>
                          <Row>
                              <Col md={9}>
                                  <LineChartComponent/>
                              </Col>
                              <Col md={3}>
                                  <FilterComponent/>
                              </Col>
                          </Row>
                      </Grid>
                  </Panel.Body>
              </Panel>
          </div>
    );
  }
}

export default LocationDetails;
