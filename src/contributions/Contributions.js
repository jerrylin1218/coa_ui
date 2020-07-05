import './Contributions.css';

import React, { Component } from 'react';
import ContributionForm from "./ContributionForm";
import UserSignInForm from "./UserSignInForm";

export default class Contributions extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            "userInfo": {
                "name": "",
                "eventCode": ""
            }
        };
    }

    updateUserInfo(fields)
    {
        this.setState({
            "userInfo": {
                ...fields
            }
        });
    }

    render() {
        return(
            <div>
                {this.state.userInfo.name && this.state.userInfo.eventCode 
                    ? <ContributionForm
                            name={this.state.userInfo.name}
                            eventCode={this.state.userInfo.eventCode}
                            onLogout={() => this.updateUserInfo({})}
                        ></ContributionForm>
                    : <UserSignInForm
                            onSubmit={fields => this.updateUserInfo(fields)}
                        ></UserSignInForm>}
            </div>
        );
    }
}
  