import { EPaths } from "@app/config";
import { EErrorState } from "@layouts/error-screen";
import { Button } from "@components/button";
import { AppContext } from "@context";
import * as React from "react";
import { IErrorMessage } from "./IErrorMessage";

const redirectOnDashboard = () => AppContext.getHistory().push(`/${EPaths.DASHBOARD}`);

const DEFAULT_ERROR_CODE = 400;

// tslint:disable-next-line:no-unnecessary-class
export class ErrorMessages {
    static getMessageByState(state: EErrorState): IErrorMessage {
        const message = ErrorMessages.messages.find((item) => item.state === state) || ErrorMessages.messages[0];
        return {
            title: message.title,
            description: message.description,
            button: message.button || void 0,
            code: message.code || DEFAULT_ERROR_CODE
        };
    }

    private static readonly messages = [
        {
            state: EErrorState.NOT_FOUND,
            title: "Page Not Found",
            description: "Oops!!!! you tried to access a page which is not available. go back to Home",
            button: <Button text={"Back To Home"} type="secondary" onClick={redirectOnDashboard} isBlock={false} />,
            code: 404
        },
    ];
}
