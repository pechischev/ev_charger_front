import { Nullable } from "@app/config";

export type TValue = object | string | boolean;

export interface IStore {
    getValue(): Nullable<TValue>;
}
