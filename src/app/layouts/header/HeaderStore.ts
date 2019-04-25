import { Nullable } from "@app/config";
import { Store } from "@components/store";
import { AppContext } from "@context";
import { action, observable } from "mobx";
import { Subject } from "rxjs";
import { autobind } from "core-decorators";

@autobind
export class HeaderStore extends Store {

    @observable
    private isVisiblePopup = false;
    private readonly logoutSubject = new Subject<void>();
    private readonly _saveData$ = new Subject<void>();

    @observable
    private _avatarSrc?: string;

    get avatarSrc(): Nullable<string> {
        return this._avatarSrc;
    }

    set avatarSrc(value: Nullable<string>) {
        this._avatarSrc = value;
    }

    get saveData$(): Subject<void> {
        return this._saveData$;
    }

    getLogoutSubject(): Subject<void> {
        return this.logoutSubject;
    }

    getOptions(): any[] {
        return [];
    }

    getVisiblePopup(): boolean {
        return this.isVisiblePopup;
    }

    @action.bound
    setVisiblePopup(value: boolean): void {
        this.isVisiblePopup = value;
    }

    emitUrl(): void {
        const tokens = AppContext.getUserStore().getAdminTokens();
        if (!tokens) {
            return;
        }
    }

    cancelLogout(): void {
        this.setVisiblePopup(false);
    }
}
