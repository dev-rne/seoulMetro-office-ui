import useStore from 'component/store/store.js';
import { observer } from 'mobx-react';
import { Modal } from 'antd';
import {useState} from 'react'

const FalutStatus = observer(() => {

  const modalStore = useStore().Modal;
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
          <div className="status" onClick={showModal}>
            <div className="label">정상</div>
            <div className="data normal">
              {modalStore.faultStatusData.normal}
            </div>
          </div>
          <div className="status" onClick={showModal}>
            <div className="label">이상</div>
            <div className="data warn">
            {modalStore.faultStatusData.warn}
            </div>
          </div>
          <div className="status" onClick={showModal}>
            <div className="label">고장</div>
            <div className="data critical">
            {modalStore.faultStatusData.critical}
            </div>
          </div>
          <div className="status" onClick={showModal}>
            <div className="label">7일예측</div>
            <div className="data sevenDays">
              {modalStore.faultStatusData.sevenDays}
              </div>
          </div>
        <Modal footer={null} visible={isModalVisible} onCancel={handleCancel}  maskStyle={{display:"none"}}>
          <span>Modal Data</span>
        </Modal>
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
              width:25%;
              display:flex;
              flex-direction:column;
              align-items:center;
              justify-content:center;
              height:100%;
              gap:16px;
              position:relative;
                
              .label{
                color:#c7dae2;
                font-size:16px;
                font-weight:600;
                opacity:0.5;
                transition:0.25s;
                
              }
              .data{
                font-size:4em;
                font-weight:600;
                line-height:50px;
                margin-bottom:10px;
                opacity:0.5;
                transition:0.25s;

                &.normal{ 
                  color:#10a7fe;
                }
                &.warn{
                  color:#fefa10;
                }
                &.critical{
                  color:#fa7132;
                }
                &.sevenDays{
                  color:#57e6ff;
                }
              }
            }
              .status:hover .label{
                opacity:1;
                cursor: pointer;
              }
              .status:hover .data{
                opacity:1;
                cursor: pointer;
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
                width:0
              }
           }
         }
         `}
        </style>
      </div>
  )
})


export default FalutStatus;