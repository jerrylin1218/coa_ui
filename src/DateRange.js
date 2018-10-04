import React, { Component } from 'react';
import Select from 'react-select';


import './DateRange.css';

const defaultOptions = [
    { value: "2018-01-01", label: "Spring 2018" },
    { value: "2018-08-01", label: "Fall 2018" }
];

export class DateRangeComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            startDate: "2018-01-01",
            endDate: "2018-12-31",
            selections: []
        };
    }

    componentDidMount()
    {
        //TODO: axiom request for stuff
        this.setState({
            selections: []
        });
    }

    onMinDateChanged(selection)
    {
        console.log("onMinDateChanged" + selection.value);
        this.setState({
            startDate: selection.value
        });
        this.props.onDateRangeChanged(this.state.startDate);
    }

    onMaxDateChanged(selection)
    {
        this.setState({
            endDate: selection.value
        });
        this.props.onDateRangeChanged(this.state.endDate);
    }

    render() {
      return (
        <div className="date-range">
        <h4>Select Date Range:</h4>
        <Select
          className="select-min"
          options={defaultOptions}
          onChange={this.onMinDateChanged.bind(this)}
          >
        </Select>
        <Select
          className="select-max"
          options={defaultOptions}
          onChange={this.onMaxDateChanged.bind(this)}
          >
        </Select>
        </div>
      );

    }
}