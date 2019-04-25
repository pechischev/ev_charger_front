import { EApiMethods } from "./EApiMethods";
import { EApiRoutes } from "./EApiRoutes";

export interface IMethodMap<T> {
    [method: string]: T;
}

export type TMethodMap<T> = {
    [method in EApiMethods]?: T;
};

export type TMap<T> = {
    [path in EApiRoutes]?: T | TMethodMap<T>;
};
