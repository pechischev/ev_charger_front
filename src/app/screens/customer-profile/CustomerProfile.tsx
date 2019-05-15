import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { CustomerProfileStore } from "./CustomerProfileStore";
import * as _ from "lodash";
import { ETabsType, TabLabels } from "@components/tab/ETabsType";
import { observer } from "mobx-react";
import "./CustomProfile.scss";
import { Tab } from "@components/tab";
import { BillingInfo, Profile } from "./tabs";
import { Transport } from "@services/transport";
import { AppContext } from "@context";
import { RouteProps } from "react-router";
import * as qs from "query-string";
import { autobind } from "core-decorators";

@observer
@autobind
export class CustomerProfile extends Component<RouteProps> {
    private readonly store = new CustomerProfileStore();

    constructor(props: RouteProps) {
        super(props);
        this.store.transport = new Transport(AppContext.getUserStore().getAdminTokens());

        if (this.props.location) {
            const {id} = qs.parse(this.props.location.search);
            this.store.getUserData(id as string);
        }
    }

    render(): ReactNode {

        return (
            <div className="side-app">
                <div className="page-header">Customer Profile</div>
                <div className="page-content">
                    <Card className="customer-info" content={this.getCustomerProfile()}/>
                </div>
            </div>
        );
    }

    private getCustomerProfile(): ReactNode {
        return (
            <>
                {this.getMainInfo()}
                {this.getTabInfo()}
            </>
        );
    }

    private getMainInfo(): ReactNode {
        const data = this.store.getData();
        if (_.isEmpty(data)) {
            return null;
        }
        const {userData, status} = data;
        const {firstName, lastName, photo, email} = userData;
        return (
            <div className="customer-info_main main-info">
                <div className="main-info_image">
                    <span className="main-info_image__initial" data-shown={!!photo}>
                        {this.getInitialCharacter(firstName)}
                        {this.getInitialCharacter(lastName)}
                    </span>
                </div>
                <div className="main-info_content">
                    <div className="main-info_content__name">
                        {firstName} {lastName}
                    </div>
                    <div className="main-info_content__email">
                        {email}
                    </div>
                    <div className="main-info_content__status" data-status={status}>
                        {status}
                    </div>
                </div>
            </div>
        );
    }

    private getTabInfo(): ReactNode {
        return (
            <Tab
                className="profile-tab"
                items={[
                    {
                        text: TabLabels.get(ETabsType.CUSTOMER_PROFILE) as string,
                        handler: this.store.setTypeTab.bind(this, ETabsType.CUSTOMER_PROFILE)
                    },
                    {
                        text: TabLabels.get(ETabsType.BILLING_INFO) as string,
                        handler: this.store.setTypeTab.bind(this, ETabsType.BILLING_INFO)
                    },
                ]}
            >
                {this.getContentByType()}
            </Tab>
        );
    }

    private getContentByType(): ReactNode {
        switch (this.store.getTypeTab()) {
            case ETabsType.CUSTOMER_PROFILE:
                return <Profile data={this.store.getData()}/>;
            case ETabsType.BILLING_INFO:
                return <BillingInfo/>;
            default:
                return void 0;
        }
    }

    private getInitialCharacter(line: string = ""): string {
        return line.charAt(0);
    }
}
