import { Component, Fragment, ReactNode } from "react";
import { autobind } from "core-decorators";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { Button } from "@components/button";
import * as React from "react";
import { SelectField } from "@components/fields";
import { BindOperatorFormStore, IOperatorFormData } from "./BindOperatorFormStore";
import { observer } from "mobx-react";
import { EBindOperatorFieldTypes } from "./EBindOperatorFieldTypes";

interface IBindOperatorForm {
    workerId?: number;

    onClose(): void;

    onEdit(): void;
}

@observer
@autobind
export class BindOperatorForm extends Component<IBindOperatorForm> {
    private readonly store = new BindOperatorFormStore();

    constructor(props: IBindOperatorForm) {
        super(props);

        this.store.init();
        this.store.getOperators(this.props.workerId).then(() => this.forceUpdate());
    }

    render(): ReactNode {
        return (
            <CustomForm
                validateData={this.store.validateData}
                render={this.renderFields}
                submit={this.onSubmit}
            />
        );
    }

    private renderFields(api: FormRenderProps, submitting: boolean): ReactNode {
        return (
            <Fragment>
                <div className={"modal-body"}>
                    <SelectField
                        name={EBindOperatorFieldTypes.OPERATOR}
                        options={this.store.operators}
                        label={"Select operator"}
                    />
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

    private async onSubmit(data: IOperatorFormData): Promise<void> {
        return this.store.bindOperator(data, this.props.workerId).then(() => {
            this.props.onClose();
            this.props.onEdit();
        });
    }
}
