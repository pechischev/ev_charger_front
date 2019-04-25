import { ITokens, Nullable } from "@app/config";
import { Store } from "@components/store";
import { Transport } from "@services/transport";
import { autobind } from "core-decorators";
import { observable } from "mobx";

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
