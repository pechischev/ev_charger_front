import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import * as React from "react";
import { UserList } from "@app/screens/users/UserList";
import { redirectOnAddUserForm } from "@utils/history";
import { Button } from "@components/button";

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
            <Button
                type="primary"
                onClick={redirectOnAddUserForm}
                text={"Add user"}
            />
        );
    }
}
