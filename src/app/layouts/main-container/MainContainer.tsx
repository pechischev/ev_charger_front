import { Header } from "@app/layouts/header";
import { Wrapper } from "@app/layouts/wrapper";
import { observer } from "mobx-react";
import * as React from "react";
import { FC } from "react";
import { IWrapperProps } from "./IWrapperProps";

export const MainContainer = observer<FC<IWrapperProps>>(({ className = "", title, titlePrefix, children }) => {
    return (
        <Wrapper className={className}>
            <Header title={title} titlePrefix={titlePrefix} />
            {children}
        </Wrapper>
    );
});
