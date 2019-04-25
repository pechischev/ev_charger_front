import { FC } from "react";
import * as React from "react";
import { Page } from "@layouts/page";
import { Header } from "@layouts/layout/header";
import { Footer } from "@layouts/layout/footer";
import { Content } from "@layouts/layout/content";

interface ILayoutProps {

}

export const Layout: FC<ILayoutProps> = ({children}) => {
    return (
        <Page>
            <Header/>
            <Content>
                {children}
            </Content>
            <Footer/>
        </Page>
    );
};
