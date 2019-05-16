import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { observer } from "mobx-react";
import "./ResidenceProfile.scss";
import { Transport } from "@services/transport";
import { AppContext } from "@context";
import { RouteProps } from "react-router";
import * as qs from "query-string";
import { autobind } from "core-decorators";
import { BillingList, ChargersList, ResidenceProfileStore, UsersList } from ".";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { IResidenceParams } from "@services/transport/params";
import { EResidenceFieldTypes, ResidenceForm } from "@app/components/residence-form";

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
                                  keepDirtyOnReinitialize={false}
                                  validateData={this.store.validateData}
                                  data={{
                                      [EResidenceFieldTypes.BILLING_RATE]: 99
                                  } as IResidenceParams}
                                  error$={this.store.error$}
                                  submit={this.store.updateResidence}
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
                <ResidenceForm store={this.store} api={api} submitting={submitting || false}/>
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
