import { IConfig } from "./IConfig";

class Config {
    private static instance: Config;
    private readonly config: IConfig;

    private constructor() {
        this.config = require("@config/config.json");
    }

    // tslint:disable:member-ordering
    static getInstance(): Config { // TODO: fix member ordering
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    getConfig(): IConfig {
        return this.config;
    }
}

export const config = Config.getInstance().getConfig();
