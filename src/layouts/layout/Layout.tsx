import { FC } from "react";
import * as React from "react";
import { Page } from "@layouts/page";
import { Header } from "@layouts/layout/header";
import { Footer } from "@layouts/layout/footer";
import { Content } from "@layouts/layout/content";
import { Sidebar } from "@layouts/sidebar";

export const Layout: FC = ({ children }) => {
    return (
        <Page>
            <Header/>
            <Sidebar/>
            <Content>
                {children}
            </Content>
            <Footer/>
        </Page>
    );
};
