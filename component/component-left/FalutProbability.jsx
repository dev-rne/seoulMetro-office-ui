import { QuestionCircleOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { observer } from 'mobx-react';
import useStore from 'component/store/store.js';
import {useEffect, useState} from 'react';
import modalQuestion from 'public/data/modalQuestion.json'
import { Empty } from 'antd';

const FalutProbability = observer(() => {
  const store = useStore().Main;
  const [select,setSelect] = useState(null)

  const clickTheLocation = ({carriage_number, idx, location}) => {
    setSelect(idx)
    store.changeList(carriage_number);
    store.setLocation(location)
  }

  useEffect(() => {
    if(store.anomaly.length === 0) return;
    let unselected = store.anomaly.filter(list => list.carriage_number === store.selectTrain.key);
    if(unselected.length === 0) {
      setSelect(null);
      store.setLocation("")
      store.resetRms();
    }else{
      clickTheLocation({carriage_number:unselected[0].carriage_number,
         idx:store.anomaly.findIndex(list => list.bearing_number === unselected[0].bearing_number), 
         location:unselected[0].bearing_location})
    }
  },[store.selectTrain])

  return (
      <div className="box">
        <div className="title-box">
         <div className="title">
         <img src={require('../../assets/circle.svg')} />
          <span>이상 베어링 위치</span>
         </div>
         <div className="question">
         <Tooltip placement="top" color="#0776d1da" overlayClassName="questionTooltip" trigger="click" title={modalQuestion.data.filter(data => "location" === data.code)[0].label}>
          <QuestionCircleOutlined className="icon"/></Tooltip>
         </div>
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
              }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="이상베어링 없음" />}
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

          .title-box{
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            padding: 2px 4px;
           .title {
            width:100%;
            display:flex;
            gap:6px;
            color:white;
            font-size:16px;
            font-weight:500;
            align-items:center;
           }
           .question{
            z-index:1;
            color: #0579ff;
              cursor: pointer;
              transition: 0.25s;
              z-index: 1;
              font-size:16px;
           }
            .question:hover{
                color: white;
            }
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