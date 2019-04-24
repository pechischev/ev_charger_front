// noinspection TypeScriptPreferShortImport
import { IContextMenuItem } from "./IContextMenuItem";

export interface IContextMenuWrapper {
    className?: string;
    id: string;
    items: IContextMenuItem[];
}
