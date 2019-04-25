import { Subject } from "rxjs";

export class AppStore {
    private readonly _onSidebarClick$ = new Subject<string>();

    get onSidebarClick$(): Subject<string> {
        return this._onSidebarClick$;
    }
}
