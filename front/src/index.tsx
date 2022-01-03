import * as ReactDOM from "react-dom";
import React from "react";
import { Framework } from "modules/framework"
import Main from "./main/main";
import {getAppModel} from "./model";


ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
// this dapp uses the SAM pattern
const appModel = getAppModel();
