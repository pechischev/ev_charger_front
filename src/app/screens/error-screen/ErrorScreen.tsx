import { ErrorMessages } from "@app/config";
import { Wrapper } from "@app/layouts/wrapper";
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
        <Wrapper className={"error-screen"}>
            <div className={"error-message"}>
                <div className={"error-message__title"}>{errorMessage.title}</div>
                <p className={"error-message__description"}>
                    {errorMessage.description}
                </p>
                <div className={"error-message__button"}>
                    {errorMessage.button}
                </div>
            </div>
        </Wrapper>
    );
};
