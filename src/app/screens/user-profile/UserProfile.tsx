import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { UserProfileStore } from "./UserProfileStore";
import * as _ from "lodash";
import { ETabsType } from "@components/tab/ETabsType";
import { observer } from "mobx-react";
import "./UserProfile.scss";
import { Tab } from "@components/tab";
import { BillingInfoTab, ProfileTab } from "./view";
import { RouteProps } from "react-router";
import * as qs from "query-string";
import { autobind } from "core-decorators";
import { AppContext } from "@context";
import { Nullable } from "@app/config";
import { redirectToUsersList } from "@utils/history";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";

@observer
@autobind
export class UserProfile extends Component<RouteProps> {
    private readonly store = new UserProfileStore();
    private readonly links: IBreadcrumb[] = [
        { label: "Users", handler: redirectToUsersList },
        { label: "Profile" },
    ];

    constructor(props: RouteProps) {
        super(props);
        this.store.init();

        if (this.props.location) {
            const { id } = qs.parse(this.props.location.search);
            this.store.setUserId(id as string);
            this.store.getUserData(id as string).then(() => {
                const makesId = _.get(this.store.getData(), "vehicle.makes.id");
                AppContext.getInfoStore().getModels(makesId);
            });
        }
        AppContext.getInfoStore().getResidences();
        AppContext.getInfoStore().getStates();
        AppContext.getInfoStore().getMakes();
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">User Profile</div>
                    <Breadcrumb crumbs={this.links}/>
                </div>
                <div className="page-content">
                    <Card className="customer-info" content={this.getCustomerProfile()}/>
                </div>
            </div>
        );
    }

    private getCustomerProfile(): ReactNode {
        return (
            <div className="clearfix">
                {this.getMainInfo()}
                {this.getTabInfo()}
            </div>
        );
    }

    private getMainInfo(): Nullable<ReactNode> {
        const data = this.store.getData();
        if (_.isEmpty(data)) {
            return void 0;
        }
        const { userData, status } = data;
        const { firstName, lastName, photo, email } = userData;
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
                    { text: "Profile", handler: this.store.setTypeTab.bind(this, ETabsType.CUSTOMER_PROFILE) },
                    { text: "Billing Info", handler: this.store.setTypeTab.bind(this, ETabsType.BILLING_INFO) },
                ]}
            >
                {this.getContentByType()}
            </Tab>
        );
    }

    private getContentByType(): ReactNode {
        switch (this.store.getTypeTab()) {
            case ETabsType.CUSTOMER_PROFILE:
                return (
                    <ProfileTab
                        data={this.store.getData()}
                        userId={this.store.getUserId()}
                        models={AppContext.getInfoStore().models}
                    />
                );
            case ETabsType.BILLING_INFO:
                return (
                    <BillingInfoTab
                        userId={this.store.getUserId()}
                    />
                );
            default:
                return void 0;
        }
    }

    private getInitialCharacter(line: string = ""): string {
        return line.charAt(0);
    }
}
