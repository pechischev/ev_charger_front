import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { InputField, SelectField } from "@components/fields";
import { AppContext } from "@context";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { IResidenceForm } from "./interfaces";
import { EResidenceFieldTypes } from "./EResidenceFieldTypes";
import { Button } from "@components/button";
import { FormRenderProps } from "react-final-form";

interface IResidenceForm extends IResidenceForm {
    store: any;
    api: FormRenderProps;
    submitting?: boolean;
}

@observer
@autobind
export class ResidenceForm extends Component<IResidenceForm, IResidenceForm> {
    render(): ReactNode {
        return (
            <div className="profile-form-fields">
                <Fragment>
                    <div className="residence-info float-left">
                        <div className="two-object-column clearfix">
                            <InputField
                                name={EResidenceFieldTypes.TITLE}
                                placeholder={"Enter residence name"}
                                label={"Residence Name"}
                            />
                            <InputField
                                name={EResidenceFieldTypes.CITY}
                                placeholder={"Enter city"}
                                label={"City"}
                            />
                        </div>
                        <InputField
                            name={EResidenceFieldTypes.FIRST_ADDRESS}
                            placeholder={"Enter first address"}
                            label={"Address 1"}
                        />
                        <div className="two-object-column clearfix">
                            <SelectField
                                name={EResidenceFieldTypes.OPERATOR}
                                label={"Property Operator"}
                                placeholder={"Select property operator"}
                                options={this.props.store.operators}
                            />
                            <InputField
                                name={EResidenceFieldTypes.BILLING_RATE}
                                placeholder={"Enter user billing rate"}
                                label={"User Billing Rate"}
                            />
                        </div>
                    </div>
                    <div className="residence-info float-right">
                        <div className="two-object-column clearfix">
                            <SelectField
                                name={EResidenceFieldTypes.STATE}
                                label={"State"}
                                options={AppContext.getInfoStore().states}
                                placeholder={"Select state"}
                            />
                            <InputField
                                name={EResidenceFieldTypes.ZIP_CODE}
                                placeholder={"Enter zip code"}
                                label={"Zip Code"}
                            />
                        </div>
                        <InputField
                            name={EResidenceFieldTypes.SECOND_ADDRESS}
                            placeholder={"Enter second address"}
                            label={"Address 2"}
                        />
                        <div className="two-object-column clearfix">
                            <InputField
                                name={EResidenceFieldTypes.SERVICE_FEE}
                                placeholder={"Enter service fee"}
                                label={"Service Fee"}
                            />
                            <Button
                                className="btn-primary clearfix"
                                disabled={!this.props.submitting}
                                onClick={() => api.handleSubmit()}
                                text={"Save"}
                                style={{
                                    marginRight: 10
                                }}
                            />
                        </div>
                    </div>
                </Fragment>
            </div>
        );
    }
}
