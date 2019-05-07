import {Component, ReactNode} from "react";
import * as React from "react";
import {IColumn, ITableData} from "../interfaces";
import {autobind} from "core-decorators";
import {SelectedStore} from "@components/table/store";
import {get, isNull, isNil} from "lodash";
import * as classNames from "classnames";
import {observer} from "mobx-react";
import * as _ from "lodash";

interface ITableBodyProps<T> {
    data: Array<ITableData<T>>;
    columns: IColumn[];

    selectStore: SelectedStore;
    canSelect?: boolean;

    onClickRow?(item: T, event?: React.MouseEvent<HTMLElement>): void;
}

@autobind
@observer
export class TableBody<T> extends Component<ITableBodyProps<T>> {
    render(): ReactNode {
        const {data} = this.props;
        return (
            <tbody>{data.map(this.renderRow)}</tbody>
        );
    }

    private renderRow(data: ITableData<T>): ReactNode {
        const {columns, canSelect, selectStore} = this.props;
        const isSelected = selectStore.isSelected(data.counter);
        return (
            <tr
                key={data.counter}
                onClick={(event) => this.onClickRow(event, data)}
                data-selected={canSelect && isSelected}
                className="row_body"
                style={{display: "grid", gridTemplateColumns: this.getRowSize(columns)}}
            >
                {columns.map((column, index) => this.renderCell(data.item, column, index))}
            </tr>
        );
    }

    private getRowSize(columns: IColumn[]): string {
        let sizesRow = "";
        columns.map((value: object) => {
            const size = _.get(value, "size", "1fr");
            sizesRow = sizesRow + `minmax(${!!~size.indexOf("fr") ? "100px" : size}, ${size})` + " ";
        });
        return sizesRow;
    }

    private renderCell(item: T, column: IColumn, key: number): ReactNode {
        const {position, id, cellClass = ""} = column;
        const label = get(item, id, null);
        const node = !!column.handler && column.handler!(item) || void 0;
        const value = !isNull(label) || !isNull(node) ? node || label : "(none)";
        return (
            <td
                key={key}
                className={classNames({
                    [cellClass]: true,
                    ["cell"]: true,
                    ["cell_body"]: true,
                })}
                data-position={position}
                title={value}
            >
                {!isNil(node) ? node : <span title={value}>{value}</span>}
            </td>
        );
    }

    private onClickRow(event: React.MouseEvent<HTMLElement>, line: ITableData<T>): void {
        const {onClickRow, canSelect, selectStore} = this.props;
        if (onClickRow) {
            onClickRow(line.item, event);
            return;
        }
        if (canSelect) {
            selectStore.updateSelectedItems(line.counter);
        }
    }
}
