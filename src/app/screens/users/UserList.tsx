import { Component, ReactNode } from "react";
import * as React from "react";
import { Table } from "@components/table";

export class UserList extends Component {
    render(): ReactNode {
        return (
            <div className={"side-app"}>
                <div className={"page-header"}>Users</div>
                <div>
                    <Table
                        columns={[
                            { id: "a", label: "FIO" },
                            { id: "b", label: "Email" },
                        ]}
                        data={[]}
                    />
                </div>
            </div>
        );
    }
}
