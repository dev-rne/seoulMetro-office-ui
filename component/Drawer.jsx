import { observer } from 'mobx-react';
import useStore from 'component/store/store.js';
import { Drawer } from 'antd';

const DrawerComp = observer(() => {
    const mainStore = useStore().Main;
    
    const closeModal = () => {
        mainStore.showModal = !mainStore.showModal;
      }

  return (
    <Drawer placement="bottom" visible={mainStore.showModal} >
        <div className="drawer">
         <div className="event-console" onClick={closeModal}>
              시스템 알람 이력
            </div>
        <div className="thead">
            <div className="th no">No.</div>
            <div className="th device">설비명</div>
            <div className="th time">발생시간</div>
            <div className="th info">상세내용</div>
            <div className="th status">상태</div>
        </div>
        <div className="tbody">
        {mainStore.eventData.map((list, i) => {
            return(
               <div className="tr" key={i}>
                   <div className="td no">{list.key + 1}</div>
                   <div className="td device">{list.device}</div>
                   <div className="td time">{list.time}</div>
                   <div className="td info">{list.info}</div>
                   <div className="td status">{list.status}</div>
               </div>
            )
        })}</div></div>
         <style jsx>
             {`
             .event-console{
                   position:absolute;
                   top:-40px;
                   left:50%;
                   transform:translateX(-50%);
                   padding:8px 50px;
                   background: linear-gradient(to bottom, #005C9A,#004B77, #003656);
                   font-size:16px;
                   font-weight:600;
                   border-top-left-radius:20px;
                   border-top-right-radius:20px;
                   cursor:pointer;
                   height:40px;
                 }
                 .drawer{
                     width:70vw;
                     background:linear-gradient(to bottom, #003656, #021218 10%);
                     position:relative;
                     border-top-left-radius:16px;
                     border-top-right-radius:16px;
                     border:1px solid #163864;
                     border-bottom: none;
                     padding:20px;
                     max-height:320px;
                     height:100%;
                     .no{
                         width:10%;
                     }
                     .device{
                         width:20%;
                     }
                     .time{
                         width:20%;
                     }
                     .info{
                         width:40%;
                     }
                     .status{
                         width:10%;
                     }

                     .thead{
                         display:flex;
                         height: 40px;
                         width:100%;
                         background:linear-gradient(to bottom, #00638d83, #002c4d7a,#00638d83);
                         border-top: 1px solid #0895CC;
                         border-bottom: 1px solid #0895CC;
                         align-items:center;

                         .th{
                             color:#D0DEF8;
                             font-weight:600;
                             display:flex;
                             justify-content:center;
                         }
                     }

                     .tbody{
                         width:100%;
                         overflow-y: auto;
                         max-height:240px;
                         .tr{
                             height:40px;
                            border-bottom: 1px solid #183658;
                            display:flex;
                            align-items:center;
                            transition:0.3s;
                            .td{
                                display:flex;
                             justify-content:center;
                            }
                         }
                         .tr:hover{
                             cursor:pointer;
                             background:rgba(0,0,0,0.4)
                         }
                     }

                 }
             `}
         </style>
         </Drawer>
  )
})

export default DrawerComp;
