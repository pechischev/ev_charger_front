import { FieldErrors } from "@app/config";
import * as _ from "lodash";
import { FieldRenderProps } from "react-final-form";

function isEmptyField(value: string | number): boolean {
    const currentValue = _.isNumber(value) ? value.toString() : value;
    return _.isEmpty(currentValue);
}

export function getFieldErrorByCode<T>(codes: number[], value: string | number): string {
    // TODO: should get all codes
    const code = codes.length ? codes[0] : 0;
    if (isEmptyField(value)) {
        return FieldErrors.getTextError(code);
    }
    return "";
}

export function getError(state: Pick<FieldRenderProps<HTMLElement>, "meta">, type?: string): string {
    const { meta } = state;
    if (type === "date") {
        if (!meta.dirty) {
            return "";
        }
    }
    if (!meta.visited || meta.active) {
        return "";
    }
    return meta.error || !meta.dirtySinceLastSubmit && meta.submitError;
}

export function formatValue(value: string, maxLength?: number): string {
    if (!value) {
        return value;
    }
    if (maxLength && value.length === maxLength) {
        return value.substring(0, value.length - 1);
    }
    return value;
}
