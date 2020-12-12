import './SiteSelector.css';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import { getData } from "../../BackendAccessor.js";

const sortByLabel = (lhs, rhs) => {
    const LHS = lhs.label.toUpperCase();
    const RHS = rhs.label.toUpperCase();
    return (LHS < RHS) ? -1 : ((LHS > RHS) ? 1 : 0);
};

export default function SiteSelector(props) {
    const [location, setLocation] = useState({"county": {}, "town": {}, "site": {}});
    const [countyOptions, setCountyOptions] = useState([]);
    const [townOptions, setTownOptions] = useState([]);
    const [siteOptions, setSiteOptions] = useState([]);
    const [allSites, setAllSites] = useState([]);
    
    const setCounty = (countySelection) => {
        console.log("setCounty", countySelection);
        setLocation({
            "county": countySelection,
            "town": "",
            "site": ""
        });
    };
    
    const setTown = (townSelection) => {
        console.log("townSelection", townSelection);
        if (townSelection) {
            const county = townSelection.value.split("|")[0];
            setLocation({
                "county": {value: county, label: county},
                "town": townSelection,
                "site": {}
            })
        }
        else {
            setLocation({
                "county": location.county,
                "town": {},
                "site": {}
            })
        }
    };

    const setSite = (siteSelection) => {
        console.log("siteSelection", siteSelection);
        if (siteSelection) {
            const siteSplit = siteSelection.value.split("|");
            const county = siteSplit[0];
            const town = siteSplit[1];
            const siteId = siteSplit[3];
            setLocation({
                "county": {value: county, label: county},
                "town": {value: town, label: town},
                "site": siteSelection,
                "siteId": siteId
            })
        }
        else {
            setLocation({
                "county": location.county,
                "town": location.town,
                "site": {}
            })
        }
    }

    const updateCountyOptions = () => {
        if (countyOptions.length === 0) {
            const countySet = new Set();
            allSites.forEach((site) => countySet.add(site.county));
            setCountyOptions(Array.from(countySet).sort().map(
                county => { return {"value": county, "label": county}; }));
        }
    };

    const updateLocationOptions = () => {
        updateCountyOptions();
        const townSet = new Set();
        const siteSet = new Set();
        allSites.forEach((site) => {
            if (!location.county?.label || site.county === location.county.label) {
                const townValue = site.county + "|" + site.town;
                townSet.add(townValue);
                if (!location.town?.label || site.town === location.town.label) {
                    siteSet.add(townValue + "|" + site.site_name + "|" + site.site_id);
                }
            }
        });
        let townSelections = Array.from(townSet).map(townValue => {
            return {"value": townValue, "label": townValue.split("|")[1]};
        }).sort(sortByLabel);
        setTownOptions(townSelections);

        let siteSelections = Array.from(siteSet).map(siteValue => {
            return {"value": siteValue, "label": siteValue.split("|")[2]};
        }).sort(sortByLabel);
        setSiteOptions(siteSelections);
    };

    useEffect(() => {
        console.log("in use effect");
        if (allSites.length === 0) {
            console.log("all sites empty");
            getData("sites")
            .then((results) => {
                results.json().then((response) => {
                    console.log("sites", response);
                    setAllSites(response.sites);
                });
            })
            .catch(() => {
                console.log("Failed to execute query for events");
            });
        }
        else {
            console.log("updating location options");
            updateLocationOptions();
        }
        props.updateSiteId(location.siteId);
    }, [location, allSites]);

    return(
        <div className="locationSelection">
            County*<Select
                bsStyle="default"
                className="select"
                isClearable
                value={location.county}
                options={countyOptions}
                onChange={(selection) => setCounty(selection)}>
            </Select>
            Town*<Select
                bsStyle="default"
                className="select"
                isClearable
                value={location.town}
                options={townOptions}
                onChange={(selection) => setTown(selection)}>
            </Select>
            Site*<Select
                bsStyle="default"
                className="select"
                isClearable
                value={location.site}
                options={siteOptions}
                onChange={(selection) => setSite(selection)}>
            </Select>
        </div>
    );
}
  