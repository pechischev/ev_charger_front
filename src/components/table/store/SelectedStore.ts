import { action, observable } from "mobx";

export class SelectedStore {
    @observable private selectedItems: number[] = [];

    getSelectedItems(): number[] {
        return this.selectedItems;
    }

    @action.bound
    updateSelectedItems(id: number): void {
        const selectedIndex = this.selectedItems.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(this.selectedItems, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(this.selectedItems.slice(1));
        } else if (selectedIndex === this.selectedItems.length - 1) {
            newSelected = newSelected.concat(this.selectedItems.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                this.selectedItems.slice(0, selectedIndex),
                this.selectedItems.slice(selectedIndex + 1)
            );
        }
        this.selectedItems = newSelected;
    }

    isSelected(id: number): boolean {
        return this.selectedItems.indexOf(id) !== -1;
    }
}
