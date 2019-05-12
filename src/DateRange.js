import React, { Component } from 'react';
import Select from 'react-select';

import './DateRange.css';

const defaultOptions = [
    { value: "2018-01-01", label: "Spring 2018" },
    { value: "2018-08-01", label: "Fall 2018" }
];

const SEASONS = {
    "SPRING": {
        label: "Spring",
        startDay: '03-01',
        endDay: '05-31',
    },
    "FALL": {
        label: "Fall",
        startDay: '09-01',
        endDay: '11-30',
    }
};

const SEASON_ORDER = [
    SEASONS.SPRING,
    SEASONS.FALL
];

export class DateRangeComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            startDate: defaultOptions[0],
            startDateOptions: defaultOptions,
            endDate: defaultOptions[1],
            endDateOptions: defaultOptions,
            location: {
                category: "",
                name: ""
            }
        };

        this.props.onDateRangeChanged(this.state.startDate.value, this.state.endDate.value);
    }

    componentDidMount()
    {
        //TODO: axiom request for valid date range
        this.setState({
        });
        this.props.onDateRangeChanged(this.state.startDate.value, this.state.endDate.value);
    }

    onMinDateChanged(selection)
    {
        console.log("onMinDateChanged" + selection.value);
        this.setState({
            startDate: selection
        });
        this.props.onDateRangeChanged(selection.value, this.state.endDate.value);
    }

    onMaxDateChanged(selection)
    {
        this.setState({
            endDate: selection
        });
        this.props.onDateRangeChanged(this.state.startDate.value, selection.value);
    }

    setLocation(location)
    {
        this.setState({
            location: {
                "category":  location.category,
                "name": location.name
            }
        });
        this.updateValidDateRange(location.category, location.name);
    }

    updateValidDateRange(locationCategory, locationName)
    {
        console.log("updatevaliddaterange query for: ", locationCategory, locationName);
        if (!locationCategory && !locationName){
            return;
        }

        let url = `http://coa-flask-app-dev.us-east-1.elasticbeanstalk.com`
        let tail = `/validdaterange`
            + `?locationCategory=` + locationCategory
            + `&locationName=` + locationName

        let responseHandler =
            function(results) {
                results.json().then(this.handleValidDateRangeResponse.bind(this));
            }.bind(this);

        fetch(url + tail,
            {"method": 'GET', "mode": "cors"}) 
        .then(responseHandler)
        .catch(
            function() {
                console.log("Failed to hit deployed service for dirty dozen api, trying to hit the api locally.");
                fetch(`http://127.0.0.1:5000` + tail, {"method": 'GET', "mode": "cors"})
                .then(responseHandler)
                .catch(function(){
                    console.log("Failed to execute query for valid date range.")
                });
            }
        );
    }

    getStartDateOption(season, year)
    {
        return {
            "label": season.label + ' ' + year.toString(),
            "value": year.toString() + '-' + season.startDay
        };
    }

    getEndDateOption(season, year)
    {
        let endYear = (season.label === 'Winter') ? year + 1 : year;
        return {
            "label": season.label + ' ' + year.toString(),
            "value": endYear.toString() + '-' + season.endDay
        };
    }

    handleValidDateRangeResponse(data)
    {
        console.log("validdaterange response", data.validDateRange.firstDate, data.validDateRange.lastDate);
        let firstDate = data.validDateRange.firstDate;
        let lastDate = data.validDateRange.lastDate;

        let seasonIdx = 0;
        let season = SEASON_ORDER[seasonIdx];
        let year = parseInt(firstDate.substr(0, 4), 10);
        let seasonDate = this.getStartDateOption(season, year).value;
        
        if (firstDate < seasonDate) {
            year--;
            season = SEASONS.WINTER;
        }
        else {
            let previousSeasonIdx = seasonIdx;
            let previousSeason = season;
            let previousYear = year;
            while (seasonDate < firstDate) {
                previousSeasonIdx = seasonIdx;
                previousSeason = season;
                previousYear = year;
                seasonIdx++;
                if (seasonIdx === SEASON_ORDER.length) {
                    seasonIdx = 0;
                    year++;
                }
                season = SEASON_ORDER[seasonIdx];
                seasonDate = this.getStartDateOption(season, year).value;
            }
            seasonIdx = previousSeasonIdx;
            season = previousSeason;
            year = previousYear;
        }

        let startDateOptions = [];
        let endDateOptions = [];
        let seasonEndDate = this.getEndDateOption(season, year).value;
        while (seasonEndDate < lastDate) {
            startDateOptions.push(this.getStartDateOption(season, year));
            endDateOptions.push(this.getEndDateOption(season, year));

            seasonIdx++;
            if (seasonIdx === SEASON_ORDER.length) {
                seasonIdx = 0;
                year++;
            }
            season = SEASON_ORDER[seasonIdx];
            seasonEndDate = this.getEndDateOption(season, year).value;
        }
        startDateOptions.push(this.getStartDateOption(season, year));
        endDateOptions.push(this.getEndDateOption(season, year));

        console.log("date options", startDateOptions, endDateOptions);
        let startDate = startDateOptions[0];
        let endDate = endDateOptions[endDateOptions.length - 1];
        this.setState({
            startDate: startDate,
            startDateOptions: startDateOptions,
            endDate: endDate,
            endDateOptions: endDateOptions
        });
        this.props.onDateRangeChanged(startDate.value, endDate.value);
    }

    render() {
      return (
        <div className="date-range">
            <span><h4>Date Range</h4></span>
            <span>
                <Select
                    bsStyle="default"
                    className="select"
                    value={this.state.startDate}
                    options={this.state.startDateOptions}
                    onChange={this.onMinDateChanged.bind(this)}
                    >
                </Select>
            </span>
            <span><h4> - </h4></span>
            <span>
                <Select
                    bsStyle="default"
                    className="select"
                    value={this.state.endDate}
                    options={this.state.endDateOptions}
                    onChange={this.onMaxDateChanged.bind(this)}
                    >
                </Select>
            </span>
        </div>
      );
    }
}