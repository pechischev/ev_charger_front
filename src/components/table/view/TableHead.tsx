import * as React from "react";
import { Component, ReactNode } from "react";
import { IColumn, ITableHead } from "../interfaces";
import { autobind } from "core-decorators";
import * as classNames from "classnames";
import { Table } from "@components/table";

@autobind
export class TableHead<T> extends Component<ITableHead<T>> {
    render(): ReactNode {
        const { columns } = this.props;
        return (
            <thead>
                <tr
                    className="row_header"
                    style={{ display: "grid", gridTemplateColumns: Table.getRowSize(columns) }}
                >
                    {columns.map(this.renderCell)}
                </tr>
            </thead>
        );
    }

    private renderCell(column: IColumn<T>): ReactNode {
        const { id, label, canSort, cellClass = "" } = column;
        const classes = classNames({
            [cellClass]: true,
        });
        return (
            <th
                className={`cell cell_header ${classes}`}
                key={id}
                onClick={() => this.sorted(id, canSort)}
                title={label}
            >
                {label}
            </th>
        );
    }

    private sorted(id: string, canSort: boolean = true): void {
        if (!canSort) {
            return;
        }
        this.props.sortHandler(id);
    }
}
