import useStore from 'component/store/store.js';
import { observer } from 'mobx-react';
import { Progress, Tooltip, Select, Spin } from 'antd';
import ModalLineChart from 'component/chart/ModalLineChart';
import BoxFrameSmall from './BoxFrameSmall';
import {useState, useEffect, useRef} from 'react';
import { CSVLink } from "react-csv";
import { QuestionCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import modalQuestion from 'public/data/modalQuestion.json';
import moment from 'moment'

const ModalContents = observer(({bearing, visible}) => {
    const store = useStore().Main;
    const modal = useStore().Modal;

    const csvLink = useRef()
    const { Option } = Select;

    const [status, setStatus] = useState(false);
    const [progress,setProgress] = useState([]);
    const date = moment().format("YYYY-MM-DD")

    const label = [
        {key:"acq_time",title:"일시"},
        {key:"rms",title:"RMS"},
        {key:"peak_to_peak",title:"Peak to peak"},
        {key:"kurtosis",title:"첨도"},
        {key:"crest_factor",title:"파고율"},
        {key:"shape_factor",title:"형태 인자"},
        {key:"temperature",title:"온도"}
    ]

    const resetPeriod = {
        rms:{
            today:false,
            lastWeek: true,
            month:false,
            threeMonth:false
            },
        peak_to_peak:{
            today:false,
            lastWeek: true,
            month:false,
            threeMonth:false
            },
        kurtosis:{
            today:false,
            lastWeek: true,
            month:false,
            threeMonth:false
            },
        crest_factor:{
            today:false,
            lastWeek: true,
            month:false,
            threeMonth:false
            },
        shape_factor:{
            today:false,
            lastWeek: true,
            month:false,
            threeMonth:false
            },
        temperature:{
            today:false,
            lastWeek: true,
            month:false,
            threeMonth:false
            }}

    const [period, setPeriod] = useState(resetPeriod)
    const [csvPeriod, setCsvPeriod] = useState("lastWeek");
    const [csvData, setCsvData] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if(modal.statusData === []) return;
        setStatus(modal.statusData.anomaly_detected);
        let dataArr = []
        for(let key in modal.statusData){
            if(key !== "anomaly_detected")dataArr.push(modal.statusData[key])
        }
        setProgress(dataArr)
    },[modal.statusData])

    useEffect(() => {
        setPeriod(resetPeriod)
    },[visible])

    const chartData = [
        {
            title: "RMS",
            data: modal.modalRms,
            threshold: modal.rmsThreshold,
            code: "rms"
        },
        {
            title: "Peak to peak",
            data:  modal.modalPeakToPeak,
            threshold:  modal.peakToPeakThreshold,
            code: "peak_to_peak"
        },
        {
            title: "첨도",
            data:  modal.modalKurtosis,
            threshold:  modal.kurtosisThreshold,
            code: "kurtosis"
        },
        {
            title: "파고율",
            data:  modal.modalCrestFactor,
            threshold:  modal.crestFactorThreshold,
            code: "crest_factor"
        },
        {
            title: "형태 인자",
            data:  modal.modalShapeFactor,
            threshold: modal.shapeFactorThreshold,
            code: "shape_factor"
        },
        {
            title: "온도",
            data:  modal.modalTemperature,
            threshold:  modal.temperatureThreshold,
            code: "temperature"
        },
    ]

    const clickThePeriod = (date, category) => {
        modal.callPeriodChartData({date ,category })
        let data = {...period}

        data[category].today = false
        data[category].lastWeek = false
        data[category].month = false
        data[category].threeMonth = false
        data[category][date] = true;
        setPeriod(data)
    }

    const handleChange = (value) => {
        setCsvPeriod(value)
    }

    const downloadCSV = () => {
        setLoading(true)
        modal.callCsvData(csvPeriod)
    }
    useEffect(() => {
        let data = modal.csvData
        if(data.length === 0) return;
        let dataArr = [];
        for(let i = 0; i < data.rms?.acq_time.length; i++){
            dataArr.push({
                acq_time : data.rms.acq_time[i],
                rms:data.rms.value[i],
                peak_to_peak: data.peak_to_peak.value[i], 
                kurtosis: data.kurtosis.value[i], 
                crest_factor: data.crest_factor.value[i], 
                shape_factor: data.shape_factor.value[i], 
                temperature: data.temperature.value[i]
            })
        }
        setCsvData(dataArr)
    },[modal.csvData])

    useEffect(() => {
        if(csvData.length === 0) return;
        csvLink.current.link.click();
        setLoading(false)
    },[csvData])
  
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
                        <span>베어링 상태</span>
                    </div>
                    <div className={status ? "err status" : "status"}>
                        <span className={status ? "err" : ""}>{status ? "고장" : "정상"}</span>
                    </div>
                </div>

                <div className="progress-box">
                    <div className="title-box">
                        <div className="title">특성인자 현재 상태 비율</div>
                        <div className="question">
         <Tooltip placement="topRight" color="#0776d1da" overlayClassName="questionTooltipRight" trigger="click" title={modalQuestion.data.filter(data => "statusPercent" === data.code)[0].label}>
          <QuestionCircleOutlined className="icon"/></Tooltip>
         </div>
                    </div>
                    <div className="chart-box">
                    {progress.map((list,i) => 
                     <Tooltip placement="top" title={title({ value:Number(list.data).toFixed(0), threshold:list.threshold, title:list.title})} key={i} color={Number(list.data).toFixed(0) >= 100 ? "#d62809ea" : "#0056f7da"}>
                       <div className="chart">
                         <Progress percent={Number(list.data).toFixed(0)} showInfo={false} className="progress" strokeLinecap="square" strokeColor={Number(list.data).toFixed(0) >= 100 ? {from: '#c41508ee',to: '#ff4343'} :{from: '#003adb',to: '#1f78cc'}}/>
                         <div className="label"><div className={Number(list.data).toFixed(0) >= 100 ? "num err": 'num'}>{i+1}</div>{Number(list.data).toFixed(0)}%</div>
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
                            <div className="title-box">
                                <div className="title">
                                <div className='num'>{ i + 1 }</div>{list.title}</div>
                                <div className="select-box">
                                    <div className="period">
                                        <div className={period[list.code].today ? "btn selectBtn" : "btn"} onClick={() =>
                                            clickThePeriod("today", list.code)}>당일</div>
                                        <div className={period[list.code].lastWeek ? "btn selectBtn" : "btn"} onClick={() =>
                                            clickThePeriod("lastWeek", list.code)}>1주일</div>
                                        <div className={period[list.code].month ? "btn selectBtn" : "btn"} onClick={() =>
                                            clickThePeriod("month", list.code)}>1달</div>
                                        <div className={period[list.code].threeMonth ? "btn selectBtn" : "btn"} onClick={() =>
                                            clickThePeriod("threeMonth", list.code)}>3달</div>
                                    </div>
                                    <Tooltip placement={(i)%2 === 0 ? "top" : "topRight"} color="#0776d1da" overlayClassName={(i)%2 === 0 ? "questionTooltip" : "questionTooltipRight"} trigger="click" title={modalQuestion.data.filter(data => list.code === data.code)[0].label}>
                                    <QuestionCircleOutlined className="icon"/></Tooltip>
                                </div>
                            </div>
                            <div className="content">
                           
                                <ModalLineChart data={list.data} threshold={list.threshold} title={list.title}/>
                            
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="download-box">
                <div className="label">CSV 엑셀 추출하기 :</div>
                    <Select defaultValue="lastWeek" style={{ width: 150 }} onChange={handleChange}>
                        <Option value="today">당일</Option>
                        <Option value="lastWeek">1주일</Option>
                        <Option value="month">
                        1달
                        </Option>
                        <Option value="threeMonth">3달</Option>
                    </Select>
                    <div className="downloadBtn" onClick={downloadCSV}><DownloadOutlined />다운로드</div>
                    <CSVLink target="_blank"  filename={`${date}_bearing${modal.selectLocation}${csvPeriod}`} data={csvData} headers={label} className="hidden" ref={csvLink} />
            </div>
            <div className={loading ? "loading" : "unLoading loading"}>
                <Spin size="large" />
                <div className="label">데이터를 수집중입니다.</div>
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
                값: {value}% /
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
                span {
                font-size: 12px;
                    margin-right: 4px;
                }
            }
                `}
            </style>
        </div>
    )
}
