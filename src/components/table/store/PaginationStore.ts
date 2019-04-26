import { action, observable } from "mobx";
import { IRange } from "./IPaginationData";

export class PaginationStore {
    private static readonly STEP = 25;
    @observable private step = PaginationStore.STEP;
    @observable private position = 0;
    @observable private totalCount = 0;

    @action.bound
    setTotalCount(count: number): void {
        this.totalCount = count;
    }

    getTotalCount(): number {
        return this.totalCount;
    }

    getCountPages(): number {
        return Math.floor(this.totalCount / this.step);
    }

    @action.bound
    setStep(step: number): void {
        this.step = step;
    }

    getStep(): number {
        return this.step;
    }

    getRange(): IRange  {
        const end = Math.min(this.step + this.position, this.totalCount);
        return {
            start: this.position,
            end,
        };
    }

    @action.bound
    onBeginPage(): void {
        if (this.position === 0) {
            return;
        }
        this.position = 0;
    }

    @action.bound
    onNextPage(): void {
        const range = this.getRange();
        if (range.end === this.totalCount) {
            return;
        }
        this.position = this.position + this.step;
    }

    @action.bound
    onPrevPage(): void {
        const range = this.getRange();
        if (range.start === 0) {
            return;
        }
        this.position = Math.max(this.position - this.step, 0);
    }

    @action.bound
    onEndPage(): void {
        const range = this.getRange();
        if (range.end === this.totalCount) {
            return;
        }
        const position = this.step * this.getCountPages();
        this.position = position === this.totalCount ? position - this.step : position;
    }

    getCurrentPage(): number {
        return Math.floor(this.totalCount / this.step);
    }

    @action.bound
    selectPage(page: number): void {
        const currentPage = this.getCurrentPage();
        if (currentPage === page) {
            return;
        }
        this.position = Math.min(page * this.step, this.totalCount);
    }
}
