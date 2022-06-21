import { observer } from 'mobx-react';
import BoxFrame from './BoxFrame';
import useStore from 'component/store/store.js';
import CenterBox from './CenterBox';
import LeftBox from './LeftBox';
import RightBox from './RightBox';
import { useEffect, useState } from 'react';
import useInterval from 'component/hook/useInterval';

const MainDashboard = observer(() => {
  const mainStore = useStore().Main;
  
    useEffect(() => {
      mainStore.callAnomaly();
    },[])

    useEffect(()=>{
      if(mainStore.anomaly.length === 0) return;
       if(mainStore.location !== ""){
        mainStore.callRms({location:mainStore.location,date:"lastWeek"})
       }
    },[mainStore.location])

    useInterval(() => {
      mainStore.callAnomaly();
    }, 15000)
    
  const showConsole = () => {
    mainStore.showModal = !mainStore.showModal;
  }
  const alram = mainStore.eventData.length;

  return (
      <div className="mainComp">
          <div className="content">
            <img src={require('../assets/main-title.svg')} className="mainTop" />
            <BoxFrame/>
            <span className="title-box">
            {mainStore.selectTrain &&
             mainStore.selectTrain.name}
            </span>
            <div className="main-box">
              <LeftBox/>
              <CenterBox/>
            </div>
            {/* <div className="event-console" onClick={showConsole}>
              시스템 알람 이력
            </div> */}
          </div>
              {/* <Drawer/> */}
        <style jsx>
         {`
         .mainComp{
             width:100%;
             height:85%;
             padding-top:20px;
             
             .content{
                 width:100%;
                 height:100%;
                 position:relative;
                 border-radius:10px;
                 overflow:hidden;
                 border:1px solid #0AA4DE;

                 .mainTop{
                    position:absolute;
                    top:-2px;
                    left: calc(61.5% + 12px);
                    transform: translateX(-50%);
                    z-index:2;
                 }

                 .title-box {
                   color:white;
                   font-size:20px;
                   position:absolute;
                   top:0;
                   left: calc(61.5% + 12px);
                   transform: translateX(-50%);
                   font-weight:600;
                   z-index:2;
                 }

                 .main-box{
                   width:100%;
                   height:100%;
                   padding:12px;
                   display:flex;
                   gap:12px;
                 }

                 .event-console{
                   position:fixed;
                   bottom:0;
                   left:50%;
                   transform:translateX(-50%);
                   padding:8px 50px;
                   background: linear-gradient(to bottom, #005C9A,#004B77, #003656);
                   font-size:16px;
                   font-weight:600;
                   border-top-left-radius:20px;
                   border-top-right-radius:20px;
                   box-shadow:2px 2px 8px rgba(0,0,0,0.4);
                   cursor:pointer;
                   transition:0.4s;
                   z-index:10
                 }
                
             }
         }
         `}
        </style>
      </div>
  )
})


export default MainDashboard;