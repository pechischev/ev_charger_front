import * as React from "react";
import { Component, ReactNode } from "react";
import { Form, FormRenderProps } from "react-final-form";
import { FormApi, FormState } from "final-form";
import { FieldErrors, Nullable } from "@app/config";
import { autobind } from "core-decorators";
import { toJS } from "mobx";
import { isEmpty, isObject, merge, stubObject, values } from "lodash";
import { Subject } from "rxjs";
import { IError } from "@entities/error";
import { IFieldError } from "@app/config/IFieldError";

export interface ICustomFormProps<T extends object> {
    data?: T;
    validateOnBlur?: boolean;
    keepDirtyOnReinitialize?: boolean;

    error$?: Subject<IError>;

    render(api: FormRenderProps, submitting?: boolean): ReactNode;

    submit(data: T, form?: FormApi): Promise<Nullable<object>> | object | void;

    validateData?(values: object): IFieldError[];

    validate?(errors: object, values: object): object;
}

@autobind
export class CustomForm<T extends object> extends Component<ICustomFormProps<T>> {
    private errors: Nullable<object> = void 0;

    componentDidMount(): void {
        const {error$} = this.props;
        if (error$) {
            error$.subscribe(this.setError)
        }
    }

    componentWillUnmount(): void {
        const {error$} = this.props;
        if (error$) {
            error$.unsubscribe()
        }
    }

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
        Promise<Nullable<object>> | object | void {
        const {submit} = this.props;
        return new Promise((resolve) => resolve(values)).then(async (data) => {
            return submit(data as T, form);
        }).catch(() => {
            if (callback && !isEmpty(this.errors)) {
                return callback(this.errors);
            }
        });
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

    private setError(error: IError): void {
        const fieldTypes = FieldErrors.getTypesByCode(error.code || error.status);
        const errors = {};
        for (const type of fieldTypes) {
            errors[type] = FieldErrors.getTextError(error.code) || error.title;
        }
        this.errors = errors;
    }
}
