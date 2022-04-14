import { observer } from 'mobx-react';
import BoxFrame from './BoxFrame';
import useStore from 'store/Store.js';
import CenterBox from './CenterBox';

const MainDashboard = observer(() => {
  const store = useStore();

  return (
      <div className="mainComp">
          <div className="content">
            <div className="mainbg"></div>
            <img src={require('../assets/main-title.svg')} className="mainTop" />
            <BoxFrame/>
            <div className="title-box">
            {store.selectTrain &&
             store.selectTrain.name}
            </div>
            <div className="main-box">
              <div className="left-box">

              </div>
              <div className="center-box">
                <CenterBox/>
              </div>
              <div className="right-box">

              </div>
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

                   .left-box{
                     width:22%;
                     height:100%
                   }
                   .center-box{
                     width:calc(56% - 40px);
                     height:100%;
                     border:1px solid #0AA4DE;
                     border-radius:10px;
                     position:relative;
                      box-sizing:border-box;
                      overflow:hidden;
                      background-color:rgba(0,0,0,0.3);
                      img{
                        width:100%;
                      }
                   }
                   .right-box{
                     width:22%;
                     height:100%
                   }
                 }
             }
         }
         `}
        </style>
      </div>
  )
})


export default MainDashboard;