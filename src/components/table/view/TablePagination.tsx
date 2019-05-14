import * as React from "react";
import { Component, ReactNode } from "react";
import { PaginationStore } from "@components/table/store";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { range } from "lodash";

interface ITablePaginationProps {
    store: PaginationStore;

    onChangePage?(page: number): void;
}

@observer
@autobind
export class TablePagination extends Component<ITablePaginationProps> {
    render(): ReactNode {
        const { store } = this.props;
        const totalCount = store.getTotalCount();
        const { start, end } = store.getRange();

        return (
            <div className="table-pagination clearfix">
                <div className="table-pagination-indicator float-left">
                    <div className="data-tables_info">
                        {`Showing ${!!totalCount ? start + 1 : 0} to ${end} of ${totalCount} entries`}
                    </div>
                </div>
                <div className="table-pagination-main float-right">
                    {this.renderPaginationBlock()}
                </div>
            </div>
        );
    }

    private renderPaginationBlock(): ReactNode {
        const { store } = this.props;
        const pages = range(0, store.getCountPages());
        const { start, end } = store.getRange();
        return (
            <ul className="pagination" data-hidden={pages.length <= 1}>
                <li className={`page-item ${start === 0 ? "disabled" : "none"} `}>
                    <a className="page-link" onClick={this.onPrevPage}>Previous</a>
                </li>
                {
                    pages.map((page, index) => (
                        <li className="page-item" key={index} data-active={this.isCurrentPage(page)}>
                            <a className="page-link" onClick={() => this.changePage(page)}>{page + 1}</a>
                        </li>
                    ))
                }
                <li className={`page-item ${end === store.getTotalCount() ? "disabled" : "none"} `}>
                    <a className="page-link" onClick={this.onNextPage}>Next</a>
                </li>
            </ul>
        );
    }

    private changePage(page: number): void {
        const { store, onChangePage } = this.props;
        store.selectPage(page);
        if (onChangePage) {
            onChangePage(page);
        }
    }

    private onNextPage(): void {
        const { store } = this.props;
        this.changePage(store.getCurrentPage + 1);
    }

    private onPrevPage(): void {
        const { store } = this.props;
        this.changePage(store.getCurrentPage - 1);
    }

    private isCurrentPage(page: number): boolean {
        const { store } = this.props;
        return store.getCurrentPage === page;
    }
}
