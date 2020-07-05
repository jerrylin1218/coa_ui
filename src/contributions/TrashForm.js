import './TrashForm.css';

import React, { Component } from 'react';

export default class TrashForm extends Component {

    change = e => {
        this.setState({
            [e.target.id]: {
                "value": e.target.value,
                "text": e.target.value ? e.target.selectedOptions[0].text : ""
            }
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
        this.state = {
            "material": {
                "value": null
            },
            "categories": [<option value="Plastic Pieces"/>, <option value="Metal Pieces"/>],
            "items": [<option value="Plastic Straws"/>, <option value="Plastic Caps"/>]
        };
    };

    render() {
        return(
            <div>
                Please indicate the trash material<br/>
                <select id="material" onChange={e => this.change(e)} value={this.state.material.value}>
                    <option hidden disabled selected value> -- Select a material -- </option>
                    <option value="plastic">Plastic</option>
                    <option value="metal">Metal</option>
                    <option value="paper">Paper</option>
                </select><br/>
                Please indicate the trash category<br/>
                <input list="categories" id="category"/>
                <datalist id="categories">
                    {this.state.categories}
                </datalist><br/>
                Please indicate the trash item<br/>
                <input list="items" id="item"/>
                <datalist id="items">
                    {this.state.items}
                </datalist><br/>
                Quantity<br/>
                <input
                    name="numTrashItems"
                    type="number"
                    placeholder="Quantity"
                    required
                /><br/>
                <button onClick={e => this.onSubmit(e)}>Add</button>
            </div>
        );
    }
}
  