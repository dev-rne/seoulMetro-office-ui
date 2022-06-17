import useStore from 'component/store/store.js';
import { observer } from 'mobx-react';
import { Modal } from 'antd';
import {useState} from 'react'

const FalutStatus = observer(() => {

  const store = useStore().Main;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
      <div className="box">
        <div className="title">
          <img src={require('../../assets/circle.svg')} />
          <span>Fault Status</span>
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
        {/* <Modal footer={null} visible={isModalVisible} onCancel={handleCancel}  maskStyle={{display:"none"}}>
          <span>Modal Data</span>
        </Modal> */}
        </div>
     
        <style jsx>
         {`
         .box{
           padding:10px;
           display:flex;
           flex-direction:column;
           height:100%;

           .title{
            width:100%;
            display:flex;
            gap:6px;
            color:white;
            font-size:16px;
            font-weight:500;
            align-items:center;
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