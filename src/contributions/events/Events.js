import './Events.css';

import React, { useState, useEffect } from 'react';

import { getData } from "../../BackendAccessor.js";
import EventAdd from "./EventAdd";

import {
    FilteringState,
    IntegratedFiltering,
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap3';

const EVENT_COLUMNS = [
    { name: "county", title: "County" },
    { name: "town", title: "Town" },
    { name: "site", title: "Site" },
];

export default function Events() {

    const [year, setYear] = useState(new Date().getFullYear());
    const [season, setSeason] = useState(new Date().getMonth() > 5 ? "Fall" : "Spring");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        console.log(year, season);
        getData("events?year=" + year + "&season=" + season) 
        .then((results) => {
            console.log(results);
            results.json().then((response) => {
                setEvents([
                    {
                        "county": "County Example",
                        "town": "Town Example",
                        "site": "Site Example",
                    },
                    {
                        "county": "County Example 2",
                        "town": "Town Example 2",
                        "site": "Site Example 2",
                    },
                ]);
            });
        })
        .catch(() => {
            console.log("Failed to execute query for events");
        });
    }, [year, season]);

    return(
        <div>
            Year<br/>
            <input
                name="year"
                type="number"
                min="1900"
                max="9999"
                step="1"
                placeholder="Year"
                value={year}
                onChange={(event) => setYear(event.target.value)}
                required
            /><br/>
            Season<br/>
            <select
                value={season}
                onChange={(event) => setSeason(event.target.value)}>
                <option value="Spring">Spring</option>
                <option value="Fall">Fall</option>
            </select><br/>
            <EventAdd></EventAdd><br/><br/>
            <Grid
                rows={events}
                columns={EVENT_COLUMNS}
            >
                <FilteringState defaultFilters={[]} />
                <IntegratedFiltering />
                <SortingState
                    defaultSorting={[{ columnName: 'county', direction: 'asc'}]}
                />
                <IntegratedSorting />
                <Table />
                <TableHeaderRow showSortingControls />
                <TableFilterRow />
            </Grid>
        </div>
    );
}
  