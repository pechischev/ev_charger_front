import { ErrorMessages } from "@app/config";
import { EErrorState } from "@app/screens/error-screen";
import * as React from "react";
import { FC } from "react";
import { RouteProps } from "react-router";
import "./ErrorScreen.scss";

export const ErrorScreen: FC<RouteProps> = ({
                                                location = {state: EErrorState.NOT_FOUND},
                                             }) => {
    const errorMessage = ErrorMessages.getMessageByState(location.state);
    return (
        <div className="container text-center">
            <div className="display-1 mb-5">400</div>
            <h1 className="h2  mb-3">{errorMessage.title}</h1>
            <p className="h4 font-weight-normal mb-7 leading-normal ">{errorMessage.description}</p>
            {errorMessage.button}
        </div>
    );
};
