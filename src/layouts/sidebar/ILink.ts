import { EPaths } from "@app/config";

export interface ILink {
    value: string;
    path: EPaths | string;
    isEnabled?: boolean;
    children?: ILink[];
    iconName?: string;
}
