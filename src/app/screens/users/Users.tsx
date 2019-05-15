import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import * as React from "react";
import { UserList } from "@app/screens/users/UserList";

export class Users extends Component {
    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">Users</div>
                <div className="page-content">
                    <Card title="Users table" content={<UserList actionElement={actionElement}/>}/>
                </div>
            </div>
        );
    }

    private getActionElement(): ReactNode {
        return (
            <button
                className="btn btn-secondary btn-block"
                onClick={() => void 0}
            >
                Add user
            </button>
        );
    }
}
