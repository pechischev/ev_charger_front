import * as React from "react";
import { FC } from "react";
import "./Footer.scss";

export const Footer: FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-md-12 col-sm-12 text-center">
                        Copyright © 2019  <a href="/">Loop CMS</a>.
                        Designed by <a href="https://omega-r.com">Omega-R</a> All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};
