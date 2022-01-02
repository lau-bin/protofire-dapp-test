import React from "react";
import { ServiceHolder } from "modules/framework";
import { ServiceBlob } from 'modules/framework'
import { Framework } from "modules/framework";
import { Observable } from "rxjs";
import { ClosedModel } from "modules/sam";
import cssl from "./main.scss";
import { css } from '@emotion/css'

export default class Main extends React.Component {

  btnClass = cssl.btn + " " + cssl["btn-primary"] + " " + css`
  width: 500px;
`

    render() {
      return (
        <>
        <button className={this.btnClass}></button>
        <button className={this.btnClass}></button>
        <button className={this.btnClass}></button>
        <button className={this.btnClass}></button>
        <button className={this.btnClass}></button>
        <button className={this.btnClass}></button>


        </>
      )
    }
}


