import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { CustomForm } from "@components/custom-form";
import { autobind } from "core-decorators";
import { FormRenderProps } from "react-final-form";
import { Button } from "@components/button";
import { EditCarBrandFormStore } from "./EditCarBrandFormStore";
import { InputField } from "@components/fields";
import { ECarModelFields } from ".";
import "./CarModelForms.scss";
import { IItem } from "@entities/_common";

interface IEditCarModelForm {
    brandId?: number;
    data?: IItem;

    onClose(): void;

    onEdit(): void;
}

@autobind
export class EditCarBrandForm extends Component<IEditCarModelForm> {
    private readonly store = new EditCarBrandFormStore();

    constructor(props: IEditCarModelForm) {
        super(props);

        this.store.init();
    }

    render(): ReactNode {
        return (
            <CustomForm
                keepDirtyOnReinitialize={false}
                data={this.store.transformData(this.props.data)}
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
                        name={ECarModelFields.MODEL}
                        placeholder="Brand"
                    />
                </div>
                <div className="modal-footer create-model-footer">
                    <Button
                        text="Create"
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

    private async onSubmit(data: Pick<IItem, "title">): Promise<void> {
        return this.store.updateCarBrand({
            ...data,
            brandId: this.props.brandId
        })
            .then(() => {
                this.props.onClose();
                this.props.onEdit();
            });
    }
}
