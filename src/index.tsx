/**
 * TODO:
 * 1) ПОКРЫТЬ ТЕСТАМИ!
 * 2) Привести все абстракции форм к лишь одной Form.ts
 * 3) ̶П̶е̶р̶е̶н̶е̶с̶т̶и̶ ̶и̶з̶ ̶C̶o̶m̶p̶o̶n̶e̶n̶t̶s̶ ̶б̶и̶б̶л̶и̶о̶т̶е̶ч̶н̶ы̶е̶ ̶к̶о̶м̶п̶о̶н̶е̶н̶т̶ы̶ ̶в̶ ̶l̶i̶b
 * 4) Заставить использовать вызовы методов super в методах React. Как?
 *    1) Создать обёртку (HoC) имеющую только имплементации методов,
 * имплементации вызываются в обёртке с реальными методами React
 *    2) Использовать tslint-override в связке с tslint-strict-super-call (разработать)
 */

import { App } from "@app/App";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./main.scss";
import * as ServiceWorker from "./ServiceWorker";

window.addEventListener("load", () => ReactDOM.render(<App />, document.getElementById("root")));

ServiceWorker.unregister();
