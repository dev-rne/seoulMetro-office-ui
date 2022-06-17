import FalutProbabilityChart from '../chart/FaultProbabilityChart';
import { observer } from 'mobx-react';
import useStore from 'component/store/store.js';
import {useEffect, useState} from 'react';
import { Empty } from 'antd';

const FalutProbability = observer(() => {

  
  const store = useStore().Main;
  const [select,setSelect] = useState(0)

  const clickTheLocation = ({carriage_number, idx, location}) => {
    setSelect(idx)
    store.changeList(carriage_number);
    store.setLocation(location)
  }

  return (
      <div className="box">
        <div className="title">
          <img src={require('../../assets/circle.svg')} />
          <span>Anomaly bearing location</span>
        </div>
        <div className="table">
            <div className="thead">
              <div className="th">베어링</div>
              <div className="th">위치</div>
              <div className="th">호차 번호</div>
            </div>
            <div className="tbody">
              {store.anomaly.length !== 0 ?store.anomaly?.map((list, i) => {
                return(
                  <div className={select === i ? "tr select" : "tr"} key={i} onClick={() => clickTheLocation({carriage_number:list.carriage_number, idx:i, location:list.bearing_location})}>
                    <div className="td">{list.bearing_number}번 베어링</div>
                    <div className="td">{list.bearing_location}</div>
                    <div className="td">{list.carriage_number}호차</div>
                  </div>
                )
              }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </div>
        </div>
        <style jsx>
         {`
         .box{
          padding:10px;
          display:flex;
          flex-direction:column;
          height:100%;
          gap:10px;

           .title {
            width:100%;
            display:flex;
            gap:6px;
            color:white;
            font-size:16px;
            font-weight:500;
            align-items:center;
           }
           .table {
            flex:1;
            display:flex;
            flex-direction:column;
            width:100%;
            overflow:hidden;
            z-index: 2;

            .thead {
              display:flex;
              width:100%;
              height:20%;
              
              .th {
                width:calc(100% / 3);
                display:flex;
                justify-content:center;
                align-items:center;
                background:#042b46b9;
                border-right:1px solid #304e7992;
              }

              .th:last-child {
                border-right:none;
              }
            }
            .tbody {
              height:80%;
              display:flex;
              flex-direction:column;
              overflow-y:scroll;

              .tr {
                display:flex;
                width:100%;
                padding:4px 0;
                border:1px solid rgba(0,0,0,0);
                border-bottom:1px solid #446da592;
                transition:0.2s;

                &.select{
                  border:1px solid #007fb9;
                  background:#3390d34b
                }

                .td {
                  width:calc(100% / 3);
                  display:flex;
                  align-items:center;
                  justify-content:center;
                }
              }
              .tr:hover{
                background:#0979c976;
                cursor:pointer;
              }

             
            }
           }
         }
         `}
        </style>
      </div>
  )
})


export default FalutProbability;