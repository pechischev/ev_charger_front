import { ITokens, Nullable } from "@app/config";
import { Store } from "@components/store";
import { EApiRoutes, TApiResponse, TAxiosResponse, Transport } from "@services/transport";
import { autobind } from "core-decorators";
import { action, observable } from "mobx";
import { get } from "lodash";
import { Subject } from "rxjs";
import { AuthUser } from "@entities/user";

@autobind
export class UserStore extends Store {
    private static readonly TOKENS = "tokens";
    @observable private tokens?: ITokens;
    @observable private user?: AuthUser;
    private readonly profile$ = new Subject<AuthUser>();

    isLoggedIn(): boolean {
        return !!this.tokens;
    }

    getAdminTokens(): Nullable<ITokens> {
        return this.tokens;
    }

    getUser(): Nullable<AuthUser> {
        return this.user;
    }

    /**
     * @throws SyntaxError
     */
    fetchAdminTokens(response: TApiResponse<EApiRoutes.SIGN_IN>): void {
        type TResponseData = TApiResponse<EApiRoutes.SIGN_IN>;
        const accessToken = get<TResponseData, "accessToken">(response, "accessToken");
        /*const refreshToken = get<TResponseData, "refreshToken">(data, "refreshToken");*/
        const tokens: ITokens = { accessToken };
        localStorage.setItem(UserStore.TOKENS, JSON.stringify(tokens));
        this.login();
    }

    logout(): void {
        if (!this.isLoggedIn()) {
            return;
        }
        this.tokens = void 0;
        localStorage.removeItem(UserStore.TOKENS);
    }

    login(): void {
        const tokensString = localStorage.getItem(UserStore.TOKENS);
        if (!tokensString) {
            return;
        }
        const tokens = JSON.parse(tokensString);
        this.transport = new Transport(tokens);
        this.tokens = tokens;
    }

    updateProfile(): void {
        this.asyncCall(this.transport.profile()).then(this.onUpdateProfile);
    }

    @action.bound
    private onUpdateProfile(response: TAxiosResponse<EApiRoutes.PROFILE>): void {
        console.info("[UserStore.onUpdateProfile]", response);
        const data = get<TAxiosResponse<EApiRoutes.PROFILE>, "data">(response, "data");
        this.user = new AuthUser(data);
        this.profile$.next(this.user);
    }
}
