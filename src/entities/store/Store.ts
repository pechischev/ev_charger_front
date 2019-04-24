import { IStore, TValue } from "@entities/store";

export abstract class Store implements IStore {
    abstract getValue(): TValue;

    protected setValueImpl?(value: string): void;
}
