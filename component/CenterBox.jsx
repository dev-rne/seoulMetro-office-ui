import { observer } from 'mobx-react';
import useStore from 'store/Store.js';
import { Tooltip } from 'antd';

const MainDashboard = observer(() => {
  const store = useStore();

  const {baring} = store.selectTrain;
  return (
      <div className="center-box">
           <img src={require('../assets/center-bg.png')} alt="" />
           <div className="baring-box">
             {baring && baring.map((list, i) => {
               return(
                <Tooltip title={list.name} color={list.err ? "volcano" : "cyan"} key={i}>
                  <img src={list.err ? require('../assets/baring-err.png') : require('../assets/baring.png')} className={list.err ? `baring${i + 1} baring err` : `baring${i + 1} baring`}/>
               </Tooltip>
               )
             })}
           </div>
        <style jsx>
         {`
            .center-box{
                     width:100%; 
                     height:100%;
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
                            width: 19%;
                            top: 84%;
                            left: 28%;
                          }
                          &.baring2{
                            width: 18%;
                            top:  71%;
                            left: 14%;
                          }
                          &.baring3{
                            width: 17%;
                            top: 72%;
                            left: 51%;
                          }
                          &.baring4{
                            width: 16%;
                            top: 60%;
                            left: 36%;
                          }
                          &.baring5{
                            width: 16%;
                            top: 60%;
                            left: 77%;
                          }
                          &.baring6{
                            width: 15%;
                            top: 50%;
                            left: 66%;
                          }
                          &.baring7{
                            width: 13%;
                            top: 50%;
                            left: 95%;
                          }
                          &.baring8{
                            width: 12%;
                            top: 40%;
                            left: 83%;
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