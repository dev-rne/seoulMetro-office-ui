import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts';
import { useState } from "react";

const ModalSpectrumChart = () => {
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
            show: true,
            top: 0,
            itemWidth:10,
            textStyle: {
                color: "#dcecfa",
                fontSize: 8,
            },
            itemStyle: {
                opacity: 0,
            },
        },
        grid: {
            top: "12%",
            left: "10%",
            right:"5%",
            bottom: "15%",
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
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: "#11366e52",
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
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: false,                
            symbol:'circle',
            symbolSize:3,
            smooth:true,
            lineStyle:{
                color: "#1b98ff",
                width:1
            },
            itemStyle:{
                color:"#1b98ff"
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#1b98ff9b"
                  },
                  {
                    offset: 0.7,
                    color:"#04eeff26"
                  }
                ])
            },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }],
                label:{
                    show:false,
                },
                symbolSize: 4,
                emphasis:{
                    lineStyle:{
                        width:2
                    }
                }
              },
            data: [120, 132, 101, 134, 167, 330, 310, 160, 180, 90, 230, 210, 175, 104, 90]
          }
        ]
    })

    return (
        <ReactECharts
            option={options}
            className="line"
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default ModalSpectrumChart;