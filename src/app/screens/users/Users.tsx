import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { UserList } from "@app/screens/users/UserList";
import { redirectOnAddUserForm } from "@utils/history";
import { Button } from "@components/button";
import { AppContext } from "@context";
import * as qs from "query-string";

export class Users extends Component {
    render(): ReactNode {
        let typeTab = "";
        let fromFilter = 0;
        let toFilter = 0;
        if (AppContext.getHistory().location) {
            const { type = "", from, to } = qs.parse(AppContext.getHistory().location.search);
            typeTab = `${type}`;
            if (!!from && !!to) {
                fromFilter = parseInt(`${from}`, 10) / 1000;
                toFilter = parseInt(`${to}`, 10) / 1000;
            }
        }
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
                                range={{
                                    start: fromFilter,
                                    end: toFilter,
                                }}
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
