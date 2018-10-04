import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'

import { DateRangeComponent } from './DateRange'

import './DirtyDozen.css';

const defaultData = [
    {
        itemName: "cigarette",
        itemId: "1",
        itemCategoryName: "cat1",
        itemCategoryId: "cat1",
        itemMaterialName: "mat1",
        itemMaterialId: "mat1",
        count: 3,
        percentTotal: 20
    },
    {
        itemName: "plastic cup",
        itemId: "2",
        itemCategoryName: "cat2",
        itemCategoryId: "cat2",
        itemMaterialName: "mat2",
        itemMaterialId: "mat2",
        count: 2,
        percentTotal: 40
    }
    ];
    
    const barChartData = [
        {
            "name": "Plastic Bags",
            "count": 125
        },
        {
            "name": "Cigarette Filters",
            "count": 83
        },
        {
            "name": "Plastic Caps / Lids",
            "count": 76
        },
        {
            "name": "Glass Shards",
            "count": 62
        },
        {
            "name": "Plastic Utensils",
            "count": 59
        },
        {
            "name": "Paper Bags",
            "count": 35
        },
        {
            "name": "Straws / Stirrers",
            "count": 30
        },
        {
            "name": "Styrofoam Cups",
            "count": 19
        },
        {
            "name": "Candy Wrappers",
            "count": 12
        },
        {
            "name": "Metal Pieces",
            "count": 5
        },
        {
            "name": "Lumber Pieces",
            "count": 3
        },
        {
            "name": "Umbrellas",
            "count": 1
        },
    ];
    
    function getHtmlRowFromData(data)
    {
        return (<tr key={data.number}>
                <td>{data.number}</td>
                <td>{data.name}</td>
                <td>{data.count}</td>
                <td>{data.percentage}</td>
            </tr>);
    }
    
    function transformDirtyDozenDataForBarChart(data)
    {
        return data.map((data)=>{ return { "item": data.itemName, "count":data.count, "countColor": data.color }; });
    }

    function transformDirtyDozenDataForPieChart(data)
    {
        return data.map((data)=>{ return { "id": data.itemName, "value": data.count }; });
    }
    
    function transformDirtyDozenDataForTable(data)
    {
        return data.map((data) => { return (<tr key={data.itemId}>
            <td>{data.itemId}</td>
            <td>{data.itemName}</td>
            <td>{data.count}</td>
            <td>{roundToOneDecimalPercentage(data.percentTotal)}</td>
        </tr>) });
    }
    
    function roundToOneDecimalPercentage(value)
    {
        const numberOfDecimals = 1;
        return Math.round(value * (10 * numberOfDecimals)) / (10 * numberOfDecimals);
    }
    
    const tableStuff = (()=>{
        let totalCount = barChartData.reduce(((accumulator, currentVal)=>accumulator + currentVal.count), 0) * 2.45;
        let html = [];
        for (let i = 0; i < barChartData.length; ++i)
        {
            let data = barChartData[i];
            data.number = i+1;
            data.percentage = roundToOneDecimalPercentage(barChartData[i].count/totalCount) + "%";
            html.push(getHtmlRowFromData(data));
        }
        return html;
    })();


export class DirtyDozenComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            tableItems: [],
            barChartItems: [],
            nivoBarChartData: []
        };
    }

    componentDidMount()
    {
        //TODO: axiom request for stuff
        this.setState({
            tableItems: transformDirtyDozenDataForTable(defaultData),
            barChartItems: barChartData,
            nivoBarChartData: transformDirtyDozenDataForBarChart(defaultData),
            nivoPieChartData: transformDirtyDozenDataForPieChart(defaultData)
        });
    }

    handleDateRangeChanged(startDate, endDate)
    {
        console.log("handleDateRangeChanged");
    }

    setLocation(location)
    {
        console.log("location", location);
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
                    {
                        "dataFrom": "keys",
                        "anchor": "bottom-right",
                        "direction": "column",
                        "translateX": 120,
                        "itemWidth": 100,
                        "itemHeight": 20,
                        "itemsSpacing": 2,
                        "symbolSize": 20
                    }
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