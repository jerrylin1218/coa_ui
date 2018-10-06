import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'

import { DateRangeComponent } from './DateRange'

import './DirtyDozen.css';



const DEFAULT_DATA = {
    "Paper Clip": 2815,
    "Plastic Bag": 2210,
    "Pencil": 1536,
    "Plastic Cup": 1453,
    "Cigarette Butts": 1211,
    "Soda Cans": 1001,
    "Bottle Caps": 985,
    "Batteries": 580,
    "Paper": 495,
    "Glass Bottles": 382,
    "Screws": 64,
    "Clothing": 28
};

function transformDirtyDozenDataForBarChart(data)
{
    let barChartData = [];
    for (let key in data)
    {
        barChartData.push({"item": key, "count": data[key]});
    }
    return barChartData;
}

function transformDirtyDozenDataForPieChart(data)
{
    let pieChartData = [];
    for (let key in data)
    {
        pieChartData.push({"id": key, "value": data[key]});
    }
    return pieChartData;
}

function transformDirtyDozenDataForTable(data)
{
    let tableData = [];
    for (let key in data)
    {
        tableData.push((<tr key={key}>
            <td>{key}</td>
            <td>{key}</td>
            <td>{data[key]}</td>
            <td>{roundToOneDecimalPercentage(data[key])}</td>
        </tr>));
    }
    return tableData;
}

function roundToOneDecimalPercentage(value)
{
    const numberOfDecimals = 1;
    return Math.round(value * (10 * numberOfDecimals)) / (10 * numberOfDecimals);
}


export class DirtyDozenComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            location: {},
            tableItems: [],
            nivoBarChartData: [],
            nivoPieChartData: []
        };
    }

    componentDidMount()
    {
        this.setState({
            tableItems: transformDirtyDozenDataForTable(DEFAULT_DATA),
            nivoBarChartData: transformDirtyDozenDataForBarChart(DEFAULT_DATA),
            nivoPieChartData: transformDirtyDozenDataForPieChart(DEFAULT_DATA)
        });
    }

    handleDateRangeChanged(startDate, endDate)
    {
        console.log("handleDateRangeChanged", startDate, endDate);
        this.setState({
            "startDate": startDate,
            "endDate": endDate
        });this.queryDirtyDozen(this.state.location.category, this.state.location.name, startDate, endDate);
    }

    setLocation(location)
    {
        console.log("location", location);
        this.setState({
            "location": {
                "category": "site",
                "name": location
            }
        });
        this.queryDirtyDozen("site", location, this.state.startDate, this.state.endDate);
    }

    queryDirtyDozen(locationCategory, locationName, startDate, endDate)
    {
        if (locationCategory && locationName && startDate && endDate)
        {
            locationName = locationName.trim().replace(/ /g, "%20");
            let url = `http://coa-flask-app-dev.us-east-1.elasticbeanstalk.com/dirtydozen`
                + `?locationCategory=` + locationCategory
                + `&locationName=` + locationName
                + `&startDate=` + startDate
                + `&endDate=` + endDate
            console.log("url",  url);
            fetch(url,
                {"method": 'GET', "mode": "cors"}) 
            .then(
                function(results) {
                console.log("hello");
                results.json().then(
                    function(data) {
                        console.log(data);
                        this.setState({
                            tableItems: transformDirtyDozenDataForTable(data.items),
                            nivoBarChartData: transformDirtyDozenDataForBarChart(data.items),
                            nivoPieChartData: transformDirtyDozenDataForPieChart(data.items)
                        });
                    }.bind(this));
                }.bind(this)
            , function() { console.log("failed"); });
        }
        else
        {
            console.log("Not enough information to query for dirty dozen statistics.");
        }
    }

    render() {
      return (
        <Grid>
          <Row>
            <Col xs={4} md={4}>
                <DateRangeComponent
                    onDateRangeChanged={this.handleDateRangeChanged.bind(this)}
                />
            </Col>
            <Col xs={8} md={8}>
              <h3>Dirty Dozen</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={4} md={4}>
            <div className="nivo-pie">
            <ResponsivePie
                data={this.state.nivoPieChartData}
                margin={{
                    "top": 40,
                    "right": 80,
                    "bottom": 80,
                    "left": 80
                }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors="nivo"
                colorBy="id"
                borderWidth={1}
                borderColor="inherit:darker(0.2)"
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor="inherit"
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                defs={[
                    {
                        "id": "dots",
                        "type": "patternDots",
                        "background": "inherit",
                        "color": "rgba(255, 255, 255, 0.3)",
                        "size": 4,
                        "padding": 1,
                        "stagger": true
                    },
                    {
                        "id": "lines",
                        "type": "patternLines",
                        "background": "inherit",
                        "color": "rgba(255, 255, 255, 0.3)",
                        "rotation": -45,
                        "lineWidth": 6,
                        "spacing": 10
                    }
                ]}
                fill={[
                   
                ]}
                legends={[
                    {
                        "anchor": "bottom",
                        "direction": "row",
                        "translateY": 56,
                        "itemWidth": 100,
                        "itemHeight": 18,
                        "itemTextColor": "#999",
                        "symbolSize": 18,
                        "symbolShape": "circle",
                        "effects": [
                            {
                                "on": "hover",
                                "style": {
                                    "itemTextColor": "#000"
                                }
                            }
                        ]
                    }
                ]}
            />
            </div>
            </Col>
            <Col xsHidden md={4}>
            <div className="nivo-bar">
            <ResponsiveBar
                data={this.state.nivoBarChartData}
                height={260}
                keys={[
                    "count",
                ]}
                indexBy="item"
                margin={{
                    "top": 50,
                    "right": 130,
                    "bottom": 50,
                    "left": 60
                }}
                padding={0.3}
                colors="d320c"
                colorBy="id"
                defs={[
                    {
                        "id": "dots",
                        "type": "patternDots",
                        "background": "inherit",
                        "color": "#38bcb2",
                        "size": 4,
                        "padding": 1,
                        "stagger": true
                    },
                    {
                        "id": "lines",
                        "type": "patternLines",
                        "background": "inherit",
                        "color": "#eed312",
                        "rotation": -45,
                        "lineWidth": 6,
                        "spacing": 10
                    }
                ]}
                fill={[
                    {
                        "match": {
                            "id": "count"
                        },
                        "id": "lines"
                    }
                ]}
                borderColor="#ff8000"
                axisBottom={{
                    "orient": "bottom",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": "item",
                    "legendPosition": "middle",
                    "legendOffset": 36
                }}
                axisLeft={{
                    "orient": "left",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": "count",
                    "legendPosition": "middle",
                    "legendOffset": -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="inherit:darker(1.6)"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    // {
                    //     "dataFrom": "keys",
                    //     "anchor": "bottom-right",
                    //     "direction": "column",
                    //     "translateX": 120,
                    //     "itemWidth": 100,
                    //     "itemHeight": 20,
                    //     "itemsSpacing": 2,
                    //     "symbolSize": 20
                    // }
                ]}
                theme={{
                    "tooltip": {
                        "container": {
                            "fontSize": "13px"
                        }
                    },
                    "labels": {
                        "textColor": "#444"
                    }
                }}
                />
            </div>
            </Col>
            <Col xs={6} md={4}>
                <table border="1">
                <tbody>
                <tr>
                    <th>#</th>
                    <th>Debris Item</th>
                    <th>Count</th>
                    <th>Percentage Total</th>
                </tr>
                {this.state.tableItems}
                </tbody>
                </table>
            </Col>
          </Row>
        </Grid>
      );

    }
}