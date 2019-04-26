import { Component, ReactNode } from "react";
import { ITable } from "@components/table/interfaces";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { PaginationStore, SelectedStore, SortStore, TableStore } from "./store";
import * as React from "react";
import { TableBody, TableHead, TablePagination } from "@components/table/view";
import "./Table.scss";

@autobind
@observer
export class Table<T> extends Component<ITable<T>> {
    private readonly store = new TableStore<T>();
    private readonly sortStore = new SortStore();
    private readonly paginationStore = new PaginationStore();
    private readonly selectStore = new SelectedStore();

    constructor(props: ITable<T>) {
        super(props);
        this.store.setData(props.data);
    }

    componentWillReceiveProps(nextProps: ITable<T>): void {
        this.store.setData(nextProps.data);
        this.paginationStore.setTotalCount(nextProps.totalCount || nextProps.data.length);
    }

    render(): ReactNode {
        const { columns, canSelect, onClickRow } = this.props;
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered" style={{width: "100%"}}>
                    <TableHead
                        order={this.sortStore.getOrder()}
                        orderBy={this.sortStore.getOrderBy()}
                        columns={columns}
                        sortHandler={this.onSort}
                    />
                    <TableBody
                        selectStore={this.selectStore}
                        data={this.store.getData()}
                        {...{canSelect, onClickRow, columns}}
                    />
                </table>
                <TablePagination store={this.paginationStore}/>
            </div>
        );
    }

    private onSort(id: string): void {
        const { onChangeSort } = this.props;
        this.sortStore.changeOrderBy(id);
        if (onChangeSort) {
            onChangeSort(this.sortStore.getOrderBy(), this.sortStore.getOrder());
        }
        this.paginationStore.onBeginPage();
    }
}
