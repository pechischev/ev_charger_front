import * as React from "react";
import { Component, ReactNode } from "react";
import { IColumn, ITableData } from "../interfaces";
import { autobind } from "core-decorators";
import { SelectedStore } from "@components/table/store";
import { get, isNil, isNull } from "lodash";
import * as classNames from "classnames";
import { observer } from "mobx-react";
import { Table } from "@components/table";
import { parseAmountFieldValue } from "@utils";
import { IItem } from "@entities/_common";

interface ITableBodyProps<T> {
    data: Array<ITableData<T>>;
    columns: Array<IColumn<T>>;
    isSum?: boolean;

    selectStore: SelectedStore;
    canSelect?: boolean;

    onClickRow?(item: T, event?: React.MouseEvent<HTMLElement>): void;
}

@autobind
@observer
export class TableBody<T> extends Component<ITableBodyProps<T>> {
    render(): ReactNode {
        const { data } = this.props;
        return (
            <tbody>
                {data.map(this.renderRow)}
                {this.renderSummaryRow()}
            </tbody>
        );
    }

    private renderRow(data: ITableData<T>): ReactNode {
        const { columns, canSelect, selectStore } = this.props;
        const isSelected = selectStore.isSelected(data.counter);
        return (
            <tr
                key={data.counter}
                onClick={(event) => this.onClickRow(event, data)}
                data-selected={canSelect && isSelected}
                className="row_body"
                style={{ display: "grid", gridTemplateColumns: Table.getRowSize(columns) }}
            >
                {columns.map((column, index) => this.renderCell(data.item, column, index))}
            </tr>
        );
    }

    private renderCell(item: T, column: IColumn<T>, key: number): ReactNode {
        const { position, id, cellClass = "" } = column;
        const label = get(item, id, void 0);
        const node = !!column.handler && column.handler(item) || void 0;
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
            >
                {!isNil(node) ? node : <span title={value}>{value}</span>}
            </td>
        );
    }

    private onClickRow(event: React.MouseEvent<HTMLElement>, line: ITableData<T>): void {
        const { onClickRow, canSelect, selectStore } = this.props;
        if (onClickRow) {
            onClickRow(line.item, event);
            return;
        }
        if (canSelect) {
            selectStore.updateSelectedItems(line.counter);
        }
    }

    private renderSummaryRow(): ReactNode {
        const { data, columns, isSum } = this.props;
        if (!isSum) {
            return void 0;
        }
        let amount = 0;
        let serviceFee = 0;
        const tableRow: IItem[] = [];
        data.forEach((column, index) => {
            const localAmount = get(column.item, "amount", 0);
            amount = amount + localAmount;
            const localServiceFee = get(column.item, "serviceFee", 0);
            serviceFee = serviceFee + localServiceFee;
        });
        amount = Math.round(amount * 100) / 100;
        serviceFee = Math.round(serviceFee * 100) / 100;
        columns.forEach((item, index) => {
            tableRow.push(
                {
                    id: item.id,
                    title: this.switchValueById(item.id, amount, serviceFee),
                },
            );
        });
        return (
            <tr
                className="row_body"
                style={{ display: "grid", gridTemplateColumns: Table.getRowSize(columns) }}
            >
                {
                    tableRow.map((item, index) => {
                        return (
                            <td
                                key={index}
                                className={classNames({
                                    ["cell_summary"]: true,
                                    ["cell"]: true,
                                    ["cell_body"]: true,
                                })}
                            >
                                <span>
                                    {index >= tableRow.length - 2 ? "$ " : ""}
                                    {index >= tableRow.length - 2
                                        ?
                                        parseAmountFieldValue(get(item, "title", ""))
                                        :
                                        get(item, "title", "")
                                    }
                                </span>
                            </td>
                        );
                    })
                }
            </tr>
        );
    }

    private switchValueById(id: string, amount: number, serviceFee: number): string {
        switch (id) {
            case "status":
                return "Summary:";
            case "amount":
                return amount.toString();
            case "serviceFee":
                return serviceFee.toString();
            default:
                return "";
        }
    }
}
