import useStore from 'component/store/store.js';
import { observer } from 'mobx-react';
import { Modal } from 'antd';
import {useState} from 'react';
import { Tooltip } from 'antd';
import modalQuestion from 'public/data/modalQuestion.json';
import { QuestionCircleOutlined} from '@ant-design/icons';

const FalutStatus = observer(() => {

  const store = useStore().Main;
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
      <div className="box">
        
        <div className="title-box">
        <div className="title">
          <img src={require('../../assets/circle.svg')} />
          <span>베어링 상태</span>
        </div>
         <div className="question">
         <Tooltip placement="top" color="#0776d1da" overlayClassName="questionTooltip" trigger="click" title={modalQuestion.data.filter(data => "status" === data.code)[0].label}>
          <QuestionCircleOutlined className="icon"/></Tooltip>
         </div>
        </div>
        <div className="status-box">
          <div className="status">
            <div className="label">전체</div>
            <div className="data total">
              80
            </div>
          </div>
          <div className="status">
            <div className="label">정상</div>
            <div className="data normal">
            {80 - store.anomaly?.length}
            </div>
          </div>
          <div className="status">
            <div className="label">이상</div>
            <div className="data critical">
            {store.anomaly?.length}
            </div>
          </div>
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

           .status-box{
            width:100%;
            display:flex;
            align-items:center;
            flex:1;

            .status{
              width:calc(100% / 3);
              display:flex;
              flex-direction:column;
              align-items:center;
              justify-content:center;
              height:100%;
              gap:20px;
              position:relative;
                
              .label{
                color:#c7cdcf;
                font-size:16px;
                font-weight:600;
                opacity:1;
                transition:0.25s;
                
              }
              .data{
                font-size:4.5em;
                font-weight:700;
                line-height:50px;
                margin-bottom:16px;
                opacity:1;
                transition:0.25s;

                &.total{ 
                  color:#999999;
                }
                &.normal{
                  color:#41e678;
                }
                &.critical{
                  color:#f76552;
                }
              }
            }
            .status::after{
              content:"";
              position:absolute;
              top:50%;
              right:0;
              width:1px;
              background:rgba(255,255,255,0.1);
              height:40%;
              transform: translateY(-30%)
            }
            .status:last-child::after{
              width:0;
            }
           }
         }
         `}
        </style>
      </div>
  )
})


export default FalutStatus;