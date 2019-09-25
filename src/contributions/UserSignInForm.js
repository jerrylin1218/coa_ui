import './UserSignInForm.css';

import React, { Component } from 'react';

export default class UserSignInForm extends Component {

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
        this.state = {
            "name": "",
            "eventCode": "",
        };
    };

    render() {
        return(
            <form>
                <input
                    name="name"
                    type="text"
                    value={this.state.name}
                    placeholder="Please enter your name"
                    onChange={e => this.change(e)}
                />
                <br/><br/>
                <input
                    name="eventCode"
                    type="text"
                    value={this.state.eventCode}
                    placeholder="Please enter event code"
                    onChange={e => this.change(e)}
                />
                <br/><br/>
                <input type="submit" value="Enter" onClick={e => this.onSubmit(e)}/>
            </form>
        );
    }
}
  