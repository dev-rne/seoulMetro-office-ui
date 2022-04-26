import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts';
import { useEffect, useState } from "react";

const color = [ "#1ea5ff","#0fe4d6","#c4e75a"]
const colorOpacity = ["#0094f689", "#00d4c688","#aecb569d"]
const colorOpacity2 = ["#0094f629","#00d4c624","#aecb5636"]
const data = [
    {
        name: 'Email',
        data:[120, 132, 101, 134, 90, 230, 210, 101, 134, 90]
    },
    {
        name: 'Union Ads',
        data:[220, 182, 191, 234, 290, 330, 310, 234, 290, 330]
    },
    {
        name: 'Video Ads',
        data: [150, 232, 201, 154, 190, 330, 410, 232, 201, 154]
    },
]

const Line = () => {


    const [options, setOptions] = useState({
        tooltip: {
            trigger: "axis",
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
            type: "category",
            boundaryGap: false,
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: "#2592b3",
                fontSize:10,
                width: 50,
                overflow:"truncate",
                ellipsis: "..."
            },
            splitNumber:8,
            splitLine: {
                show:true,
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
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: "#11366ea0",
                },
            },
            axisLabel: {
                fontSize:10,
                color: "#2592b3",
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
        for(let i = 0; i < 3; i++){
            dataArr.push({
                name: data[i].name,
                type: 'line',
                stack: 'Total',
                symbol:'circle',
                symbolSize:3,
                lineStyle:{
                    color:color[i],
                    width:1
                },
                itemStyle:{
                    color: color[i]
                },
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: colorOpacity[i]
                      },
                      {
                        offset: 0.7,
                        color: colorOpacity2[i]
                      }
                    ])
                },
                data: data[i].data
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

export default Line;
