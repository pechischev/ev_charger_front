import * as React from "react";
import "./MainBody.scss";
import { Sidebar } from "@layouts/sidebar";
import { Content } from "@layouts/layout/content";
import { Footer } from "@layouts/layout/footer";
import { AppContext } from "@context";
import { Component } from "react";
import { observer } from "mobx-react";

interface IMainBodyProps {
    children: React.ReactNode;
}

@observer
export class MainBody extends Component<IMainBodyProps> {
    render(): React.ReactNode {
        return (
            <div className="main-body">
                <Sidebar/>
                <div className="main-body-container" data-show={AppContext.getSideBarStore().mode}>
                    <Content>
                        {this.props.children}
                    </Content>
                    <Footer/>
                </div>
            </div>
        );
    }
}
