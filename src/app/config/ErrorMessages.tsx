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
        },
        {
            state: EErrorState.INVALID_INVITE_LINK,
            title: "Invitation link is not relevant",
            description: (
                <>
                    <p>- Try to look for the last letter with the valid invitation link.</p>
                    <p>
                        - If you are sure that you are trying to follow the valid invitation link, then ask the
                        administrator to re-send it to you.
                    </p>
                </>
            ),
        },
        {
            state: EErrorState.BLOCKING,
            title: "Your account has been deactivated",
            description: "- Please contact the administrator.",
            button: <Button textContent={"GO TO LOGIN"} onClick={redirectOnLogin} />,
        },
        {
            state: EErrorState.REMOVED,
            title: "Your account has been deleted",
            description: "- Please contact the administrator.",
            button: <Button textContent={"GO TO LOGIN"} onClick={redirectOnLogin} />,
        },
        {
            state: EErrorState.RESET_PASSWORD,
            title: "Your password has been reset",
            description: "- Please contact the administrator.",
            button: <Button textContent={"GO TO LOGIN"} onClick={redirectOnLogin} />,
        },
        {
            state: EErrorState.REMOVE_COMPANY,
            title: "Your company has been removed",
            description: "- Please contact the administrator.",
            button: <Button textContent={"GO TO LOGIN"} onClick={redirectOnLogin} />,
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
