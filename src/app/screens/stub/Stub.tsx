import { IHeaderProps } from "@app/layouts/header";
import { MainContainer } from "@app/layouts/main-container";
import * as React from "react";
import { FC } from "react";
import { StubContainer } from "./StubContainer";

export const Stub: FC<IHeaderProps> = ({ title }) => {
    return (
        <MainContainer className={"stub"} title={title}>
            <StubContainer />
        </MainContainer>
    );
};
