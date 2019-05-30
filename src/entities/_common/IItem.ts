export interface IItem {
    id: number | string;
    title: string;
}

export interface IValueType<T = string | object> {
    label: string;
    value: T;
}
