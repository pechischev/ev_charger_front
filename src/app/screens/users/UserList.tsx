import {Component, ReactNode} from "react";
import * as React from "react";
import {Table} from "@components/table";
import {Card} from "@components/card";

export class UserList extends Component {
    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">Users</div>
                <div className="page-content">
                    <div className="users-">

                    </div>
                    <Card title="Users table" content={this.getUserTable()} />
                </div>
            </div>
        );
    }
    private getUserTable(): ReactNode {
        const dataTable: object[] = [];
        for (let i = 0; i < 100; i++) {
            dataTable.push(
                {
                    first_name: "Adrian",
                    last_name: "Terry",
                    position: "Marketing Officer",
                    start_date: "2013/04/21",
                    salary: "$543,769",
                    email: "a.terry@datatables.net",
                }
            )
        }
        return (
            <Table
                columns={[
                    {id: "first_name", label: "FIRST NAME"},
                    {id: "last_name", label: "LAST NAME"},
                    {id: "position", label: "POSITION", size: "2fr"},
                    {id: "start_date", label: "START DATE"},
                    {id: "salary", label: "SALARY"},
                    {id: "email", label: "EMAIL", size: "2fr"},
                ]}
                totalCount={dataTable.length}
                data={dataTable}
            />
        );
    }
}
