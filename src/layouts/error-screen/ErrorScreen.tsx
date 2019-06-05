import { ErrorMessages } from "@app/config";
import { EErrorState } from "./EErrorState";
import * as React from "react";
import { FC } from "react";
import { RouteProps } from "react-router";
import "./ErrorScreen.scss";
import { Page } from "@layouts/page";

export const ErrorScreen: FC<RouteProps> = ({
                                                location = { state: EErrorState.NOT_FOUND },
                                            }) => {
    const errorMessage = ErrorMessages.getMessageByState(location.state);
    return (
        <Page layer={"page-content error-screen"}>
            <div className="container text-center error-message">
                <div className="mb-5 error-message__code">{errorMessage.code}</div>
                <h1 className="h2 error-message__title">{errorMessage.title}</h1>
                <p className="h4 font-weight-normal mb-7 error-message__description">{errorMessage.description}</p>
                {errorMessage.button}
            </div>
        </Page>
    );
};
