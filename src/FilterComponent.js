import React, { Component } from 'react';

import './FilterComponent.css';

import { FilterOptions } from './FilterOptions';

const itemSelections = [
    {value: "glass", text: "Glass"},
    {value: "plastic", text: "Plastic"},
    {value: "paper", text: "Paper"},
    {value: "metal", text: "Metal"}
];

const itemDefaultSelections = ["glass", "paper"];

const siteSelections = (()=>{
    let selections = [];
    for (let i = 0; i < 20; i++) {
        selections.push({
            value: "place" + i,
            text: "Place " + i
        });
    }
    return selections;
})();

const siteDefaultSelections = ["place2"];

export class FilterComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
        };
    }

    itemsChanged = (items) => {
        console.log(items);
    }

    sitesChanged = (sites) => {
        console.log(sites);
    }

    render() {
      return (
        <div className="FilterComponent">
          <div className="title"><h2>Settings</h2></div>
          <FilterOptions
            className="filterOptions"
            title="Items"
            dropdown={
                {options: ['three', 'two', 'one'],
                defaultOption: 'three'}
            }
            selections={itemSelections}
            defaultSelections={itemDefaultSelections}
            selectionsChanged={this.itemsChanged}
          />
          <FilterOptions
            className="filterOptions"
            title="Site"
            dropdown={
                {options: ['three', 'two', 'one'],
                defaultOption: 'three'}
            }
            selections={siteSelections}
            defaultSelections={siteDefaultSelections}
            selectionsChanged={this.sitesChanged}
          />
        </div>
      );

    }
}