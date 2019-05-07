import * as React from "react";
import {Component, ReactNode} from "react";
import {PaginationStore} from "@components/table/store";
import {observer} from "mobx-react";
import {autobind} from "core-decorators";
import {range} from "lodash";

interface ITablePaginationProps {
    store: PaginationStore;
}

@autobind
@observer
export class TablePagination extends Component<ITablePaginationProps> {
    render(): ReactNode {
        const {store} = this.props;
        const totalCount = store.getTotalCount();
        const {start, end} = store.getRange();
        return (
            <div className="table-pagination clearfix">
                <div className="table-pagination-indicator float-left">
                    <div className="dataTables_info">
                        {`Showing ${start} to ${end} of ${totalCount} entries`}
                    </div>
                </div>
                <div className="table-pagination-main float-right">
                    {this.renderPaginationBlock()}
                </div>
            </div>
        );
    }

    private renderPaginationBlock(): ReactNode {
        const {store} = this.props;
        const pages = range(0, store.getCountPages());
        return (
            <ul className="pagination" data-hidden={pages.length <= 1}>
                <li className="page-item disabled">
                    <a className="page-link" onClick={store.onPrevPage}>Previous</a>
                </li>
                {
                    pages.map((page, index) => (
                        <li className="page-item" key={index}>
                            <a className="page-link" onClick={() => store.selectPage(page)}>{page + 1}</a>
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
