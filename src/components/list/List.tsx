import * as React from "react";
import { Component, ReactNode } from "react";
import { ListStore } from "./ListStore";
import { autobind } from "core-decorators";
import { IColumn, Table } from "@components/table";
import { IFilter, IList } from "@components/list/interfaces";
import { EApiRoutes, TAxiosResponse, Transport } from "@services/transport";
import { AppContext } from "@context";
import { IListParams } from "@services/transport/params";
import { ListActions } from "./ListActions";
import "./List.scss";

@autobind
export abstract class List<T, P extends IList<T> = IList<T>> extends Component<P> {
    protected readonly store = new ListStore();

    constructor(props: P) {
        super(props);
        this.store.transport = new Transport(AppContext.getUserStore().getAdminTokens());
    }

    render(): ReactNode {
        const { canSearch = true, actionElement } = this.props;
        return (
            <div>
                <ListActions
                    filters={this.getFilterItems()}
                    store={this.store}
                    canSearch={canSearch}
                    actionElement={actionElement}
                />
                {this.renderList()}
            </div>
        );
    }

    componentDidMount() {
        this.store.getListData$.subscribe(this.getListData);
        this.getListData();
    }

    componentWillUnmount() {
        this.store.getListData$.unsubscribe();
    }

    protected renderList(): ReactNode {
        return (
            <Table
                data={this.store.getData()}
                columns={this.getColumns()}
                totalCount={this.store.getCount()}
                onClickRow={this.onClickRowImpl}
                onChangePage={this.onChangePage}
            />
        );
    }

    protected getFilterItems(): IFilter[] {
        return [];
    }

    protected abstract getColumns(): IColumn[];

    protected abstract getAction(data: IListParams): Promise<TAxiosResponse<EApiRoutes>>;

    protected onClickRow(item: T, event: React.MouseEvent<HTMLElement>): void {
        // can override
    }

    private onChangePage(newPage: number) {
        const {page, ...rest} = this.store.getListData();
        this.store.setListData({...rest, page: newPage});
        this.updateList();
    }

    private onClickRowImpl(item: T, event: React.MouseEvent<HTMLElement>): void {
        this.store.setSelectedItem(item);
        if (event.defaultPrevented) {
            return;
        }
        this.onClickRow(item, event);
    }

    private updateList(): void {
        this.store.getListData$.next();
    }

    private getListData() {
        this.store.updateData(this.getAction);
    }
}
