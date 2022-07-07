import React, {useState, useEffect } from 'react';
import { Popover, Spin } from 'antd';
import trainData from "public/data/train.json"
import trainbg from 'assets/trainAssets/train.png';
import bridge from 'assets/trainAssets/bridge.png';
import baringIMG from 'assets/trainAssets/baring.png';
import EventConsole from 'component/hidden/EventConsole';
import PopOverBearing from 'component/hidden/PopOverBearing';
import useSWR from "component/hook/useSWR";
import _ from "lodash"


const defaultBearing = [
    {
        "title":"baring 01",
        "err":false
    },
    {
        "title":"baring 02",
        "err":false
    },
    {
        "title":"baring 03",
        "err":false
    },
    {
        "title":"baring 04",
        "err":false
    },
    {
        "title":"baring 05",
        "err":false
    },
    {
        "title":"baring 06",
        "err":false
    },
    {
        "title":"baring 07",
        "err":false
    },
    {
        "title":"baring 08",
        "err":false
    }
]

const MainContent = (props) => {
    const [train, setTrain] = useState(trainData.train);
    let bearingAnomaly = useSWR(props.login ? `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/rule/carriage-info-sec`: null);

    useEffect(() => {
        if(bearingAnomaly === undefined) return;
        if(bearingAnomaly.length === 0) return;
        let dataArr = [...train];
        for(let i = 0; i < dataArr.length; i++){
            dataArr[i].baring = _.cloneDeep(defaultBearing)
        }
        for(let i = 0; i < bearingAnomaly.length; i++){
            dataArr[bearingAnomaly[i].carriage_number].baring[bearingAnomaly[i].bearing_number - 1].err = true
        }
        setTrain(dataArr)
    },[bearingAnomaly])

    return (
        <div className="sec_main">
            <div className="main-box">
            {train?.map((list, i) => {
                return (
                    <div className="train-box" key={i}>
                        <div className="title">{list.name}</div>
                        <div className="train">
                            <div className="train-img">
                                 <img src={trainbg} alt="" className='trainWhite' /> 
                                <img src={bridge} alt="" className={(i + 1) % 5 === 0 ? "bridge nonBridge" : "bridge"}/>
                            </div>
                            <div className={list.baring?.filter(list => list.err).length !== 0 ? 'err baring-img' : 'baring-img'} >
                                <img src={baringIMG} alt="" />
                                <div className="baring-box">
                                    {list.code !== 9 ? list.baring?.map((baring,j) => {
                                        return(
                                            <div key={j}>
                                           { baring.err ?
                                             <Popover content={PopOverBearing({i,j,bearingAnomaly})} overlayClassName="bearingPop">
                                             <div className={`baring baring${j} err`} key={j}></div>
                                             </Popover> :
                                             <div className={`baring baring${j}`} key={j}></div>
                                           }
                                            </div>
                                        )
                                    }) : list.baring?.map((baring,j) => {
                                        return(
                                            <div key={j}>
                                           { baring.err ?
                                             <Popover content={PopOverBearing({i,j,bearingAnomaly})} overlayClassName="bearingPop">
                                             <div className={`baring baring${7 - j} err`} key={j}></div>
                                             </Popover> :
                                             <div className={`baring baring${7 - j}`} key={j}></div>
                                           }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
            <EventConsole  baring={bearingAnomaly} />
    </div>
    )
}

export default MainContent 