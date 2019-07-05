import { ListStore } from "@components/list/ListStore";
import { ReactNode } from "react";
import { Subject } from "rxjs";
import { IRange } from "@components/table/store/IPaginationData";

export interface IList<T> {
    step?: number;
    type?: string;
    range?: IRange;
    canSearch?: boolean;
    actionElement?: ReactNode;
    canDateSearch?: boolean;
    updateList$?: Subject<void>;
    isSum?: boolean;
}

export interface IFilter {
    text: string;
    value?: string;
}

export interface IListActions<T> {
    filters: IFilter[];
    store: ListStore<T>;
    actionElement?: ReactNode;
    canSearch: boolean;
    canDateSearch?: boolean;
    type?: string;
    range?: IRange;
}
