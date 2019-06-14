import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { CustomForm } from "@components/custom-form";
import { autobind } from "core-decorators";
import { FormRenderProps } from "react-final-form";
import { Button } from "@components/button";
import { CreateCarModelStore } from "./CreateCarModelStore";
import { InputField } from "@components/fields";
import { ECarModelFields } from ".";
import "./CarModelForms.scss";
import * as qs from "query-string";
import { AppContext } from "@context";
import { IItem } from "@entities/_common";

interface ICreateCarModelForm {
    onClose(): void;

    onCreate(): void;
}

@autobind
export class CreateCarModelForm extends Component<ICreateCarModelForm> {
    private readonly store = new CreateCarModelStore();

    constructor(props: ICreateCarModelForm) {
        super(props);

        this.store.init();

        if (AppContext.getHistory().location.search) {
            const { id } = qs.parse(AppContext.getHistory().location.search);
            this.store.setBrandId(id as string);
        }
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
                        label="Model"
                        name={ECarModelFields.MODEL}
                        placeholder="Model"
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
        return this.store.createCarModel(data)
            .then(() => {
                this.props.onClose();
                this.props.onCreate();
            });
    }
}
