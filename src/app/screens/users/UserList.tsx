import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { UserListStore } from "@app/screens/users/UserListStore";
import { EStatus, StatusLabels } from "@entities/user";
import "./UserList.scss";
import { CustomForm } from "@components/custom-form";
import { InputField } from "@components/fields";
import { AppContext } from "@context";
import { Transport } from "@services/transport";
import { List } from "@components/list";
import { Subject } from "rxjs";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";

@observer
@autobind
export class UserList extends Component {
    private readonly store = new UserListStore();

    constructor(props: any) {
        super(props);
        this.store.transport = new Transport(AppContext.getUserStore().getAdminTokens());
    }

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
                              onClick={() => this.store.setActivityType(EStatus.ALL)}>
                            {StatusLabels.get(EStatus.ALL)}
                        </span>
                        <span className="tab" data-active={this.store.getActivityType() === EStatus.ACTIVE}
                              onClick={() => this.store.setActivityType(EStatus.ACTIVE)}>
                            {StatusLabels.get(EStatus.ACTIVE)}
                        </span>
                        <span className="tab" data-active={this.store.getActivityType() === EStatus.INACTIVE}
                              onClick={() => this.store.setActivityType(EStatus.INACTIVE)}>
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
        return (
            <List
                columns={[
                    {id: "user.id", label: "Id"},
                    {id: "user.firstName", label: "First name"},
                    {id: "user.lastName", label: "Last name"},
                    {id: "residence.title", label: "Residence"},
                    {id: "status", label: "Status"},
                ]}
                getList={(params) => this.store.transport.getUsers(params)}
                updateList$={new Subject<void>()}
            />
        );
    }

    private search() {

    }
}
