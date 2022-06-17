import { observer } from 'mobx-react';
import useStore from 'component/store/store.js';
import BoxFrameSmall from './BoxFrameSmall';
import { Progress } from 'antd';
import ModalSpectrumChart from './chart/ModalSpectrumChart';
import ModalTrendChart from './chart/ModalTrendChart';
import {useEffect} from 'react'

const PopoverModal = observer(({prop}) => {

  const mainStore = useStore().Main;
  const {baring} = mainStore.selectTrainStatus;

    return (
      <div className="popover">
        <div className="topStatus">
          <div className="status-box">
            <div className={baring[prop].status === 0 ? "status normal" : baring[prop].status === 1 ? "status warn" : "status fault"}>
            {baring[prop] && baring[prop].status}
            </div>
            <div className="label">STATUS</div>
          </div>

          <div className="progress-box">
            <div className="label">Inner</div>
            <Progress percent={baring[prop].percent}  strokeColor={{
                    '0%': '#1dfff4',
                    '100%': '#3da8ff',
                  }} />

            <div className="legend-box">
              <div className="legend">
                <div className="item fault"></div>
                <div className="label">Fault</div>
              </div>              
              <div className="legend">
                <div className="item warn"></div>
                <div className="label">Warning</div>
              </div>              
              <div className="legend">
                <div className="item normal"></div>
                <div className="label">Normal</div>
              </div>              
            </div>
          </div>
        </div>
        <div className="chartbox">
          <BoxFrameSmall />
          <div className="title">brg01 Overall Trend (m/s2)</div>
          <div className="content">
            <ModalSpectrumChart/>
          </div>
        </div>
        <div className="chartbox">
          <BoxFrameSmall />
          <div className="title">brg01 Overall Trend (m/s2)</div>
          <div className="content">
            <ModalTrendChart/>
          </div>
        </div>
      <style jsx>
       {`
       .popover{
          padding:10px;
          width:100%;
          height:100%;
          display:flex;
          flex-direction:column;
          gap:10px;
          .topStatus{
            width:100%;
            display:flex;
            align-items:center;
            height:20%;
            gap:10px;

            .status-box{
              width:25%;
              display:flex;
              flex-direction:column;
              height:100%;
              gap:8px;

              .status{
                width:100%;
                height:calc(65% - 8px);
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:30px;
                font-weight:600;

                &.fault{
                      background: radial-gradient(#f5393929 30%,#f53939dc)
                    }
                    &.warn{
                      background:  radial-gradient(#ffe23b17 30%,#ffdf2cbd)
                    }
                    &.normal{
                      background:  radial-gradient(#35a4ff13 30%,#239afcdf)
                    }
              }
              .label{
                width:100%;
                height:35%;
                border-top: 1px solid #41a0bd;
                border-bottom: 1px solid #41a0bd;
                display:flex;
                justify-content:center;
                align-items:center;
                color:#B4DFFA;
                font-weight:500;
                text-shadow: 0 0 10px #47fffffd;
                background:linear-gradient(to bottom, #32c5ff57,rgba(0,0,0,0),#32c5ff57)
              }
            }

            .progress-box{
              width:calc(75% - 8px);
              height:100%;
              position:relative;
              display:flex;
              flex-direction:column;
              gap:4px;
              justify-content:center;
              .label{
                  font-size:16px;
                  color:#d3edff;
                }

              .legend-box{
                position:absolute;
                top:6px;
                right:10px;
                display:flex;
                gap:10px;
                
                .legend{
                  display:flex;
                  gap:4px;
                  align-items:center;
                  .item{
                    width:14px;
                    height:2px;
                    border-radius:10px;
                    &.fault{
                      background: #f53939
                    }
                    &.warn{
                      background: #f5aa39
                    }
                    &.normal{
                      background: #39b0f5
                    }
                  }
                  .label{
                    font-size:10px;
                    color:#ffffff9b
                  }
                }
              }
            }
          }

          .chartbox{
            position:relative;
            width:100%;
            height: calc(40% - 10px);
            display:flex;
            flex-direction:column;
            background:#091c2bd6;
            border:1px solid #3D5B84;

            .title{
              background:#193353ca;
              padding:4px 8px;
              color:#B4DFFA;
              font-weight:500;
            }
            .content{
              flex:1;
            }
          }
       }
       `}
      </style>
    </div>
    )
  })
  
  
  export default PopoverModal;