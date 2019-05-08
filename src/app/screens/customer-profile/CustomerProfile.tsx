import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { EStatus, IUser, StatusLabels } from "@entities/user";
import { CustomerProfileStore } from "./CustomerProfileStore";
import { BillingInfo, Profile } from "./tabs";
import { Tab } from "@components/tab";
import * as _ from "lodash";
import { ETabsType, TabLabels } from "@components/tab/ETabsType";
import { observer } from "mobx-react";
import "./CustomProfile.scss";

@observer
export class CustomerProfile extends Component {
    private readonly store = new CustomerProfileStore();

    render(): ReactNode {
        const data: IUser = {
            id: "1",
            firstName: "Rustam",
            lastName: "Fatyhov",
            email: "rustam.fatyhov@omega-r.com",
            photo: {
                preview_link: ""
            },
            status: EStatus.INACTIVE,
        };
        return (
            <div className="side-app">
                <div className="page-header">Customer Profile</div>
                <div className="page-content">
                    <Card className="customer-info" content={this.getCustomerProfile(data)}/>
                </div>
            </div>
        );
    }

    private getCustomerProfile(data: IUser): ReactNode {
        return (
            <>
                {this.getMainInfo(data)}
                {this.getTabInfo(data)}
            </>
        );
    }

    private getMainInfo(data: IUser): ReactNode {
        const {firstName="", lastName="", email="", photo = "", status =""} = data;
        return (
            <div className="customer-info_main main-info">
                <div className="main-info_image">
                    <span className="main-info_image__initial" data-hidden={_.isEmpty(photo)}>
                        {this.getInitialCharacterCustomer(data)}
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
                        {StatusLabels.get(status as EStatus)}
                    </div>
                </div>
            </div>
        );
    }

    private getTabInfo(data: IUser): ReactNode {
        return (
            <Tab
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
                {this.getContentByType(data)}
            </Tab>
        );
    }

    private getContentByType(data: IUser): ReactNode {
        switch (this.store.getTypeTab()) {
            case ETabsType.CUSTOMER_PROFILE:
                return <Profile data={data}/>;
            case ETabsType.BILLING_INFO:
                return <BillingInfo data={data}/>;
            default:
                return void 0;
        }
    }

    private getInitialCharacterCustomer(data: IUser): string {
        return `${_.get(data, "firstName", "").charAt(0)}${_.get(data, "lastName", "").charAt(0)}`;
    }
}
