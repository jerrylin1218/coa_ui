import React, { Component } from 'react';
import { Table, Grid} from 'react-bootstrap';
import { ResponsiveBar } from '@nivo/bar'

import './DirtyDozen.css';

import { getData } from "./BackendAccessor.js";

const DEFAULT_DATA = [
    {
        "itemName": "Paper Clip",
        "itemCount": 2815,
        "percentage": 12.5
    },
    {
        "itemName": "Plastic Bag",
        "itemCount": 2210,
        "percentage": 10.1
    },
    {
        "itemName": "Cigarette Butts",
        "itemCount": 20,
        "percentage": 2.3
    }
];

function transformDirtyDozenDataForBarChart(data)
{
    let barChartData = [];
    for (let i = 0; i < data.length; ++i)
    {
        let item = data[i];
        barChartData.push({"item": item.itemName, "count": item.count});
    }
    return barChartData;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function transformDirtyDozenDataForTable(data)
{
    let tableData = [];
    for (let i = 0; i < data.length; ++i)
    {
        let item = data[i];
        let count = item.count ? numberWithCommas(item.count) : 0;
        tableData.push((
        <tr key={i}>
            <td>{i + 1}</td>
            <td>{item.itemName}</td>
            <td>{item.materialName}</td>
            <td>{count}</td>
            <td>{item.percentage.toFixed(1)}</td>
        </tr>));
    }
    return tableData;
}

export class DirtyDozenComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            location: {},  // {category: "", name: ""}
            startDate: "", // ISO date string (YYYY-MM-DD)
            endDate: "",   // ISO date string (YYYY-MM-DD)
            tableItems: [],
            nivoBarChartData: []
        };
    }

    componentDidMount()
    {
        this.setState({
            tableItems: transformDirtyDozenDataForTable(DEFAULT_DATA),
            nivoBarChartData: transformDirtyDozenDataForBarChart(DEFAULT_DATA)
        });
    }

    setDateRange(startDate, endDate)
    {
        console.log("DirtyDozen::setDateRange", startDate, endDate);
        this.setState({
            "startDate": startDate,
            "endDate": endDate
        });
        this.queryDirtyDozen(this.state.location.category, this.state.location.name, startDate, endDate);
    }

    setLocation(location)
    {
        console.log("DirtyDozen::setLocation", location);
        this.setState({
            "location": {
                "category": location.category,
                "name": location.name
            }
        });
        this.queryDirtyDozen(location.category, location.name, this.state.startDate, this.state.endDate);
    }

    queryDirtyDozen(locationCategory, locationName, startDate, endDate)
    {
        console.log("DirtyDozen::queryDirtyDozen", locationCategory, locationName, startDate, endDate);
        if (locationCategory && locationName && startDate && endDate)
        {
            locationName = locationName.trim().replace(/ /g, "%20");
            let tail = `dirtydozen`
                + `?locationCategory=` + locationCategory
                + `&locationName=` + locationName
                + `&startDate=` + startDate
                + `&endDate=` + endDate

            getData(tail) 
            .then((results) => {
                results.json().then(this.handleDirtyDozenData.bind(this))
            })
            .catch(() => {
                console.log("Failed to execute query for dirty dozen");
            });
        }
        else
        {
            console.log("Not enough information to query for dirty dozen statistics.");
        }
    }

    handleDirtyDozenData(data)
    {
        console.log(data);
        let dirtyDozen = data.dirtydozen.map((item) => {
            item.itemName = item.itemName ? item.itemName : item.categoryName;
            return item;
        });
        this.setState({
            tableItems: transformDirtyDozenDataForTable(dirtyDozen),
            nivoBarChartData: transformDirtyDozenDataForBarChart(dirtyDozen)
        });
    }

    render() {
        return (
            <Grid fluid>
                <div className="nivo-bar">
                <ResponsiveBar
                    data={this.state.nivoBarChartData}
                    height={260}
                    keys={[
                        "count",
                    ]}
                    indexBy="item"
                    margin={{
                        "top": 20,
                        "right": 60,
                        "bottom": 100,
                        "left": 60
                    }}
                    layout="vertical"
                    padding={0.3}
                    colors="#a6cee3"
                    colorBy="id"
                    defs={[]}
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
                        "tickRotation": 45,
                        "legend": "Items",
                        "legendPosition": "middle",
                        "legendOffset": 85
                    }}
                    axisLeft={{
                        "orient": "left",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legend": "Count",
                        "legendPosition": "middle",
                        "legendOffset": -45
                    }}
                    enableGridX={false}
                    enableGridY={false}
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
                <Table condensed responsive bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Debris Item</th>
                            <th>Material</th>
                            <th>Count</th>
                            <th>% Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableItems}
                    </tbody>
                </Table>
            </Grid>
        );
    }
}
