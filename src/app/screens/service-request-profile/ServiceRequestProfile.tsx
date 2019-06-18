import * as React from "react";
import { Component, ReactNode } from "react";
import { observer } from "mobx-react";
import "./ServiceRequestProfile.scss";
import { RouteProps } from "react-router";
import { autobind } from "core-decorators";
import { ERequestType } from "@entities/service-request";
import { BrokenCharger, CancelSubscription, LostCard, Other } from "./types";
import { ServiceRequestProfileStore } from ".";
import * as qs from "query-string";
import { AppContext } from "@context";
import { get } from "lodash";

@observer
@autobind
export class ServiceRequestProfile extends Component<RouteProps> {
    private readonly store = new ServiceRequestProfileStore();

    constructor(props: RouteProps) {
        super(props);

        this.store.init();
        if (this.props.location) {
            const { id } = qs.parse(AppContext.getHistory().location.search);
            this.store.setRequestId(`${id}`);
            this.store.getServiceRequest(`${id}`);
        }
    }

    render(): ReactNode {
        const typeRequest = get(this.store.getData(), "request.type");
        switch (typeRequest) {
            case ERequestType.LOST_ACCESS:
                return <LostCard data={this.store.getData()}/>;
            case ERequestType.BROKEN_CHARGER:
                return <BrokenCharger data={this.store.getData()}/>;
            case ERequestType.CANCEL_SUBSCRIPTION:
                return <CancelSubscription data={this.store.getData()}/>;
            case ERequestType.OTHER:
                return <Other data={this.store.getData()}/>;
            default:
                return "";
        }
    }
}
