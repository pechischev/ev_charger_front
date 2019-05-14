import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import * as React from "react";
import { UserList } from "@app/screens/users/UserList";

export class Users extends Component {
    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">Users</div>
                <div className="page-content">
                    <Card title="Users table" content={<UserList />}/>
                </div>
            </div>
        );
    }
}
