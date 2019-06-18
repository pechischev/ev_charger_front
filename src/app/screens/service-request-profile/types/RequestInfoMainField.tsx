import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { observer } from "mobx-react";
import { ERequestType } from "@entities/service-request";
import { InputField, InputTextareaField, SelectField } from "@components/fields";
import { EServiceRequestFields } from "@app/screens/service-request-profile/types/EServiceRequestFields";
import { Button } from "@components/button";
import { redirectToServiceRequest } from "@utils/history";
import { FormRenderProps } from "react-final-form";

interface IRequestInfoMainField {
    type: ERequestType;
    api: FormRenderProps;
    submitting?: boolean;
    status: boolean;
}

@observer
export class RequestInfoMainField extends Component<IRequestInfoMainField> {
    render(): ReactNode {
        const label = ((this.props.type === ERequestType.LOST_ACCESS)
            || (this.props.type === ERequestType.CANCEL_SUBSCRIPTION)) ? "Request" : "Comment";
        console.log(this.props.status);
        return (
            <Fragment>
                <InputField
                    label="Data/Time"
                    name={EServiceRequestFields.DATE_TIME}
                    disabled={true}
                />
                <InputField
                    label="Subject"
                    name={EServiceRequestFields.SUBJECT}
                    disabled={true}
                    isVisible={this.props.type === ERequestType.OTHER}
                />
                <InputTextareaField
                    label={label}
                    name={EServiceRequestFields.COMMENT}
                    disabled={true}
                />
                <SelectField
                    label={"Request Status"}
                    name={EServiceRequestFields.STATUS}
                    options={[
                        { id: "active", title: "Active" }, { id: "resolved", title: "Resolved" },
                    ]}
                    disabled={this.props.status}
                />
                <div className="request-container__button clearfix">
                    <Button
                        className="float-right"
                        type="secondary"
                        onClick={redirectToServiceRequest}
                        text={"Cancel"}
                    />
                    <Button
                        className="float-right"
                        type="primary"
                        disabled={!this.props.submitting || this.props.status}
                        onClick={() => this.props.api.handleSubmit()}
                        text={"Save"}
                        style={{
                            marginRight: 10,
                        }}
                    />
                </div>
            </Fragment>
        );
    }
}
