import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { CustomForm } from "@components/custom-form";
import { autobind } from "core-decorators";
import { FormRenderProps } from "react-final-form";
import { Button } from "@components/button";
import { CreateChargerStore } from "./CreateChargerStore";
import { ChargerForm } from "@app/components/charger-form";
import { IChargerParams } from "@services/transport/params";

interface ICreateChargerForm {
    residenceId?: string;

    onClose(): void;

    onCreate(): void;
}

@autobind
export class CreateChargerForm extends Component<ICreateChargerForm> {
    private readonly store = new CreateChargerStore();

    constructor(props: ICreateChargerForm) {
        super(props);

        this.store.init();
    }

    render(): ReactNode {
        return (
            <CustomForm
                keepDirtyOnReinitialize={false}
                validateData={this.store.validateData}
                error$={this.store.error$}
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
        return this.store.createCharger(data, this.props.residenceId).then(() => {
            this.props.onClose();
            this.props.onCreate();
        });
    }
}
