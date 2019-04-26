import { Component, ReactNode } from "react";
import * as React from "react";
import { Form, FormRenderProps } from "react-final-form";
import { FormApi, FormState } from "final-form";
import { Nullable } from "@app/config";
import { autobind } from "core-decorators";
import { toJS } from "mobx";
import { stubObject, isEmpty, isObject, merge, values } from "lodash";
import { IValidateData } from "./IValidateData";

export interface ICustomFormProps<T extends object> {
    data?: T;
    validateOnBlur?: boolean;
    keepDirtyOnReinitialize?: boolean;

    render(api: FormRenderProps, submitting?: boolean): ReactNode;
    submit(data: T, form?: FormApi): Promise<Nullable<object>> | object | void;

    validateData?(values: object): IValidateData[];
    validate?(errors: object, values: object): object;
}

@autobind
export class CustomForm<T extends object> extends Component<ICustomFormProps<T>> {
    render(): ReactNode {
        const {render, data, validateOnBlur, keepDirtyOnReinitialize = true} = this.props;

        return (
            <Form
                onSubmit={this.onSubmit}
                validate={this.onValidate}
                initialValues={toJS(data || stubObject())}
                render={(api: FormRenderProps) => render(api, this.submitting(api.form.getState()))}
                {...{validateOnBlur, keepDirtyOnReinitialize}}
            />
        );
    }

    private onSubmit(values: FormData, form: FormApi, callback?: (errors?: object) => void):
        Promise<Nullable<object>> | object | void
    {
        const {submit} = this.props;
        return submit(values as T, form);
    }

    private onValidate(values: object): object | Promise<object> {
        let errors = {};
        const {validate} = this.props;
        if (validate) {
            errors = merge(errors, validate(errors, values));
        }
        return errors;
    }

    private submitting(api: FormState): boolean {
        const hasErrors = this.hasErrors(api.errors);
        const hasServerError = !api.dirtySinceLastSubmit && !!api.submitErrors;
        const pristine = api.pristine;
        return !(api.submitting || pristine || hasErrors || hasServerError);
    }

    private hasErrors(errors: object): boolean {
        return !!values(errors).find((value: any) => (isObject(value)) ? this.hasErrors(value) : !isEmpty(value));
    }
}
