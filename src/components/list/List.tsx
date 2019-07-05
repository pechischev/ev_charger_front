import * as React from "react";
import { Component, ReactNode, Fragment } from "react";
import { ListStore } from "./ListStore";
import { autobind } from "core-decorators";
import { IColumn, Table } from "@components/table";
import { IFilter, IList } from "@components/list/interfaces";
import { EApiRoutes, TAxiosResponse, Transport } from "@services/transport";
import { AppContext } from "@context";
import { IListParams } from "@services/transport/params";
import { ListActions } from "./ListActions";
import "./List.scss";
import { isNumber, get, isNil } from "lodash";

@autobind
export abstract class List<T, P extends IList<T> = IList<T>> extends Component<P> {
    protected readonly store = new ListStore<T>();

    constructor(props: P) {
        super(props);
        this.store.transport = new Transport(AppContext.getUserStore().getAdminTokens());
    }

    render(): ReactNode {
        return this.renderList();
    }

    componentDidMount(): void {
        const {updateList$, step, type, range } = this.props;
        if (updateList$) {
            updateList$.subscribe(this.getListData);
        }
        if (isNumber(step)) {
            this.store.setLimit(step);
        }
        if (!!type && !isNil(type) && !isNaN(type)) {
            this.store.setFilter(type);
        }
        if (!!range && get(range, "start") !== 0 && get(range, "end") !== 0) {
            this.store.setDateRange(range);
        }
        this.store.getListData$.subscribe(this.getListData);
        this.getListData();
    }

    componentWillUnmount(): void {
        const {updateList$} = this.props;
        if (updateList$) {
            updateList$.unsubscribe();
        }
        this.store.getListData$.unsubscribe();
    }

    protected renderList(): ReactNode {
        const { canSearch = true, canDateSearch = false, actionElement, isSum = false, range, type } = this.props;
        return (
            <Fragment>
                <ListActions
                    filters={this.getFilterItems()}
                    store={this.store}
                    canSearch={canSearch}
                    actionElement={actionElement}
                    canDateSearch={canDateSearch}
                    range={range}
                    type={type}
                />
                <Table
                    data={this.store.getData()}
                    columns={this.getColumns()}
                    totalCount={this.store.getCount()}
                    onClickRow={this.onClickRowImpl}
                    onChangePage={this.onChangePage}
                    rowsPerPage={this.props.step}
                    isSum={isSum}
                />
            </Fragment>
        );
    }

    protected getFilterItems(): IFilter[] {
        return [];
    }

    protected abstract getColumns(): Array<IColumn<T>>;

    protected async abstract getAction(data: IListParams): Promise<TAxiosResponse<EApiRoutes>>;

    protected onClickRow(item: T, event: React.MouseEvent<HTMLElement>): void {
        // can override
    }

    protected updateList(): void {
        this.store.getListData$.next();
    }

    private onChangePage(newPage: number): void {
        const {page, ...rest} = this.store.getListData();
        this.store.setListData({...rest, page: newPage});
        this.updateList();
    }

    private onClickRowImpl(item: T, event: React.MouseEvent<HTMLElement>): void {
        this.store.setSelectedItem(item);
        if (event.defaultPrevented || event.isPropagationStopped()) {
            return;
        }
        this.onClickRow(item, event);
    }

    private getListData(): void {
        this.store.updateData(this.getAction);
    }
}
