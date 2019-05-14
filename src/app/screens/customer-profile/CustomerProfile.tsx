import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { EStatus, IUser, StatusLabels } from "@entities/user";
import { CustomerProfileStore } from "./CustomerProfileStore";
import * as _ from "lodash";
import { ETabsType, TabLabels } from "@components/tab/ETabsType";
import { observer } from "mobx-react";
import "./CustomProfile.scss";
import { Tab } from "@components/tab";
import { BillingInfo, Profile } from "./tabs";

@observer
export class CustomerProfile extends Component {
    private readonly store = new CustomerProfileStore();

    render(): ReactNode {
        const data: IUser = {
            id: "1",
            firstName: "Rustam",
            lastName: "Fatyhov",
            email: "rustam.fatyhov@omega-r.com",
            photo: "",
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
                <div className="customer-tabs">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#profile">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#billingInfo">Billing info</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div id="profile" className="container tab-pane active">
                            <Profile data={data}/>
                        </div>
                        <div id="billingInfo" className="container tab-pane fade">
                            <BillingInfo data={data}/>
                        </div>
                    </div>
                </div>
                <div style={{display: "none"}}>
                    {this.getTabInfo(data)}
                </div>
            </>
        );
    }

    private getMainInfo(data: IUser): ReactNode {
        const {firstName = "", lastName = "", email = "", photo = "", status = ""} = data;
        return (
            <div className="customer-info_main main-info">
                <div className="main-info_image">
                    <span className="main-info_image__initial" data-hidden={_.isEmpty(photo)}>
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

    private getInitialCharacter(line: string): string {
        return line.charAt(0);
    }
}
