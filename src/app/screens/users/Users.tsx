import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { UserList } from "@app/screens/users/UserList";
import { redirectOnAddUserForm } from "@utils/history";
import { Button } from "@components/button";
import { AppContext } from "@context";
import { getTypeTab, getRange } from "@utils";

export class Users extends Component {
    render(): ReactNode {
        const typeTab = getTypeTab();
        const range = getRange();
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Users</div>
                </div>
                <div className="page-content">
                    <Card
                        title="Users table"
                        isPrint={true}
                        content={
                            <UserList
                                actionElement={actionElement}
                                canDateSearch={true}
                                type={typeTab}
                                range={range}
                            />
                        }
                    />
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
