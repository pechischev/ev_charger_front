import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import * as _ from "lodash";
import { observer } from "mobx-react";
import "./UserProfile.scss";
import { Transport } from "@services/transport";
import { AppContext } from "@context";
import { RouteProps } from "react-router";
import * as qs from "query-string";
import { autobind } from "core-decorators";
import { BillingList, ChargersList, ResidenceProfileStore, UsersList } from ".";

@observer
@autobind
export class ResidenceProfile extends Component<RouteProps> {
    private readonly store = new ResidenceProfileStore();

    constructor(props: RouteProps) {
        super(props);
        this.store.transport = new Transport(AppContext.getUserStore().getAdminTokens());

        if (this.props.location) {
            const {id} = qs.parse(this.props.location.search);
            this.store.getResidenceData(id as string);
        }
    }

    render(): ReactNode {

        return (
            <div className="side-app">
                <div className="page-header">Residence</div>
                <div className="page-content">
                    <Card className="resident-info" title="Residence Profile" content={this.getResidenceProfile()}/>
                    <div className="">
                        <Card className="resident-info" title="EV Chargers" content={<ChargersList canSearch={false} actionElement={() => this.getActionElement()}/>}/>
                        <Card className="resident-info" title="Users" content={<UsersList canSearch={false}/>}/>
                    </div>
                    <Card className="resident-info" title="Billing History" content={<BillingList canSearch={false} />}/>
                </div>
            </div>
        );
    }

    private getResidenceProfile(): ReactNode {
        const data = this.store.getData();
        if (_.isEmpty(data)) {
            return null;
        }
        return (
            <div>
            </div>
        );
    }

    private getActionElement() {
        return (
            <button
                className="btn btn-secondary btn-block"
                onClick={() => void 0}
            >
                Add charger
            </button>
        );
    }
}
