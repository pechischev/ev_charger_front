import * as React from "react";
import { FC } from "react";
import { Page } from "@layouts/page";
import { Header } from "@layouts/layout/header";
import { MainBody } from "@layouts/layout/main-body/MainBody";

export const Layout: FC = ({ children }) => {
    return (
        <Page>
            <Header/>
            <MainBody children={children}/>
        </Page>
    );
};
