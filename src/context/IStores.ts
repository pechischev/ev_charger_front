import { AppStore } from "@app/stores/app";
import { UiStore } from "@app/stores/ui";
import { UserStore } from "@app/stores/user";

export interface IStores {
    appStore?: AppStore;
    uiStore?: UiStore;
    userStore?: UserStore;
}
