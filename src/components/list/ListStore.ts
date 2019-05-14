import { action, observable } from "mobx";
import { Subject } from "rxjs";
import { IListParams } from "@services/transport/params";
import { Store } from "@components/store";
import { Nullable } from "@app/config";
import * as _ from "lodash";
import { AxiosResponse } from "axios";
import { IListResponse } from "@services/transport/responses";
import { autobind } from "core-decorators";
import { PaginationStore } from "@components/table/store";

@autobind
export class ListStore<T> extends Store {
    private readonly _getListData$ = new Subject<IListParams>();
    @observable private listItem?: T;
    @observable private listData: IListParams = { limit: PaginationStore.STEP, page: 0 };
    @observable private count = 0;
    @observable private data: T[] = [];

    get getListData$(): Subject<IListParams> {
        return this._getListData$;
    }

    @action.bound
    setListData(data: IListParams): void {
        this.listData = data;
    }

    getListData(): IListParams {
        return this.listData;
    }

    @action.bound
    setCount(count: number): void {
        this.count = count;
    }

    getCount(): number {
        return this.count;
    }

    @action.bound
    setData(data: T[]): void {
        this.data = data;
    }

    getData(): T[] {
        return this.data;
    }

    @action.bound
    setSelectedItem(listItem?: T): void {
        this.listItem = listItem;
    }

    getSelectedItem(): Nullable<T> {
        return this.listItem as Nullable<T>;
    }

    async updateData<U extends AxiosResponse>(action: (params: IListParams) => Promise<U>, type?: string): Promise<void> {
        const params: IListParams = {
            ...this.listData,
            type,
        };
        return this.asyncCall(action(params), this.onError).then(this.onSuccessUpdateData);
    }

    private onSuccessUpdateData(response: AxiosResponse<IListResponse<T>>): void {
        console.log("[ListStore.onSuccessUpdateData]: ", response);
        const data = _.get(response, "data");
        this.setCount(_.get(data, "count", 0));
        this.setData(_.get(data, "rows", []));
    }
}
