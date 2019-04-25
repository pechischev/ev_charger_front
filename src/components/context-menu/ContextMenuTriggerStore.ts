import { action, observable } from "mobx";

export class ContextMenuTriggerStore {
    @observable private disabled = false;

    getDisabled(): boolean {
        return this.disabled;
    }

    @action.bound
    setDisabled(value: boolean): void {
        this.disabled = value;
    }
}
