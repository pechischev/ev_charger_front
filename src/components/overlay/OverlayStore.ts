import { Nullable } from "@app/config";
import { autobind } from "core-decorators";
import { observable } from "mobx";

@autobind
export class OverlayStore {
    static readonly SCROLL_THUMB = "scroll__thumb-vertical";
    @observable
    private lastActiveElement: Nullable<EventTarget>;

    setLastActiveElement(value: EventTarget): void {
        this.lastActiveElement = value;
    }

    getLastActiveElement(): Nullable<EventTarget> {
        return this.lastActiveElement;
    }

    @observable
    private isOpened = false;

    changeOpenState(value: boolean): void {
        this.isOpened = value;
    }

    getIsOpened(): boolean {
        return this.isOpened;
    }

    @observable
    private _canChangeState = true;

    get canChangeState(): boolean {
        return this._canChangeState;
    }

    set canChangeState(value: boolean) {
        this._canChangeState = value;
    }

    // tslint:disable:no-any
    onClickElement(event: any): void {
        console.log("123");
        if (!event.target) {
            return;
        }
        this._canChangeState = event.target.className !== OverlayStore.SCROLL_THUMB;
        console.log(event.target.className, this._canChangeState);
    }
}
