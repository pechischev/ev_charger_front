import { action, observable } from "mobx";

export class UiStore {
    @observable private readonly isLoading = false;

    @action.bound
    getLoadingState(): boolean {
        return this.isLoading;
    }
}
