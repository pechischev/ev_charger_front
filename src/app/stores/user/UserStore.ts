import { ITokens, Nullable } from "@app/config";
import { Store } from "@components/store";
import { EApiRoutes, TApiResponse, Transport } from "@services/transport";
import { autobind } from "core-decorators";
import { observable } from "mobx";
import { get } from "lodash";

@autobind
export class UserStore extends Store {
    private static readonly TOKENS = "tokens";
    @observable
    private tokens?: ITokens;

    isLoggedIn(): boolean {
        return !!this.tokens;
    }

    getAdminTokens(): Nullable<ITokens> {
        return this.tokens;
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
}
