import { createBrowserHistory } from "history";
import { EPaths } from "../app/config";

const history = createBrowserHistory();




const INDIRECT_PATHS = [
    `/${EPaths.ERROR}`,
];

const PUBLIC_PATHS = [`/${EPaths.LOGIN}`, ...INDIRECT_PATHS];

const PATHS = [
    ...PUBLIC_PATHS,
    `/${EPaths.DASHBOARD}`
];

export const AppContext = {
    getHistory: () => history,

    getPaths: () => PATHS,

    getPublicPaths: () => PUBLIC_PATHS,
};