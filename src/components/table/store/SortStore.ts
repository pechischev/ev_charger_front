import { action, observable } from "mobx";
import { ESortState } from "../interfaces";

export class SortStore {
    @observable private order = ESortState.ASC;
    @observable private orderBy = "";

    getOrder(): ESortState {
        return this.order;
    }

    getOrderBy(): string {
        return this.orderBy;
    }

    @action.bound
    changeOrderBy(property: string) {
        this.order = (this.orderBy === property && this.order === ESortState.DESC) ? ESortState.ASC : ESortState.DESC;
        this.orderBy = property;
    }
}
