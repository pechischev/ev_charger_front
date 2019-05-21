import { EPaths } from "@app/config";
import { EErrorState } from "@layouts/error-screen";
import { Button } from "@components/button";
import { AppContext } from "@context";
import * as React from "react";
import { IErrorMessage } from "./IErrorMessage";

const redirectOnLogin = () => AppContext.getHistory().push(`/${EPaths.LOGIN}`);

// tslint:disable-next-line:no-unnecessary-class
export class ErrorMessages {
    static getMessageByState(state: EErrorState): IErrorMessage {
        const message = ErrorMessages.messages.find((item) => item.state === state) || ErrorMessages.messages[0];
        return {
            title: message.title,
            description: message.description,
            button: message.button || void 0,
        };
    }

    private static readonly messages = [
        {
            state: EErrorState.NOT_FOUND,
            title: "Page not found",
            description: "The requested page is not available.",
            button: <Button text={"GO TO LOGIN"} type="secondary" onClick={redirectOnLogin} />,
        },
    ];
}
