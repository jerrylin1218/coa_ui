import React, { Component } from 'react';

import { Panel, Grid, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

import { FilterComponent } from './FilterComponent';
import { DirtyDozenComponent } from './DirtyDozen';
import { DebrisBreakdownComponent } from './DebrisBreakdown';
import { HistoricalTrendsComponent } from './HistoricalTrendsChart';

import "./LocationDetails.css";
import { DateRangeComponent } from './DateRange';

import { getData } from "./BackendAccessor.js";

const COUNTY_STR = "county";
const TOWN_STR = "town";
const SITE_STR = "site";

function transformLocationsOptions(data) {
    let transformedData = data.map(transformForOption);
    console.debug("transformLocationsOptions", transformedData);
    return transformedData;
}

function transformForOption(data) {
    if (data === undefined) return undefined;
    return {label: data, value: data};
}
class LocationDetails extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            allLocations: {},        // All locations and categories to be retrieved from database
            currentCounty: undefined,
            currentTown: undefined,
            currentSite: undefined,
            dirtyDozen: undefined,          // Component for 12 most common debris items
            debrisBreakdown: undefined      // Component for hierarchical breakdown of debris items
        };
    }

    componentDidMount()
    {
        console.log("componentDidMount");

        const url = "locationsHierarchy";
        getData(url) 
            .then((results) => {
                console.log("locationsHierarchy results=", results);
                results.json().then(this.updateLocations.bind(this));
            }).catch(() => {
                console.log("ERROR - Failed to execute query to retrieve locations.");
            });
    }

    updateLocations(data)
    {
        console.log("LocationDetails::updateLocations", data);
        let allLocations = data.locationsHierarchy;

        console.log("LocationDetails::allLocations", allLocations);

        let defaultCounty = Object.keys(allLocations)[0];
        
        this.setState({
            allLocations: allLocations,
            currentCounty: defaultCounty,
        });
        
        console.log("this.state.allLocation", this.state.allLocations);

        this.setLocation(COUNTY_STR, defaultCounty);
        this.setDateRange(this.state.startDate, this.state.endDate);
    }
    
    handleCountyChanged(selection, action)
    {
        console.log("LocationDetails::handleCountyChanged", selection, action);
        this.setState({
            currentCounty: selection.value,
            currentTown: undefined,
            currentSite: undefined
        });
        this.setLocation(COUNTY_STR, selection.value);
    }

    handleTownChanged(selection, action)
    {
       console.log("LocationDetails::handleTownChanged", selection, action);
       this.setState({
            currentTown: selection.value,
            currentSite: undefined
        });

        this.setLocation(TOWN_STR, selection.value);
    }

    handleSiteChanged(selection, action)
    {
       console.log("LocationDetails::handleSiteChanged", selection, action);
       this.setState({
            currentSite: selection.value
        });

        this.setLocation(SITE_STR, selection.value);
    }

    handleDateRangeChanged(startDate, endDate)
    {
        console.log("LocationDetails::handleDateRangeChanged", startDate, endDate);
        this.setState({
            "startDate": startDate,
            "endDate": endDate
        });
        this.setDateRange(startDate, endDate);
    }

    setLocation(locationCategory, location)
    {
        let value = {
            "category": locationCategory,
            "name": location
        };
        this.dateRangeComponent.setLocation(value);
        this.debrisBreakdown.setLocation(value);
        this.dirtyDozen.setLocation(value);
    }

    setDateRange(startDate, endDate)
    {
        if (this.debrisBreakdown) {
            this.debrisBreakdown.setDateRange(startDate, endDate);
        }
        if (this.dirtyDozen) {
            this.dirtyDozen.setDateRange(startDate, endDate);
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
                                className="select-county"
                                options={transformLocationsOptions(Object.keys(this.state.allLocations))}
                                value={transformForOption(this.state.currentCounty)}
                                onChange={this.handleCountyChanged.bind(this)}
                                ref={(selectCounty) => { this.selectCounty = selectCounty; }}
                                placeholder={"Select County"}
                            >
                            </Select>
                        </Col>
                        <Col md={2}>
                            <Select
                                className="select-town"
                                options={this.state.currentCounty === undefined ? undefined : transformLocationsOptions(Object.keys(this.state.allLocations[this.state.currentCounty]))}
                                value={transformForOption(this.state.currentTown)}
                                onChange={this.handleTownChanged.bind(this)}
                                ref={(selectLocationCategory) => { this.selectLocationCategory = selectLocationCategory; }}
                                placeholder={"Select Town"}
                            >
                            </Select>
                        </Col>
                        <Col md={6}>
                            <Select
                                className="select-site"
                                options={this.state.currentTown === undefined ? undefined : transformLocationsOptions(this.state.allLocations[this.state.currentCounty][this.state.currentTown])}
                                value={transformForOption(this.state.currentSite)}
                                onChange={this.handleSiteChanged.bind(this)}
                                ref={(selectLocation) => { this.selectLocation = selectLocation; }}
                                placeholder={"Select Site"}
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
                                    onDateRangeChanged={this.handleDateRangeChanged.bind(this)}
                                    ref={(dateRangeComponent) => { this.dateRangeComponent = dateRangeComponent; }}
                                    >
                                </DateRangeComponent>
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
