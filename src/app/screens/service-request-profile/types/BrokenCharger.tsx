import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import * as React from "react";
import { Component, ReactNode } from "react";
import { FormRenderProps } from "react-final-form";
import { ERequestType, IServiceRequest } from "@entities/service-request";
import { ServiceRequestProfileStore } from "..";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";
import { redirectToServiceRequest } from "@utils/history";
import { Card } from "@components/card";
import { CustomForm } from "@components/custom-form";
import { ClientDetailsField, RequestInfoMainField } from ".";
import { AppContext } from "@context";
import * as qs from "query-string";
import { get } from "lodash";

interface IBrokenChargerProps {
    data: IServiceRequest;
}

@observer
@autobind
export class BrokenCharger extends Component<IBrokenChargerProps> {
    private readonly store = new ServiceRequestProfileStore();
    private readonly links: IBreadcrumb[] = [
        { label: "Service Requests", handler: redirectToServiceRequest },
        { label: "Profile" },
    ];

    constructor(props: IBrokenChargerProps) {
        super(props);

        this.store.init();
        if (AppContext.getHistory().location) {
            const { id } = qs.parse(AppContext.getHistory().location.search);
            this.store.setRequestId(`${id}`);
            this.store.setData(this.props.data);
        }
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Broken EV charger</div>
                    <Breadcrumb crumbs={this.links}/>
                </div>
                <div className="page-content">
                    <Card
                        className="residence-card"
                        title="Request Details"
                        content={
                            <CustomForm
                                keepDirtyOnReinitialize={false}
                                data={this.store.transformRequestData(this.store.getData())}
                                submit={this.store.updateServiceRequest}
                                error$={this.store.error$}
                                render={this.getSettingsForm}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private getSettingsForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <div className="request-container">
                <div className="request-container_column">
                    <div className="request-container__title">Client details</div>
                    <div className="request-container__content">
                        <ClientDetailsField type={ERequestType.BROKEN_CHARGER}/>
                    </div>
                </div>
                <div className="request-container_column">
                    <div className="request-container__title">Request Information</div>
                    <div className="request-container__content">
                        <RequestInfoMainField
                            status={get(this.props.data, "request.resolved")}
                            type={ERequestType.BROKEN_CHARGER}
                            api={api}
                            submitting={submitting}
                        />
                    </div>
                </div>
                <div className="request-container_column"/>
            </div>
        );
    }
}
