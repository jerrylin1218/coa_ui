import './ContributionForm.css';

import React, { Component } from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

import EventDetailsForm from "./EventDetailsForm";
import TrashForm from "./TrashForm";
import { thisTypeAnnotation } from '@babel/types';

export default class ContributionForm extends Component {

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onLogout(e)
    {
        this.props.onLogout();
    };

    onSubmit(e)
    {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    constructor(props)
    {
        super(props);
        console.log(props);
        this.state = {
            "name": this.props.name,
            "eventCode": this.props.eventCode
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
            <input
                name="eventCode"
                type="text"
                value={this.state.eventCode}
                disabled
            />
            <button
                onClick={e => this.onLogout(e)}>
                Logout
            </button>
            <br/><br/>
            <Grid fluid>
                <Row>
                    <Col md={6}>
                        <Panel>
                            <Panel.Heading>
                                <b>1. Team Information</b>
                            </Panel.Heading>
                            <Panel.Body>
                                <EventDetailsForm
                                />
                            </Panel.Body>
                        </Panel>
                        <Panel>
                            <Panel.Heading>
                                <b>2. Trash Info</b>
                            </Panel.Heading>
                            <Panel.Body>
                                <TrashForm
                                />
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col md={6}>
                        <h3>Your Impact</h3>
                    </Col>
                </Row>
            </Grid>
            <button onClick={e => this.onSubmit(e)}>Submit</button>
            <button onClick={e => this.onReset(e)}>Reset</button>
            </div>
        );
    }
}
  