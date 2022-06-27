import { observer } from 'mobx-react';
import useStore from 'component/store/store.js';
import { Modal } from 'antd';
import BoxFrame from './BoxFrame';
import React, { useEffect, useState } from 'react';
import PopoverModal from './PopoverModal';
import ModalContents from './ModalContents';

const MainDashboard = observer(() => {
  const mainStore = useStore().Main;
  const modalStore = useStore().Modal;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bearing, setBearing] = useState(0);

  const showModal = (idx) => {
    setIsModalVisible(true);
    setBearing(idx);
    modalStore.selectLocation = `${mainStore.selectTrain.key}-${idx+1}`;
    
    modalStore.callTotalChart("lastWeek")
    modalStore.callModalStatus(`${mainStore.selectTrain.key}-${idx+1}`)
  };

  useEffect(() => {
  },[isModalVisible])

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [bearingStatus, setBearingStatus] = useState([])

  useEffect(() => {
    setBearingStatus(mainStore.selectTrain.baring);
    if(mainStore.anomaly.length === 0) return;
    let dataArr = mainStore.selectTrain.baring
    for(let i =0; i < mainStore.anomaly.length; i++){
      if(mainStore.selectTrain.key === mainStore.anomaly[i].carriage_number){
        dataArr[mainStore.anomaly[i].bearing_number - 1].err = true
      }
    }
    setBearingStatus(dataArr);
  },[mainStore.selectTrain])


  return (
      <div className="center-box">
           <img src={require('../assets/center-bg.png')} alt="" />
           <div className="baring-box">
             {bearingStatus && bearingStatus.map((list, i) => {
               return (
                 <img src={list.err ? require('../assets/baring-err.png') : require('../assets/baring.png')} className={list.err ? `baring${i + 1} baring err` : `baring${i + 1} baring`} key={`img${i}`} onClick={mainStore.selectTrain.key !== 9 ? () => showModal(i) : () => showModal(bearingStatus.length - (i + 1))}/> 
               )
             })}
            </div>
            <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} className="bearingModal">
              <ModalContents bearing={bearing} visible={() => isModalVisible} />
            </Modal>
           <BoxFrame/>
        <style jsx>
         {` 
            .center-box{
                    width:calc(77% - 12px);
                     height:100%;
                     border:1px solid #0AA4DE;
                     border-radius:10px;
                     position:relative;
                      box-sizing:border-box;
                      overflow:hidden;
                      background-color:rgba(0,0,0,0.3);
                      
                      img{
                        width:100%;
                        height:100%;
                        position:absolute;
                        top:50%;
                        left:50%;
                        transform:translate(-50%,-50%);
                      }

                      .baring-box{
                          z-index:1;
                          width:100%;
                          height:100%;
                          position:relative;

                        .baring{
                          mix-blend-mode:hard-light;
                          position:absolute;
                          transform:translate(-50%,-50%);
                          width:100px;
                          height:auto;
                          opacity:0.7;
                          transition:0.25s;
                          cursor:pointer;

                          &.baring1{
                            width: 13%;
                            top:  70%;
                            left: 19.5%;
                          }
                          &.baring2{
                            width: 14%;
                            top: 84%;
                            left: 30%;
                          
                          }
                          &.baring3{
                            width: 12.5%;
                            top: 60%;
                            left: 38%;
                          }
                          &.baring4{
                            width: 12.5%;
                            top: 72.5%;
                            left: 49.5%;
                           
                          }
                          &.baring5{
                            width: 12%;
                            top: 51%;
                            left: 62%;
                          }
                          &.baring6{
                            width: 12%;
                            top: 62%;
                            left: 71.5%;
                           
                          }
                          &.baring7{
                            width: 11%;
                            top: 42%;
                            left: 78%;
                          }
                          &.baring8{
                            width: 11.5%;
                            top: 52%;
                            left: 89%;
                          }
                          &.err{
                            animation: err 1.2s infinite;
                            mix-blend-mode:hard-light;
                          }

                          @keyframes err {
                            from {opacity: 1}
                            50% {opacity: 0.8}
                            to {opacity: 1}
                          }
                        }

                        .baring:hover{
                          opacity:1
                        }
                      }
                   }
         `}
        </style>
      </div>
  )
})

export default MainDashboard;

const contents = (i) =>{
  return (
    <div className='popover' >
      <div className="contents">
      <BoxFrame/>
      <PopoverModal prop={i}/>
      </div>
      <style jsx>
         {`
         .popover{
             width:350px;
             height:500px;
             .contents{
               width:100%;
               height:100%;
               background:#001e3ace;
               position:relative;
               border:1px solid #74BBD5;
             }
         }
         `}
        </style>
    </div>
  )
}