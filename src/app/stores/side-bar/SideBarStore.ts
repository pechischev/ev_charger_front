import { Store } from "@components/store";
import { autobind } from "core-decorators";
import { observable, action } from "mobx";
import * as React from "react";

@autobind
export class SideBarStore extends Store {
    @observable private isShowSideBar = true;

    get mode(): boolean {
        return this.isShowSideBar;
    }

    @action.bound
    changeSideBarMode(event: React.MouseEvent<HTMLElement>) {
        this.isShowSideBar = !this.isShowSideBar;
    }
}
