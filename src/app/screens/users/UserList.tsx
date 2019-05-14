import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { UserListStore } from "@app/screens/users/UserListStore";
import { EStatus } from "@entities/user";
import "./UserList.scss";
import { CustomForm } from "@components/custom-form";
import { InputField } from "@components/fields";
import { AppContext } from "@context";
import { Transport } from "@services/transport";
import { List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Tab } from "@components/tab";
import { IListParams } from "@services/transport/params";
import * as _ from "lodash";

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
                    <Tab
                        items={[
                            {text: "All", handler: () => this.store.setActivityType(void 0)},
                            {text: "Active", handler: () => this.store.setActivityType(EStatus.ACTIVE)},
                            {text: "Inactive", handler: () => this.store.setActivityType(EStatus.INACTIVE)},
                        ]}
                    />
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
                type={this.store.getActivityType()}
                search={this.store.getSearch()}
                getList={(params) => this.store.transport.getUsers(params)}
                updateList$={this.store.updateList$}
            />
        );
    }

    private search(data: Pick<IListParams, "search">) {
        console.log(data);
        const search = _.get<Pick<IListParams, "search">, "search">(data, "search");
        this.store.setSearch(search);
    }
}
