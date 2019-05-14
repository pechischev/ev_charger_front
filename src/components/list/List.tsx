import * as React from "react";
import { Component, ReactNode } from "react";
import { ListStore } from "./ListStore";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Table } from "@components/table";
import { IList } from "@components/list/interfaces";
import { Transport } from "@services/transport";
import { AppContext } from "@context";

@observer
@autobind
export class List<T> extends Component<IList<T>> {
    private readonly store = new ListStore();

    constructor(props: IList<T>) {
        super(props);
        this.store.transport = new Transport(AppContext.getUserStore().getAdminTokens());
    }

    render(): ReactNode {
        return (
            <Table
                data={this.store.getData()}
                columns={this.props.columns}
                totalCount={this.store.getCount()}
                onClickRow={this.onClickRow}
                onChangePage={this.onChangePage}
            />
        );
    }

    componentDidMount() {
        this.store.getListData$.subscribe(this.getListData);
        this.getListData();

        this.props.updateList$.subscribe(this.updateList);
    }

    componentWillUnmount() {
        this.props.updateList$.unsubscribe();
        this.store.getListData$.unsubscribe();
    }

    componentDidUpdate(prevProps: IList<T>) {
        if (prevProps.type !== this.props.type) {
            this.updateList();
        }
        if (prevProps.search !== this.props.search) {
            this.updateList();
        }
    }

    protected onClickRowImpl(item: T, event: React.MouseEvent<HTMLElement>): void {
        // can override
    }

    private onChangePage(newPage: number) {
        const { page, ...rest } = this.store.getListData();
        this.store.setListData({ ...rest, page: newPage });
        this.updateList();
    }

    private onClickRow(item: T, event: React.MouseEvent<HTMLElement>): void {
        this.store.setSelectedItem(item);
        const { onChangeSelectionItem } = this.props;
        if (onChangeSelectionItem) {
            onChangeSelectionItem(item);
        }
        if (event.defaultPrevented) {
            return;
        }
        this.onClickRowImpl(item, event);
    }

    private updateList(): void {
        this.store.getListData$.next();
    }

    private getListData() {
        const { type, search } = this.props;
        this.store.updateData(this.props.getList, type, search);
    }
}
