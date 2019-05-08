import * as React from "react";
import { Component, ReactNode } from "react";
import { IUser } from "@entities/user";

interface IProfileProps {
    data: IUser;
}

export class Profile extends Component<IProfileProps> {
    render(): ReactNode {
        return (
            <div className="">
                Profile
            </div>
        );
    }
}
