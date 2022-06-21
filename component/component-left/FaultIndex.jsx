import LineChartRms from 'component/chart/LineChartRms';
import useStore from 'component/store/store.js';
import {useState, useEffect} from 'react';
import { observer } from 'mobx-react';
import { Tooltip } from 'antd';
import modalQuestion from 'public/data/modalQuestion.json';
import { QuestionCircleOutlined} from '@ant-design/icons';

const FaultIndex =  observer(() => {

  const store = useStore().Main;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setLocation(store.location)
  },[store.location])

  return (
      <div className="box">
        <div className="title-box">
         <div className="title">
         <img src={require('../../assets/circle.svg')} />
          <span>이상 베어링 RMS 트랜드 {location ? `[${location}]` : ""}</span>
         </div>
         <div className="question">
         <Tooltip placement="top" color="#0776d1da" overlayClassName="questionTooltip" trigger="click" title={modalQuestion.data.filter(data => "trend" === data.code)[0].label}>
          <QuestionCircleOutlined className="icon"/></Tooltip>
         </div>
        </div>
        <div className="content">
          <LineChartRms data={store.rms} />
        </div>
        <style jsx>
         {`
         .box{
          padding:10px;
           display:flex;
           flex-direction:column;
           height:100%;

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
           .content{
             flex:1;
           }
         }
         `}
        </style>
      </div>
  )
})


export default FaultIndex;