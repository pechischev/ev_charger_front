import { FC } from "react";
import * as React from "react";
import "./Footer.scss";

export const Footer: FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-md-12 col-sm-12 mt-3 mt-lg-0 text-center">
                        Copyright © 2019 <a href="#">Loop CMS</a>. Designed by <a href="#">Omega-R</a> All rights
                        reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};
