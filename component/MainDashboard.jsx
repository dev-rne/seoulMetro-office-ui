import { observer } from 'mobx-react';
import BoxFrame from './BoxFrame';
import useStore from 'store/store.js';
import CenterBox from './CenterBox';
import LeftBox from './LeftBox';
import RightBox from './RightBox';
import { useEffect } from 'react';

const MainDashboard = observer(() => {
  const mainStore = useStore().Main;
  const modalStore = useStore().Modal;

  useEffect(() => {
    modalStore.callFaultStatusData()
  },[])

  return (
      <div className="mainComp">
          <div className="content">
            <div className="mainbg"></div>
            <img src={require('../assets/main-title.svg')} className="mainTop" />
            <BoxFrame/>
            <div className="title-box">
            {mainStore.selectTrain &&
             mainStore.selectTrain.name}
            </div>
            <div className="main-box">
              <LeftBox/>
              <CenterBox/>
              <RightBox/>
            </div>
          </div>
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
                    left: 50%;
                    transform: translateX(-50%);
                    z-index:2;
                 }
                 .mainbg {
                     position:absolute;
                     top:0;
                     left:0;
                     width:100%;
                     height:100%;
                     background:#04111d84;
                     z-index:0;
                 }

                 .title-box {
                   width:100%;
                   text-align:center;
                   z-index: 1;
                   color:white;
                   font-size:20px;
                   position:absolute;
                   top:0;
                   left:0;
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
             }
         }
         `}
        </style>
      </div>
  )
})


export default MainDashboard;