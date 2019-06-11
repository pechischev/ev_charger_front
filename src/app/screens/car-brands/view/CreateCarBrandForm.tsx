import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { CustomForm } from "@components/custom-form";
import { autobind } from "core-decorators";
import { FormRenderProps } from "react-final-form";
import { Button } from "@components/button";
import { CreateCarBrandStore } from "./CreateCarBrandStore";
import { IVehicleBrandParams } from "@services/transport/params";
import { InputField } from "@components/fields";
import "./CarBrandForms.scss";
import { ECarBrandFields } from "./ECarBrandFields";

interface ICreateChargerForm {
    residenceId?: string;

    onClose(): void;

    onCreate(): void;
}

@autobind
export class CreateCarBrandForm extends Component<ICreateChargerForm> {
    private readonly store = new CreateCarBrandStore();

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
                <div className="modal-body create-model-fields">
                    <InputField
                        label="Brand"
                        name={ECarBrandFields.BRAND}
                        placeholder="Brand"
                    />
                </div>
                <div className="modal-footer create-model-footer">
                    <Button
                        text="Create"
                        type="primary"
                        disabled={!submitting}
                        onClick={() => api.handleSubmit()}
                    />
                    <Button
                        type="secondary"
                        text="Cancel"
                        onClick={this.props.onClose}
                    />
                </div>
            </Fragment>
        );
    }

    private async onSubmit(data: IVehicleBrandParams): Promise<void> {
        return this.store.createCarBrand(data).then(() => {
            this.props.onClose();
            this.props.onCreate();
        });
    }
}
