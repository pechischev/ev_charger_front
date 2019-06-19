import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { UserList } from "@app/screens/users/UserList";
import { redirectOnAddUserForm } from "@utils/history";
import { Button } from "@components/button";
import { AppContext } from "@context";

export class Users extends Component {
    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Users</div>
                </div>
                <div className="page-content">
                    <Card title="Users table" content={<UserList actionElement={actionElement}/>}/>
                </div>
            </div>
        );
    }

    private getActionElement(): ReactNode {
        const readOnly = !AppContext.getUserStore().isAdmin();
        return (
            <Button
                type={"primary"}
                onClick={redirectOnAddUserForm}
                text={"Add user"}
                disabled={readOnly}
            />
        );
    }
}
