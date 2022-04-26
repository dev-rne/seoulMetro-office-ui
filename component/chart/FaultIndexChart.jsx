import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts';
import { useEffect, useState } from "react";
import sample from 'public/data/scatterSample.json'

const color = [ "#1ea5ff","#0fe4d6","#c4e75a"]
const colorOpacity = ["#0094f689", "#00d4c688","#aecb569d"]
const colorOpacity2 = ["#0094f629","#00d4c624","#aecb5636"]

const Scatter = () => {

    const [options, setOptions] = useState({
        tooltip: {
            trigger: "item",
            textStyle:{
                fontSize:10,
                color:"white"
            },
            backgroundColor:"rgba(0,0,0,0.8)",
            borderColor:"#116386"
        },
        legend: {
            show: false,
            bottom: 0,
            textStyle: {
                color: "#30EEE9",
                fontSize: 10,
            },
            itemStyle: {
                opacity: 0,
            },
        },
        grid: {
            top: "12%",
            left: "10%",
            right:"3%",
            bottom: "12%",
        },
        xAxis: {
            type: "value",
            scale: true,
            boundaryGap: false,
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: "#2592b3",
                fontSize:10,
                width: 50,
                overflow:"truncate",
                ellipsis: "...",
                formatter: '{value} cm'
            },
            splitNumber:8,
            splitLine: {
                show:false,
                lineStyle: {
                    color: "#11366ea0",
                },
            },
            axisLine: {
                lineStyle: {
                    color: "#195384",
                },
            },
        },
        yAxis: {
            type: "value",
            scale: true,
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: "#195384",
                },
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#11366ea0",
                },
            },
            axisLabel: {
                fontSize:10,
                color: "#2592b3",
                formatter: '{value} kg'
            },
        },
        dataZoom:[{
            type:"inside",
            start:0,
            end:100
        }],
        series: []
    })


    useEffect(() => {
        const dataArr = []
        for(let i = 0; i < 2; i++){
            dataArr.push({
                type: 'scatter',
                symbol:'circle',
                symbolSize:5,
                itemStyle:{
                    color: color[i],
                    opacity: 0.5
                },
                data: sample.data[i]
              })
        }
        setOptions({
            ...options,
            series:dataArr
        })
    },[])
    return (
        <ReactECharts
            option={options}
            className="line"
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default Scatter;
