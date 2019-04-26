import { Component, ReactNode } from "react";
import * as React from "react";
import { PaginationStore } from "@components/table/store";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { range } from "lodash";

interface ITablePaginationProps {
    store: PaginationStore;
}

@autobind
@observer
export class TablePagination extends Component<ITablePaginationProps> {

    render(): ReactNode {
        const { store } = this.props;
        const totalCount = store.getTotalCount();
        const { start, end } = store.getRange();
        return (
            <div className="row">
                <div className="col-sm-12 col-md-5">
                    <div className="dataTables_info">
                        {`Showing ${start} to ${end} of ${totalCount} entries`}
                    </div>
                </div>
                <div className="col-sm-12 col-md-7">
                    {this.renderPaginationBlock()}
                </div>
            </div>
        );
    }

    private renderPaginationBlock(): ReactNode {
        const { store } = this.props;
        const pages = range(1, store.getCountPages());
        return (
            <ul className="pagination" style={{ display: pages.length <= 1 ? "none" : "" }}>
                <li className="page-item disabled">
                    <a className="page-link" onClick={store.onPrevPage}>Previous</a>
                </li>
                {
                    pages.map((page, index) => (
                        <li className="page-item" key={index}>
                            <a className="page-link" onClick={() => store.selectPage(page)}>{page}</a>
                        </li>
                    ))
                }
                <li className="page-item">
                    <a className="page-link" onClick={store.onNextPage}>Next</a>
                </li>
            </ul>
        );
    }

}
