import './TrashForm.css';

import React, { Component } from 'react';

export default class TrashForm extends Component {

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
                Please indicate the trash category<br/>
                <select>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select><br/>
                Please indicate the trash item<br/>
                <select>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select><br/>
                Quantity<br/>
                <input
                    name="numTrashItems"
                    type="number"
                    placeholder="Quantity"
                    required
                /><br/>
                Please identify the brand name if possible<br/>
                <input
                    name="itemBrandName"
                    type="text"
                    placeholder="Brand (Optional)"
                /><br/>
                <button onClick={e => this.onSubmit(e)}>Add</button>
            </div>
        );
    }
}
  