import { Store } from "@components/store";
import { autobind } from "core-decorators";
import { AppContext } from "@context";
import { EPaths } from "@app/config";

@autobind
export class HeaderStore extends Store {
    logout() {
        AppContext.getUserStore().logout();
        AppContext.getHistory().push(`/${EPaths.LOGIN}`);
    }
}
