import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import * as React from "react";
import { Component, ReactNode } from "react";
import { FormRenderProps } from "react-final-form";
import { get } from "lodash";
import { ERequestType, IServiceRequest } from "@entities/service-request";
import { ServiceRequestProfileStore } from "..";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";
import { redirectToServiceRequest } from "@utils/history";
import { Card } from "@components/card";
import { CustomForm } from "@components/custom-form";
import { ClientDetailsField, RequestInfoMainField  } from ".";

interface ILostCardProps {
    data: IServiceRequest;
}

@observer
@autobind
export class LostCard extends Component<ILostCardProps> {
    private readonly store = new ServiceRequestProfileStore();
    private readonly links: IBreadcrumb[] = [
        { label: "Service Requests", handler: redirectToServiceRequest },
        { label: "Profile" },
    ];

    constructor(props: ILostCardProps) {
        super(props);

        const { data } = this.props;
        this.store.setRequestId(get(data, "id", "1").toString());
        this.store.setData(data);
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Lost access card</div>
                    <Breadcrumb crumbs={this.links}/>
                </div>
                <div className="page-content">
                    <Card
                        className="residence-card"
                        title="Request Details"
                        content={
                            <CustomForm
                                keepDirtyOnReinitialize={false}
                                validateData={this.store.validateData}
                                data={this.store.transformRequestData(this.store.getData())}
                                error$={this.store.error$}
                                submit={() => void 0}
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
                        <ClientDetailsField type={ERequestType.LOST_CARD}/>
                    </div>
                </div>
                <div className="request-container_column">
                    <div className="request-container__title">Request Information</div>
                    <div className="request-container__content">
                        <RequestInfoMainField type={ERequestType.LOST_CARD} api={api} submitting={submitting}/>
                    </div>
                </div>
                <div className="request-container_column"/>
            </div>
        );
    }
}
