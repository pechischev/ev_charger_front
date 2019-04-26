import { Component, ReactNode } from "react";
import { IColumn, ITableHead } from "../interfaces";
import * as React from "react";
import { autobind } from "core-decorators";
import * as classNames from "classnames";

@autobind
export class TableHead extends Component<ITableHead> {
    render(): ReactNode {
        const { columns} = this.props;
        return (
            <thead>
                <tr>
                    {columns.map(this.renderCell)}
                </tr>
            </thead>
        );
    }

    private renderCell(column: IColumn): ReactNode {
        const {id, label, canSort, cellClass = ""} = column;
        const classes = classNames({
            [cellClass]: true,
        });
        return (
            <th
                className={classes}
                key={id}
                onClick={() => this.sorted(id, canSort)}
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
