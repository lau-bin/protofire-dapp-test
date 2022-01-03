import React from "react";
import { ServiceHolder } from "modules/framework";
import { ServiceBlob } from 'modules/framework'
import { Framework } from "modules/framework";
import { Observable } from "rxjs";
import { ClosedModel } from "modules/sam";
import cssl from "./main.scss";
import { css } from '@emotion/css'
import { getAppModel } from "../model";
import { ViewDTO } from "../../../backend/src/dto/viewDTO";
import background from "resources/background.png";


export default class Main extends React.Component<any, {table: ViewDTO | undefined}> {

  btnClass = cssl.btn + " " + cssl["btn-primary"] + " " + css`
  width: 500px;
  `
  appModel = getAppModel();

  constructor(props:any){
    super(props);
    this.appModel.subNGet("table", {
      next: (table)=>{
        this.setState({table: table != null ? table : undefined})
      }
    })
  }

  render() {
    let table = this.state?.table?.table?.table;
    let rows = []
    if (table){
      table.sort((r1, r2)=>{
        if (r1.position > r2.position){
          return 1;
        }
        else if(r1.position < r2.position){
          return -1;
        }
        return 0;
      })
    }
    return (
      <>

        <div className={css`
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-image: url(${background});
          background-repeat: no-repeat;
          background-size: cover;
          filter: invert(50%) sepia(61%) saturate(2194%) hue-rotate(159deg) brightness(91%) contrast(101%);
          z-index: -1;
        `}></div>
        <div className={css`
          display: flex;
          align-items: center;
          align-content: center;
          width: 100vw;
          height: 100vh;
          justify-content: center;
          flex-direction: column;
          background-color: transparent;
        `}>
        <h1 className={cssl["text-center"] + " " + css`
          text-decoration: underline;
          text-shadow: 0px 0px 6px rgba(255,255,255,0.7);
        `}>Tournament Scoreboard</h1>
<table className={cssl.table + " " + css`
          max-width: 80% !important;
          max-height: 80% !important;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          background-color: white;  
`}>
        <thead>
          {table?.forEach}
          <th scope="col">Name</th>
          <th scope="col">Points</th>
          <th scope="col">Difference</th>
          <th scope="col">Draw Games</th>
          <th scope="col">Lost Games</th>
          <th scope="col">Played Games</th>
          <th scope="col">Won Games</th>
          <th scope="col">Position</th>
        </thead>

        {table &&
        <tbody>
          {table.map(r=>{
            return (
              <tr>
                <th scope="row">{r.team}</th>
                <td>{r.points}</td>
                <td>{r.difference}</td>
                <td>{r.drawGames}</td>
                <td>{r.lostGames}</td>
                <td>{r.playedGames}</td>
                <td>{r.wonGames}</td>
                <td>{r.position}</td>
                </tr>
            )
          })}
        </tbody>


}
        </table>
        </div>



      </>
    )
  }

  

}


