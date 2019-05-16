import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { Card } from "@components/card";
import { observer } from "mobx-react";
import "./ResidenceProfile.scss";
import { Transport } from "@services/transport";
import { AppContext } from "@context";
import { RouteProps } from "react-router";
import * as qs from "query-string";
import { autobind } from "core-decorators";
import { BillingList, ChargersList, ResidenceProfileStore, UsersList } from ".";
import { InputField, SelectField } from "@components/fields";
import { EResidenceFieldTypes } from "@app/screens/add-residence/constants";
import { Button } from "@components/button";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { IResidenceParams } from "@services/transport/params";

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
            this.store.setResidenceId(parseInt(id as string, 10));
        }
    }

    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">Residence</div>
                <div className="page-content">
                    <Card className="residence-card" title="Residence Profile"
                          content={
                              <CustomForm
                                  error$={this.store.error$}
                                  validateData={this.store.validateData}
                                  keepDirtyOnReinitialize={false}
                                  data={{
                                      [EResidenceFieldTypes.BILLING_RATE]: 99
                                  } as IResidenceParams}
                                  submit={(data) => this.store.updateResidence(data}
                                  render={(api, submitting) => this.getSettingsForm(api, submitting)}
                              />
                          }
                    />
                    <div className="residence-card_in-row-two clearfix">
                        <Card className="residence-card float-left" title="EV Chargers"
                              content={
                                  <ChargersList
                                      residenceId={this.store.getResidenceId()}
                                      canSearch={false}
                                      actionElement={actionElement}
                                  />
                              }
                        />
                        <Card className="residence-card float-right" title="Users"
                              content={
                                  <UsersList
                                      residenceId={this.store.getResidenceId()}
                                      canSearch={false}
                                  />
                              }
                        />
                    </div>
                    <Card className="residence-card" title="Billing History"
                          content={
                              <BillingList
                                  residenceId={this.store.getResidenceId()}
                                  canSearch={false}
                              />
                          }
                    />
                </div>
            </div>
        );
    }

    private getSettingsForm(api: FormRenderProps, submitting?: boolean): ReactNode {
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
                            name={EResidenceFieldTypes.FIRST_ADDRESS}
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
                                disabled={!submitting}
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
