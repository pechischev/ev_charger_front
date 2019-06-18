import * as React from "react";
import { Component, ReactNode } from "react";
import { observer } from "mobx-react";
import "./ServiceRequestProfile.scss";
import { RouteProps } from "react-router";
import { autobind } from "core-decorators";
import { ERequestType, IServiceRequest } from "@entities/service-request";
import { BrokenCharger, CancelSubscription, LostCard, Other } from "./types";
import { ServiceRequestProfileStore } from ".";

@observer
@autobind
export class ServiceRequestProfile extends Component<RouteProps> {
    private readonly store = new ServiceRequestProfileStore();

    render(): ReactNode {
        const data = {} as IServiceRequest;
        const typeRequest = ERequestType.LOST_ACCESS;
        switch (typeRequest) {
            case ERequestType.LOST_ACCESS:
                return <LostCard data={data}/>;
            case ERequestType.BROKEN_CHARGER:
                return <BrokenCharger data={data}/>;
            case ERequestType.CANCEL_SUBSCRIPTION:
                return <CancelSubscription data={data}/>;
            case ERequestType.OTHER:
                return <Other data={data}/>;
        }
    }
}
