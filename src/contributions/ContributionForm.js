import './ContributionForm.css';

import React, { Component } from 'react';
import { Panel, Grid, Row, Col, Table } from 'react-bootstrap';

import EventDetailsForm from "./EventDetailsForm";
import TrashForm from "./TrashForm";

function transformTrashInfoToTableRow(trash, index)
{
    return <tr key={index}>
        <td>{index + 1}</td>
        <td>{trash.item}</td>
        <td>{trash.material.text}</td>
        <td>{trash.category}</td>
        <td>{trash.count}</td>
    </tr>
}

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
    
    onReset() {
        this.setState({
            "trashItems": []
        })
    }

    onSubmit(e)
    {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    addTrashInfo(trash)
    {
        console.log(trash);
        const trashRow = transformTrashInfoToTableRow(trash, this.state.trashItems.length);
        this.setState({
            "trashItems": [...this.state.trashItems, trashRow]
        })
    };

    constructor(props)
    {
        super(props);
        console.log(props);
        this.state = {
            "name": this.props.name,
            "eventCode": this.props.eventCode,
            "trashItems": []
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
                                    onSubmit={fields => this.addTrashInfo(fields)}
                                />
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col md={6}>
                        <h3>Your Impact</h3>
                        <Table condensed responsive bordered>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Debris Item</th>
                                    <th>Material</th>
                                    <th>Category</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.trashItems}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Grid>
            <button onClick={e => this.onSubmit(e)}>Submit</button>
            <button onClick={e => this.onReset(e)}>Reset</button>
            </div>
        );
    }
}
  