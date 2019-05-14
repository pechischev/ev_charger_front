import { ListStore } from "@components/list/ListStore";

export interface IList<T> {

}

export interface IFilter {
    text: string;
    value?: string;
}

export interface IListActions<T> {
    filters: IFilter[];

    store: ListStore<T>;
}
