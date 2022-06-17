import useStore from 'component/store/store.js';
import { observer } from 'mobx-react';
import { Progress, Tooltip } from 'antd';
import ModalLineChart from 'component/chart/ModalLineChart';
import BoxFrameSmall from './BoxFrameSmall';
import {useState, useEffect} from 'react';

const ModalContents = observer(({bearing}) => {
    const store = useStore().Main;

    const [chartData, setChartData] = useState(resetData);
    const [status, setStatus] = useState(false);
    const [progress,setProgress] = useState([])

    const resetData = [
        {
            title: "RMS",
            data: [],
            threshold: 0
        },
        {
            title: "Peak to peak",
            data: [],
            threshold: 0
        },
        {
            title: "Kurtosis",
            data: [],
            threshold: 0
        },
        {
            title: "Crest factor",
            data: [],
            threshold: 0
        },
        {
            title: "Shape factor",
            data: [],
            threshold: 0
        },
        {
            title: "Temperature",
            data: [],
            threshold: 0
        },
    ]

    useEffect(() => {
        if(store.totalData === []) return;
        let dataArr = resetData;
        let data = store.totalData

        for(let i = 0; i < store.totalData.rms?.acq_time.length; i++){
            dataArr[0].data.push([data.rms.acq_time[i], data.rms.value[i]])
            dataArr[1].data.push([data.peak_to_peak.acq_time[i], data.peak_to_peak.value[i]])
            dataArr[2].data.push([data.kurtosis.acq_time[i], data.kurtosis.value[i]])
            dataArr[3].data.push([data.crest_factor.acq_time[i], data.crest_factor.value[i]])
            dataArr[4].data.push([data.shape_factor.acq_time[i], data.shape_factor.value[i]])
        }
        for(let i = 0; i < data.temperature?.acq_time.length; i++){
            dataArr[5].data.push([data.temperature.acq_time[i], data.temperature.value[i]])
        }
            dataArr[0].threshold =  data.rms?.threshold;
            dataArr[1].threshold = data.peak_to_peak?.threshold;
            dataArr[2].threshold =  data.kurtosis?.threshold;
            dataArr[3].threshold =  data.crest_factor?.threshold;
            dataArr[4].threshold =  data.shape_factor?.threshold;
            dataArr[5].threshold =  data.temperature?.threshold;
        setChartData(dataArr);
    },[store.totalData])

    

    useEffect(() => {
        if(store.statusData === []) return;
        setStatus(store.statusData.anomaly_detected);
        let dataArr = []
        for(let key in store.statusData){
            if(key !== "anomaly_detected")dataArr.push(store.statusData[key])
        }
        setProgress(dataArr)
    },[store.statusData])

  
    return(
        <div className="modal">
            <div className="title-box">
                {store.selectTrain.key}호차 
                <span> {bearing + 1}번 베어링</span> 
            </div>

            <div className="status-box">
                <div className="bearing-status">
                    <div className="title">
                        <img src={require('../assets/circle.svg')} />
                        <span>Bearing Status</span>
                    </div>
                    <div className={status ? "err status" : "status"}>
                        <span className={status ? "err" : ""}>{status ? "고장" : "정상"}</span>
                    </div>
                </div>

                <div className="progress-box">
                    <div className="title">Maximum feature data per day</div>
                    <div className="chart-box">
                    {progress.map((list,i) => 
                     <Tooltip placement="top" title={title({ value:Number(list.data).toFixed(5), threshold:list.threshold, title:list.title})} key={i} color="#108ee9">
                       <div className="chart">
                         <Progress percent={((list.data.toFixed(2) / list.threshold) * 100).toFixed(1)} showInfo={false} className="progress" strokeLinecap="square" strokeColor={list.data > list.threshold ? "#e91010" : "#108ee9"}/>
                         <div className="label">{((list.data.toFixed(2) / list.threshold) * 100).toFixed(1)}%</div>
                       </div></Tooltip>
                        )}
                    </div>
                </div>
            </div>

            <div className="chart-box">
                {chartData?.map((list, i) => {
                    return(
                        <div className="charts" key={i}>
                            <BoxFrameSmall />
                            <div className="title">{list.title}</div>
                            <div className="content">
                                <ModalLineChart data={list.data} threshold={list.threshold} title={list.title}/></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
})

export default ModalContents

const title = ({value, threshold, title}) => {
    return(
        <div className='tooltip'>
            <div className='title'>
                {title}
            </div>
            <span>
                값: {value}
            </span>
            <span>
                임계치: {threshold}
            </span>
            <style jsx>
                {`
                .tooltip{
                    .title{
                        font-size:14px;
                        line-height:15px;
                        font-weight:600
                    }
                span{
                font-size: 12px;
                    margin-right: 4px;
                }
            }
                `}
            </style>
        </div>
    )
}
