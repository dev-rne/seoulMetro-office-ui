import moment from 'moment';
import {useState} from 'react';
import {useInterval} from 'react-use';

export default function TopComp(){

    return (
       <div className="top">
            <img src={require('../assets/titleBG.svg')} className="bg" />
            <div className="top-box">
                <div className="img">
                <img src={require('../assets/logo.svg')} alt="" className='logo'/>
                </div>
                <div className='title'>전동차 차축베어링 예방진단 시스템</div>
                <div className="time-box">
                <Time />
                </div>
            </div>
           <style jsx>
             {`
                 .top{
                    width:100%;
                    height:10%;
                    padding:30px;
                    position:relative;
                 }
                 .bg{
                     width:100%;
                     position:absolute;
                     top:10px;
                     left:0;
                     z-index:0;
                 }
                 .top-box{
                    width:100%;
                    height:100%;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    .img{
                        z-index:1;
                        width:20%;
                     img{
                         width:150px;
                     }
                    }
                    .title{
                        z-index:1;
                        font-size:24px;
                        font-weight:700;
                        width:50%;
                        text-align:center;
                        color:white;
                    }
                    .time-box{
                        width:20%;
                        z-index:1;
                        display:flex;
                        gap:4px;
                        justify-content:end;
                        align-items:center;
                        font-size: 16px;
                        font-weight:500;
                        color:white;
                    }
                 }
             `}
           </style>
       </div>
    )
}

const Time = () =>{
    const [realTime, setRealTime] = useState(Date.now());

    useInterval(() => {
        setRealTime(Date.now())
    }, 1000)

    return(
        <>
            <div className="date">{moment(realTime).format('YYYY/MM/DD ddd')}</div>
            <div className="time">{moment(realTime).format('HH:mm:ss')}</div>
        </>
    )
}