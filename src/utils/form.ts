import { FieldErrors } from "@app/config";
import * as _ from "lodash";
import { FieldRenderProps } from "react-final-form";

function isEmptyField(value: string | number): boolean {
    value = _.isNumber(value) ? value.toString() : value;
    return _.isEmpty(value);
}

export function getFieldErrorByCode(codes: number[], value: any): string {
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
