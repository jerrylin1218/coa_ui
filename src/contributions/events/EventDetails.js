import './EventDetails.css';
import React, { useEffect, useState } from 'react';

export default function EventDetails(props) {
    const [numVolunteers, setNumVolunteers] = useState("");
    const [numTrashBags, setNumTrashBags] = useState("");
    const [trashWeight, setTrashWeight] = useState("");
    const [walkingDistance, setWalkingDistance] = useState("");

    const getValidInt = (value) => {
        const parsedValue = parseInt(value, 10);
        if (parsedValue === undefined || isNaN(parsedValue)) {
            return null;
        }
        return parsedValue;
    }

    const getValidFloat = (value) => {
        const parsedValue = parseFloat(value);
        if (parsedValue === undefined || isNaN(parsedValue)) {
            return null;
        }
        return parsedValue;
    }

    const updateNumVolunteers = (e) => {
        console.log(numVolunteers, e.target.validity.valid, e.target.value);
        if (e.target.validity.valid || e.target.value === '') {
            setNumVolunteers(e.target.value);
            props.setNumVolunteers(getValidInt(e.target.value));
        }
    };

    const updateNumTrashBags = (e) => {
        if (e.target.validity.valid || e.target.value === '') {
            setNumTrashBags(e.target.value);
            props.setNumTrashBags(getValidInt(e.target.value));
        }
    };

    const updateTrashWeight = (e) => {
        console.log(trashWeight, e.target.validity.valid, e.target.value);
        if (e.target.validity.valid || e.target.value === '') {
            setTrashWeight(e.target.value);
            props.setTrashWeight(getValidFloat(e.target.value));
        }
    };
    
    const updateWalkingDistance = (e) => {
        console.log(trashWeight, e.target.validity.valid, e.target.value);
        if (e.target.validity.valid || e.target.value === '') {
            setWalkingDistance(e.target.value);
            props.setWalkingDistance(getValidFloat(e.target.value));
        }
    };

    const valueToInputString = (value) => {
        return value === undefined || value === null ? "" : value;
    };

    useEffect(() => {
        setNumVolunteers(valueToInputString(props.event?.volunteer_cnt));
        setNumTrashBags(valueToInputString(props.event?.trashbag_cnt));
        setTrashWeight(valueToInputString(props.event?.trash_weight));
        setWalkingDistance(valueToInputString(props.event?.walking_distance));

        props.setNumVolunteers(props.event?.volunteer_cnt);
        props.setNumTrashBags(props.event?.trashbag_cnt);
        props.setTrashWeight(props.event?.trash_weight);
        props.setWalkingDistance(props.event?.walking_distance);
    }, [props.event]);

    return(
        <div>
            Volunteers<br/>
            <input
                name="numVolunteers"
                type="tel"
                pattern="[1-9]\d*" // only positive integers
                placeholder="Number of Volunteers"
                value={numVolunteers}
                onChange={updateNumVolunteers}
            /><br/>
            Trash Bags<br/>
            <input
                name="numTrashBags"
                type="tel"
                pattern="[1-9]\d*" // only positive integers
                placeholder="Number of Trash Bags"
                value={numTrashBags}
                onChange={updateNumTrashBags}
            /><br/>
            Trash Weight (lbs)<br/>
            <input
                name="trashWeight"
                type="tel"
                pattern="[0-9]\d*\.?\d*$" // only postiive numbers
                placeholder="Trash Weight (lbs)"
                value={trashWeight}
                onChange={updateTrashWeight}
            /><br/>
            Walking Distance (mi)<br/>
            <input
                name="walkingDistance"
                type="tel"
                pattern="[0-9]\d*\.?\d*$" // only postiive numbers
                placeholder="Walking Distance (mi)"
                value={walkingDistance}
                onChange={updateWalkingDistance}
            />
        </div>
    );
}
  