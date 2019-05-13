import { Store } from "@components/store";
import { ILoginParams } from "@services/transport/params";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { Subject } from "rxjs";
import { autobind } from "core-decorators";

@autobind
export class LoginStore extends Store {
    private readonly _login$ = new Subject<object>();

    get login$(): Subject<object> {
        return this._login$;
    }

    async login(data: ILoginParams): Promise<void> {
        return this.asyncCall(
            this.transport.login(data),
            this.onError,
        ).then(this.onSuccessLogin);
    }

    private onSuccessLogin(response: TAxiosResponse<EApiRoutes.SIGN_IN>): void {
        this._login$.next(response.data);
    }
}
