import React, { Component } from 'react';

import { Panel, Grid, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

import { FilterComponent } from './FilterComponent';
import { DirtyDozenComponent } from './DirtyDozen';
import { DebrisBreakdownComponent } from './DebrisBreakdown';
import { HistoricalTrendsComponent } from './HistoricalTrendsChart';

import "./LocationDetails.css"
import { DateRangeComponent } from './DateRange';

const transformSiteNamesToSelectOptions =
    (data) => { return data.map((name)=>{ return {label: name, value: name}; }); };

class LocationDetails extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            allLocations: undefined,        // All locations and categories to be retrieved from database
            location: undefined,            // Selected location
            locationCategory: undefined,    // Selected location category
            locationOptions: [{
                label: "Sites",
                options: []
            }],
            locationCategories: [{
                label: "Sites",
                value: "Sites"
            }],
            dirtyDozen: undefined,          // Component for 12 most common debris items
            debrisBreakdown: undefined      // Component for hierarchical breakdown of debris items
        };
    }

    componentDidMount()
    {
        fetch(`http://coa-flask-app-dev.us-east-1.elasticbeanstalk.com/locations`,
                {"method": 'GET', "mode": "cors"}) 
            .then(
                function(results) {
                    console.log("hello");
                    results.json().then(this.updateLocations.bind(this));
                }.bind(this)
                , function() { console.log("Failed to hit back-end service."); });
    }

    updateLocations(data)
    {
        console.log("LocationDetails::updateLocations", data);
        data = data.locations;
        let allLocations = data.reduce((obj, curr)=>{
            obj[curr.locationCategory] = curr.locationNames;
            return obj;
        }, {});
        let locationCategories = data.map((locationObj)=>{
            return { "label": locationObj.locationLabel, "value": locationObj.locationCategory };
        });
        let siteLocationCategory = data.reduce((obj, curr)=>{
            if (curr.locationCategory === "site") {
                obj.label = curr.locationLabel;
                obj.value = curr.locationCategory;
            }
            return obj;
        }, {});
        let siteLocationOptions = transformSiteNamesToSelectOptions(allLocations["site"]);
        this.setState({
            allLocations: allLocations,
            location: siteLocationOptions[2],   // Defaulting to 3rd option in array: 16th Ave Beach.
            locationOptions: siteLocationOptions,
            locationCategory: siteLocationCategory,
            locationCategories: locationCategories
        });
        
        this.dirtyDozen.setLocation(this.state.location.value);
        this.debrisBreakdown.setLocation(this.state.location.value);
        this.dirtyDozen.setDateRange(this.state.startDate, this.state.endDate);
        this.debrisBreakdown.setDateRange(this.state.startDate, this.state.endDate);
    }

    handleLocationCategoryChanged(selection, action)
    {
        console.log("LocationDetails::handleLocationCategoryChanged", selection, action);
        let locationOptions = transformSiteNamesToSelectOptions(this.state.allLocations[selection.value]);
        this.setState({
            locationCategory: selection,
            location: locationOptions[0],
            locationOptions: locationOptions
        });
        this.dirtyDozen.setLocation(this.state.location.value);
        this.debrisBreakdown.setLocation(this.state.location.value);
    }

    handleLocationChanged(selection, action)
    {
        console.log("LocationDetails::handleLocationChanged", selection, action);
        this.setState({
            location: selection
        });
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
    }

    render() {
        return (
            <div>
            <Panel>
                <Panel.Body>
                <Grid fluid>
                    <Row>
                        <Col md={2}>
                            <h3 className="locDetailsHeading">Location Details</h3>
                        </Col>
                        <Col md={2}>
                            <Select
                                className="select-location-category"
                                options={this.state.locationCategories}
                                value={this.state.locationCategory}
                                onChange={this.handleLocationCategoryChanged.bind(this)}
                                ref={(selectLocationCategory) => { this.selectLocationCategory = selectLocationCategory; }}
                                placeholder={"Select category..."}
                            >
                            </Select>
                        </Col>
                        <Col md={8}>
                            <Select
                                className="select-location"
                                options={this.state.locationOptions}
                                value={this.state.location}
                                onChange={this.handleLocationChanged.bind(this)}
                                ref={(selectLocation) => { this.selectLocation = selectLocation; }}
                                placeholder={"Select location..."}
                                >
                            </Select>
                        </Col>
                    </Row>
                </Grid>
                </Panel.Body>
            </Panel>
            <Panel>
                <Panel.Heading>Debris Breakdown</Panel.Heading>
                <Panel.Body>
                    <Grid fluid>
                        <Row>
                        <Panel>
                            <Panel.Body>
                            <Col md={12}>
                                <DateRangeComponent
                                    onDateRangeChanged={this.handleDateRangeChanged.bind(this)}/>
                            </Col>
                            </Panel.Body>
                        </Panel>
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
                <Panel.Heading>Historical View</Panel.Heading>
                <Panel.Body>
                    <Grid fluid>
                        <Row>
                            <Col md={9}>
                                <HistoricalTrendsComponent/>
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
