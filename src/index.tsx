import { App } from "@app/App";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./main.scss";
import * as ServiceWorker from "./ServiceWorker";

window.addEventListener("load", () => ReactDOM.render(<App />, document.getElementById("root")));

ServiceWorker.unregister();
