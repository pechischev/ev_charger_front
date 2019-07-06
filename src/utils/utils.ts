import { Nullable } from "@app/config";
import { AppContext } from "@context";
import * as qs from "query-string";
import { get, isNil } from "lodash";
import { IRange } from "@components/table/store/IPaginationData";

export function getTypeTab(): Nullable<string> {
    let typeTab: Nullable<string> = void 0;
    if (AppContext.getHistory().location) {
        typeTab = get(
            qs.parse(AppContext.getHistory().location.search) as unknown as Nullable<string>, "type", void 0,
        );
    }
    return typeTab;
}

export function getRange(): Nullable<IRange> {
    let fromFilter: Nullable<number> = void 0;
    let toFilter: Nullable<number> = void 0;
    if (AppContext.getHistory().location) {
        const { from, to } = qs.parse(AppContext.getHistory().location.search);
        if (!!from && !!to) {
            fromFilter = parseInt(`${from}`, 10) / 1000;
            toFilter = parseInt(`${to}`, 10) / 1000;
        }
    }
    if (!isNil(fromFilter) && !isNil(toFilter)) {
        return {
            start: fromFilter,
            end: toFilter,
        };
    }
    return void 0;
}
