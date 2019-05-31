import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { InputField, SelectField, ZipCodeField } from "@components/fields";
import { AppContext } from "@context";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { IResidenceForm } from "./interfaces";
import { EResidenceFieldTypes } from "./EResidenceFieldTypes";
import { Button } from "@components/button";
import "./ResidenceForm.scss";
import { redirectToResidenceList } from "@utils/history";
import { ResidenceFormStore } from "./ResidenceFormStore";

@observer
@autobind
export class ResidenceForm extends Component<IResidenceForm> {
    private readonly store = new ResidenceFormStore();

    constructor(props: IResidenceForm) {
        super(props);
        this.store.init();
        this.store.getOperators();

        AppContext.getInfoStore().getStates();
    }

    render(): ReactNode {
        return (
            <div className="residence-main-info clearfix">
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
                            name={EResidenceFieldTypes.ADDRESS}
                            placeholder={"Enter first address"}
                            label={"Address 1"}
                        />
                        <div className="two-object-column clearfix">
                            <SelectField
                                name={EResidenceFieldTypes.OPERATOR}
                                label={"Property Operator"}
                                placeholder={"Select property operator"}
                                options={this.store.operators}
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
                            <ZipCodeField
                                name={EResidenceFieldTypes.ZIP_CODE}
                            />
                        </div>
                        <InputField
                            name={EResidenceFieldTypes.EXTRA_ADDRESS}
                            placeholder={"Enter second address"}
                            label={"Address 2"}
                        />
                        <div className="two-object-column clearfix">
                            {this.renderServiceFeeField()}
                            <div className="residence-info__buttons clearfix">
                                <Button
                                    className={`float-right ${this.props.canCancel ? "button-view" : "button-hidden"}`}
                                    type="secondary"
                                    onClick={redirectToResidenceList}
                                    text={"Cancel"}
                                />
                                <Button
                                    className="float-right"
                                    type="primary"
                                    disabled={!this.props.submitting || !AppContext.getUserStore().isAdmin()}
                                    onClick={() => this.props.api.handleSubmit()}
                                    text={"Save"}
                                    style={{
                                        marginRight: 10,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Fragment>
            </div>
        );
    }

    private renderServiceFeeField(): ReactNode {
        if (!AppContext.getUserStore().isAdmin()) {
            return void 0;
        }
        return (
            <InputField
                name={EResidenceFieldTypes.SERVICE_FEE}
                placeholder={"Enter service fee"}
                label={"Service Fee"}
            />
        );
    }
}
