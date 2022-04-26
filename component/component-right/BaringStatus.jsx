import { observer } from 'mobx-react';
import { Progress } from 'antd';

const SmartCalendar = observer(() => {

  const data = [
    {
      name:"baring01",
      status: 0.5
    },
    {
      name:"baring02",
      status: 0.42
    },
    {
      name:"baring03",
      status: 0.98
    },
    {
      name:"baring04",
      status: 0.15
    },
    {
      name:"baring05",
      status: 0.3
    },
    {
      name:"baring06",
      status: 0.24
    },
    {
      name:"baring07",
      status: 0.6
    },
    {
      name:"baring08",
      status: 0.75
    },
  ]

  return (
      <div className="box">
        <div className="title">
          <img src={require('../../assets/circle.svg')} />
          <span>Baring Status</span>
        </div>
        <div className="content">
          <div className="thead">
            <div className="th name">Name</div>
            <div className="th progress">Progress</div>
          </div>
          <div className="tbody">
            {data.map((list,i) => {
              return(
                <div className="tr">
                  <div className="td name">{list.name}</div>
                  <div className="td progress"> <Progress percent={list.status * 100} size="default"  strokeColor={{
                    '0%': '#1dfff4',
                    '100%': '#3da8ff',
                  }} /></div>
                </div>
              )
            })}
          </div>
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
            height:10%;
            display:flex;
            gap:6px;
            color:white;
            font-size:16px;
            font-weight:500;
            align-items:center;
           }

           .content{
            height:90%;
            display:flex;
            flex-direction:column;
            width:100%;
            .name{
              width:30%;
              position:relative;
            }
            
            .progress{
              width:70%;
            }
            .thead{
              margin-top:10px;
              display:flex;
              background:#10486d7d;
              .th{
                color:#eaf9ff;
                display:flex;
                justify-content:center;
                align-items:center;
                font-weight:500;
                border-right:1px solid #688ead
              }
              .th:last-child{
                border-right:none
              }
            }
            .tbody{
              flex:1;
              width:100%;
              overflow-y:scroll;
              flex-direction:column;
              .tr{
                display:flex;
                border-bottom:1px solid #404b61;
                .td{
                  color:#a3ccdf;
                  padding:4px;
                  text-align:center;
                  &.progress{
                    padding-left:10px;
                  }
                }
              }
            }
             
           }
         }
         `}
        </style>
      </div>
  )
})

export default SmartCalendar;
