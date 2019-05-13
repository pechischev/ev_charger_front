import * as React from "react";
import { Component, ReactNode } from "react";
import { Table } from "@components/table";
import { Card } from "@components/card";
import { UserListStore } from "@app/screens/users/UserListStore";
import { EStatus, StatusLabels } from "@entities/user";
import "./UserList.scss";
import { CustomForm } from "@components/custom-form";
import { InputField } from "@components/fields";

export class UserList extends Component {
    private readonly store = new UserListStore();

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">Users</div>
                <div className="page-content">
                    <Card title="Users table" content={this.getUsersInfo()}/>
                </div>
            </div>
        );
    }

    private getUsersInfo(): ReactNode {
        return (
            <>
                <div className="users-actions clearfix">
                    <div className="users-actions__tabs activity-tabs float-left">
                        <span className="tab" data-active={this.store.getActivityType() === EStatus.ALL}
                              onClick={this.store.setActivityType(EStatus.ALL)}>
                            {StatusLabels.get(EStatus.ALL)}
                        </span>
                        <span className="tab" data-active={this.store.getActivityType() === EStatus.ACTIVE}
                              onClick={this.store.setActivityType(EStatus.ACTIVE)}>
                            {StatusLabels.get(EStatus.ACTIVE)}
                        </span>
                        <span className="tab" data-active={this.store.getActivityType() === EStatus.INACTIVE}
                              onClick={this.store.setActivityType(EStatus.INACTIVE)}>
                            {StatusLabels.get(EStatus.INACTIVE)}
                        </span>
                    </div>
                    <div className="users-actions__search float-right">
                        <CustomForm
                            submit={this.search}
                            render={(api, submitting) => {
                                return (
                                    <div className="search-field">
                                        <InputField
                                            label={"Search"}
                                            name={"search"}
                                            placeholder={"Search"}
                                        />
                                    </div>
                                );
                            }}
                        />
                    </div>
                </div>
                {this.getTable()}
            </>
        );
    }

    private getTable(): ReactNode {
        const dataTable: object[] = [];
        for (let i = 0; i < 50; i++) {
            dataTable.push(
                {
                    id: i + 1,
                    first_name: "Adrian",
                    last_name: "Terry",
                    residence: "residence",
                    status: "status",
                }
            )
        }
        return (
            <Table
                columns={[
                    {id: "id", label: "Id"},
                    {id: "first_name", label: "First name"},
                    {id: "last_name", label: "Last name"},
                    {id: "residence", label: "Residence"},
                    {id: "status", label: "Status"},
                ]}
                totalCount={dataTable.length}
                data={dataTable}
            />
        );
    }

    private search() {

    }
}
