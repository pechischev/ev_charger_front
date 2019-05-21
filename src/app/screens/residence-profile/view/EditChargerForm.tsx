import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { CustomForm } from "@components/custom-form";
import { autobind } from "core-decorators";
import { FormRenderProps } from "react-final-form";
import { Button } from "@components/button";
import { EditChargerStore } from "./EditChargerStore";
import { ChargerForm } from "@app/components/charger-form";
import { IChargerParams } from "@services/transport/params";
import { ICharger } from "@entities/residence";

interface IEditChargerForm {
    residenceId?: string;
    data?: ICharger;

    onClose(): void;

    onEdit(): void;
}

@autobind
export class EditChargerForm extends Component<IEditChargerForm> {
    private readonly store = new EditChargerStore();

    constructor(props: IEditChargerForm) {
        super(props);

        this.store.init();
    }

    render(): ReactNode {
        return (
            <CustomForm
                data={this.store.transformChargerData(this.props.data)}
                validateData={this.store.validateData}
                submit={this.onSubmit}
                render={this.renderFields}
            />
        );
    }

    private renderFields(api: FormRenderProps, submitting: boolean): ReactNode {
        return (
            <Fragment>
                <div className={"modal-body"}>
                    <ChargerForm/>
                </div>
                <div className={"modal-footer"}>
                    <Button
                        text={"Submit"}
                        type={"primary"}
                        disabled={!submitting}
                        onClick={() => api.handleSubmit()}
                    />
                    <Button
                        type={"secondary"}
                        text={"Cancel"}
                        onClick={this.props.onClose}
                    />
                </div>
            </Fragment>
        );
    }

    private async onSubmit(data: IChargerParams): Promise<void> {
        return this.store.updateCharger(data, this.props.residenceId).then(() => {
            this.props.onClose();
            this.props.onEdit();
        });
    }
}
