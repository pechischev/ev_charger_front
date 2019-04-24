import { action, observable } from "mobx";

export class CustomScrollbarStore {
    static DEFAULT_HEIGHT = 200;
    @observable private maxHeight = 0;

    @action.bound
    setMaxHeight(height: number): void {
        this.maxHeight = height;
    }

    getMaxHeight(): number {
        return this.maxHeight;
    }
}
