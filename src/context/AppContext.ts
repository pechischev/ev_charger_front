import { createBrowserHistory } from "history";
import { EPaths } from "../app/config";

const history = createBrowserHistory();

const PATHS = [
    `/${EPaths.LOGIN}`
];

export const AppContext = {
    getHistory: () => history,

    getPaths: () => PATHS
};