import * as React from "react";
import { FC } from "react";
import "./MainBody.scss";
import { Sidebar } from "@layouts/sidebar";
import { Content } from "@layouts/layout/content";
import { Footer } from "@layouts/layout/footer";

export const MainBody: FC = ({ children }) => {
    return (
        <div className="main-body">
            <Sidebar/>
            <div className="main-body-container">
                <Content>
                    {children}
                </Content>
                <Footer/>
            </div>
        </div>
    );
};
