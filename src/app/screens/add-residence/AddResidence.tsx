import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { AddResidenceStore } from "./AddResidenceStore";
import { Card } from "@components/card";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { InputField, SelectField } from "@components/fields";
import { AppContext } from "@context";
import { Button } from "@components/button";
import { redirectToResidenceList } from "@utils/history";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { IResidenceParams } from "@services/transport/params";
import { EResidenceFieldTypes } from "@app/components/residence-form";

@observer
@autobind
export class AddResidence extends Component<{}> {
    private readonly store = new AddResidenceStore();

    constructor(props: {}) {
        super(props);
        this.store.init();
        this.store.getOperators();

        AppContext.getInfoStore().getStates();
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">New Residence</div>
                <div className="page-content">
                    <Card
                        className="customer-info"
                        content={
                            <div className="tab-container-profile">
                                <CustomForm
                                    keepDirtyOnReinitialize={false}
                                    validateData={this.store.validateData}
                                    data={{
                                        [EResidenceFieldTypes.BILLING_RATE]: 99
                                    } as IResidenceParams}
                                    error$={this.store.error$}
                                    submit={this.store.createResidence}
                                    render={(api, submitting) => this.renderResidenceForm(api, submitting)}
                                />
                            </div>
                        }
                    />
                </div>
            </div>
        );
    }

    private renderResidenceForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <Fragment>
                <InputField
                    name={EResidenceFieldTypes.TITLE}
                    label={"Residence Name"}
                />
                <div className="profile-form-fields">
                    <SelectField
                        name={EResidenceFieldTypes.STATE}
                        label={"State"}
                        options={AppContext.getInfoStore().states}
                        placeholder={"Select state"}
                    />
                    <InputField
                        name={EResidenceFieldTypes.CITY}
                        label={"City"}
                    />
                    <InputField
                        name={EResidenceFieldTypes.ADDRESS}
                        label={"Address"}
                    />
                    <InputField
                        name={EResidenceFieldTypes.ZIP_CODE}
                        label={"Zip Code"}
                    />
                </div>
                <div className="profile-form-fields">
                    <SelectField
                        name={EResidenceFieldTypes.OPERATOR}
                        label={"Property Operator"}
                        placeholder={"Select operator"}
                        options={this.store.operators}
                    />
                    <InputField
                        name={EResidenceFieldTypes.BILLING_RATE}
                        label={"User Billing Rate"}
                    />
                </div>
                <div className="profile-form-button clearfix">
                    <Button
                        className="btn-secondary float-right"
                        onClick={() => redirectToResidenceList()}
                        text={"Cancel"}
                    />
                    <Button
                        className="btn-primary float-right"
                        disabled={!submitting}
                        onClick={() => api.handleSubmit()}
                        text={"Save"}
                        style={{
                            marginRight: 10
                        }}
                    />
                </div>
            </Fragment>
        );
    }
}
