import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts';
import { useEffect, useState } from "react";

const color = [ "#17FFF3","#ff4e4e","#c4e75a"]
const colorOpacity = ["#17fff3b7", "#ff4e4ea9","#aecb569d"]
const colorOpacity2 = ["#17fff31f","#ff4e4e26","#aecb5636"]
const data = [
    {
        name: 'Email',
        data:[120, 132, 101, 134, 167, 330, 310, 160, 180, 90, 230, 210, 175, 104, 90]
    },
    {
        name: 'Union Ads',
        data:[220, 182, 191, 234, 290, 210, 150, 234, 290, 330,120, 132, 101, 134,120]
    }
]

const Spectrum = () => {


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
        for(let i = 0; i < 2; i++){
            dataArr.push({
                name: data[i].name,
                type: 'line',
                stack: false,                
                symbol:'circle',
                symbolSize:3,
                smooth:true,
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
                markLine: {
                    data: [{ type: 'average', name: 'Avg' }],
                    label:{
                        show:false,
                    },
                    symbolSize: 5,
                    emphasis:{
                        lineStyle:{
                            width:2
                        }
                    }
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

export default Spectrum;
