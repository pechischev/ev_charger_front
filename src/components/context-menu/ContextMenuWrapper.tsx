import * as React from "react";
import { FC } from "react";
// @ts-ignore
import { ContextMenu, MenuItem } from "react-contextmenu";
import "./ContextMenuWrapper.scss";
// noinspection TypeScriptPreferShortImport
import { IContextMenuItem } from "./IContextMenuItem";
import { IContextMenuWrapper } from "./IContextMenuWrapper";

export const ContextMenuWrapper: FC<IContextMenuWrapper> = ({
                                                                 className = "",
                                                                 id,
                                                                 items,
                                                             }) => {
    return (
        <ContextMenu id={id} className={`context-menu ${className}`}>
            {
                items.map((item: IContextMenuItem, index: number) => {
                    const itemClassName = item.className || "";
                    const preventClose = item.preventClose || false;
                    return (
                        <MenuItem
                            key={index}
                            onClick={item.handler}
                            attributes={{className: `context-menu__item ${itemClassName}`}}
                            preventClose={preventClose}
                        >
                            {item.value}
                        </MenuItem>
                    );
                })
            }
        </ContextMenu>
    );
};
