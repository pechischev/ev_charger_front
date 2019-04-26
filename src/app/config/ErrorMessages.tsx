import { EPaths } from "@app/config";
import { EErrorState } from "@app/screens/error-screen";
import { Button } from "@components/button";
import { AppContext } from "@context";
import * as React from "react";
import { IErrorMessage } from "./IErrorMessage";

const redirectOnLogin = () => AppContext.getHistory().push(`/${EPaths.LOGIN}`);

// tslint:disable-next-line:no-unnecessary-class
export class ErrorMessages {
    private static readonly messages = [
        {
            state: EErrorState.NOT_FOUND,
            title: "Page not found",
            description: "The requested page is not available.",
            button: <Button className={"btn btn-primary"} textContent={"GO TO LOGIN"} onClick={redirectOnLogin} />,
        },
    ];

    static getMessageByState(state: EErrorState): IErrorMessage {
        const message = this.messages.find((item) => item.state === state) || this.messages[0];
        return {
            title: message.title,
            description: message.description,
            button: message.button || void 0,
        };
    }
}
