import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { observer } from "mobx-react";
import "./ResidenceProfile.scss";
import { RouteProps } from "react-router";
import * as qs from "query-string";
import { autobind } from "core-decorators";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { ResidenceForm } from "@app/components/residence-form";
import { Button } from "@components/button";
import { Modal } from "@components/modal";
import { BillingList, ChargersList, ResidenceProfileStore, UsersList } from ".";
import { CreateChargerForm, EditChargerForm } from "./view";
import { AppContext } from "@context";

@observer
@autobind
export class ResidenceProfile extends Component<RouteProps> {
    private readonly store = new ResidenceProfileStore();

    constructor(props: RouteProps) {
        super(props);
        this.store.init();

        if (this.props.location) {
            const { id } = qs.parse(this.props.location.search);
            this.store.getResidence(id as string);
            this.store.setResidenceId(id as string);
        }
    }

    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">Residence</div>
                <div className="page-content">
                    <Card
                        className="residence-card"
                        title="Residence Profile"
                        content={
                            <CustomForm
                                keepDirtyOnReinitialize={false}
                                validateData={this.store.validateData}
                                data={this.store.transformResidenceData(this.store.getData())}
                                error$={this.store.error$}
                                submit={this.store.updateResidence}
                                render={this.getSettingsForm}
                            />
                        }
                    />
                    <div className="residence-card_in-row-two clearfix">
                        <Card
                            className="residence-card float-left"
                            title="EV Chargers"
                            content={
                                <ChargersList
                                    step={ResidenceProfileStore.ROWS_PER_PAGE}
                                    residenceId={this.store.getResidenceId()}
                                    canSearch={false}
                                    actionElement={actionElement}
                                    updateList$={this.store.updateChargerList$}
                                    onRemoveItem={this.store.removeCharger}
                                    onViewItem={this.onViewItem}
                                />
                            }
                        />
                        <Card
                            className="residence-card float-right"
                            title="Users"
                            content={
                                <UsersList
                                    step={ResidenceProfileStore.ROWS_PER_PAGE}
                                    residenceId={this.store.getResidenceId()}
                                    canSearch={false}
                                />
                            }
                        />
                    </div>
                    <Card
                        className="residence-card"
                        title="Billing History"
                        content={<BillingList residenceId={this.store.getResidenceId()} canSearch={false}/>}
                    />
                </div>
                <Modal
                    title={"Edit Charger"}
                    open={this.store.getChargerPopupState()}
                    onClose={() => this.store.setChargerPopupState(false)}
                >
                    {(close) => <EditChargerForm
                        residenceId={this.store.getResidenceId()}
                        onClose={close}
                        data={this.store.getCharger()}
                        onEdit={() => {
                            this.store.updateChargerList$.next();
                            close();
                        }}
                    />}
                </Modal>
            </div>
        );
    }

    private getSettingsForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <ResidenceForm
                api={api}
                submitting={submitting || false}
                canCancel={false}
            />
        );
    }

    private getActionElement(): ReactNode {
        return (
            <Modal
                trigger={
                    <Button
                        type="primary"
                        text="Add charger"
                        disabled={!AppContext.getUserStore().isAdmin()}
                    />
                }
                title="Add Charger"
            >
                {(close) => <CreateChargerForm
                    residenceId={this.store.getResidenceId()}
                    onClose={close}
                    onCreate={() => {
                        this.store.updateChargerList$.next();
                        close();
                    }}
                />}
            </Modal>
        );
    }

    private async onViewItem(chargerId: number): Promise<void> {
        this.store.getChargerData(chargerId).then(() => this.store.setChargerPopupState(true));
    }
}
