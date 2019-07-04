import { EPaths } from "@app/config";
import { AppStore } from "@app/stores/app";
import { UiStore } from "@app/stores/ui";
import { UserStore } from "@app/stores/user";
import { createBrowserHistory, History } from "history";
import { InfoStore } from "@app/stores/info";
import { SideBarStore } from "@app/stores/side-bar";

const history = createBrowserHistory();

export const stores = {
    appStore: new AppStore(),
    uiStore: new UiStore(),
    userStore: new UserStore(),
    infoStore: new InfoStore(),
    sideBarStore: new SideBarStore(),
};

const INDIRECT_PATHS = [
    `/${EPaths.ERROR}`,
];

const PUBLIC_PATHS = [`/${EPaths.LOGIN}`, ...INDIRECT_PATHS];

const PATHS = [
    // Main
    ...PUBLIC_PATHS,
    `/${EPaths.DASHBOARD}`,
    `/${EPaths.USER_LIST}`,
    `/${EPaths.PROFILE}`,
    `/${EPaths.COMPANIES}`,
    `/${EPaths.SETTINGS}`,
    `/${EPaths.COMPANY_PROFILE}`,
];

// This namespace is DEPRECATED! Use ES6 imports
export namespace AppContext {
    export function getHistory(): History {
        return history;
    }

    export function getAppStore(): AppStore {
        return stores.appStore;
    }

    export function getUiStore(): UiStore {
        return stores.uiStore;
    }

    export function getUserStore(): UserStore {
        return stores.userStore;
    }

    export function getInfoStore(): InfoStore {
        return stores.infoStore;
    }

    export function getSideBarStore(): SideBarStore {
        return stores.sideBarStore;
    }

    export function getPublicPaths(): string[] {
        return PUBLIC_PATHS;
    }

    export function getPaths(): string[] {
        return PATHS;
    }
}
