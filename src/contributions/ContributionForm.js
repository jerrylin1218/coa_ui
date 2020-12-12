import './ContributionForm.css';

import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import Events from "./events/Events";

export default class ContributionForm extends Component {

    onLogout(e)
    {
        this.props.onLogout();
    };

    constructor(props)
    {
        super(props);
        console.log(props);
        this.state = {
            "name": this.props.name,
            "selectedTab": "events"
        };
    };

    render() {
        return(
            <div>
            <h2>Please enter your contribution!</h2>
            <input
                name="name"
                type="text"
                value={this.state.name}
                disabled
            />
            <button
                onClick={e => this.onLogout(e)}>
                Logout
            </button>
            <br/><br/>
            <Tabs
                id="edit-details-tab"
                activeKey={this.selectedTab}
                onSelect={(k) => this.setState({"selectedTab": k})}>
                <Tab eventKey="events" title="Cleanup Events">
                    <Events
                    />
                </Tab>
                <Tab eventKey="items" title="Items">
                    <p>Items</p>
                </Tab>
                <Tab eventKey="sites" title="Sites">
                    <p>Sites</p>
                </Tab>
            </Tabs>
            </div>
        );
    }
}
  