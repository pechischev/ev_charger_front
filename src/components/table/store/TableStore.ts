import { ITableData } from "../interfaces";
import * as _ from "lodash";

export class TableStore<T> {
    private data: Array<ITableData<T>> = [];

    setData(data: T[]): void {
        const transformedData = this.transformData(data);
        if (_.isEqual(this.data, transformedData)) {
            return;
        }
        this.data = transformedData;
    }

    getData(): Array<ITableData<T>> {
        return this.data.slice();
    }

    private transformData(data: T[]): Array<ITableData<T>> {
        return data.map((item: T, index: number) => ({
            counter: index,
            item
        }));
    }
}
