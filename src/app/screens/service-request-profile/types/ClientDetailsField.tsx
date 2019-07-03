import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { observer } from "mobx-react";
import { InputField } from "@components/fields";
import { EServiceRequestFields } from "./EServiceRequestFields";
import { ERequestType } from "@entities/service-request";

interface IClientDetailsField {
    type: ERequestType;
}

@observer
export class ClientDetailsField extends Component<IClientDetailsField> {
    render(): ReactNode {
        return (
            <Fragment>
                <InputField
                    label="Name"
                    name={EServiceRequestFields.FIRST_NAME}
                    disabled={true}
                />
                <InputField
                    label="Surname"
                    name={EServiceRequestFields.SECOND_NAME}
                    disabled={true}
                />
                <InputField
                    label="Site"
                    name={EServiceRequestFields.RESIDENCE}
                    disabled={true}
                />
                <InputField
                    label="Address"
                    name={EServiceRequestFields.ADDRESS}
                    disabled={true}
                />
                <InputField
                    label="EV Charger ID"
                    name={EServiceRequestFields.CHARGER}
                    disabled={true}
                    isVisible={this.props.type === ERequestType.BROKEN_CHARGER}
                />
            </Fragment>
        );
    }
}
