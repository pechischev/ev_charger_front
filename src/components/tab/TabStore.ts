import { action, observable } from "mobx";
import { ITab } from "./ITab";

export class TabStore {
    @observable private activeTab = 0;
    private items: ITab.IItem[] = [];

    setItems(items: ITab.IItem[]) {
        this.items = items;
    }

    getItems(): ITab.IItem[] {
        return this.items;
    }

    @action.bound
    setActiveTab(value: number) {
        this.activeTab = value;
        const item = this.items[value];
        if (item) {
            item.handler();
        }
    }

    getActiveTab(): number {
        return this.activeTab;
    }
}
