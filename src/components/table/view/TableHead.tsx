import {Component, ReactNode} from "react";
import {IColumn, ITableHead} from "../interfaces";
import * as React from "react";
import {autobind} from "core-decorators";
import * as classNames from "classnames";
import * as _ from "lodash";

@autobind
export class TableHead extends Component<ITableHead> {
    render(): ReactNode {
        const {columns} = this.props;
        return (
            <thead>
                <tr
                    className="row_header"
                    style={{display: "grid", gridTemplateColumns: this.getRowSize(columns)}}
                >
                    {columns.map(this.renderCell)}
                </tr>
            </thead>
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

    private renderCell(column: IColumn): ReactNode {
        const {id, label, canSort, cellClass = ""} = column;
        const classes = classNames({
            [cellClass]: true,
        });
        return (
            <th
                className={`cell cell_header ${classes}`}
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
