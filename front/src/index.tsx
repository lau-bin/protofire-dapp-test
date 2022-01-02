import * as ReactDOM from "react-dom";
import React from "react";
import { Framework } from "modules/framework"
import Main from "./main/main";
import {getAppModel} from "./model";


ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

const appModel = getAppModel();
