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
                "name": ""
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
                {this.state.userInfo.name 
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
  