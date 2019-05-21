import * as React from "react";
import { Component, ReactNode } from "react";
import { AddResidenceStore } from "./AddResidenceStore";
import { Card } from "@components/card";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { IResidenceParams } from "@services/transport/params";
import { EResidenceFieldTypes, ResidenceForm } from "@app/components/residence-form";

@observer
@autobind
export class AddResidence extends Component<{}> {
    private readonly store = new AddResidenceStore();

    constructor(props: {}) {
        super(props);
        this.store.init();
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">New Residence</div>
                <div className="page-content">
                    <Card
                        title="Add Residence"
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
                                    render={this.renderResidenceForm}
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
            <ResidenceForm api={api} submitting={submitting || false} canCancel={true}/>
        );
    }
}
