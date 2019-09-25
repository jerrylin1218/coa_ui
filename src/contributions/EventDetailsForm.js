import './EventDetailsForm.css';

import React, { Component } from 'react';

export default class EventDetailsForm extends Component {

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit(e)
    {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    constructor(props)
    {
        super(props);
    };

    render() {
        return(
            <div>
                Your volunteer site<br/>
                <select>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select><br/>
                Your volunteer date<br/>
                <input
                    name="date"
                    type="date"
                /><br/>
                Your team leader<br/>
                <input
                    name="teamLeaderName"
                    type="text"
                /><br/>
                Number of people in the team<br/>
                <input
                    name="numTeamMembers"
                    type="number"
                /><br/>
                Number of trash bags collected<br/>
                <input
                    name="numTrashBags"
                    type="number"
                /><br/>
                Trash Weight (lbs)<br/>
                <input
                    name="trashWeightLbs"
                    type="number"
                /><br/>
                Walking Distance (miles)<br/>
                <input
                    name="walkingDistanceMiles"
                    type="number"
                /><br/>
            </div>
        );
    }
}
  