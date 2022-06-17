import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts';
import { useState, useEffect } from "react";
import { Empty } from 'antd';

const ModalLineChart = ({data}) => {
  
    const [options, setOptions] = useState({
        tooltip: {
            trigger: "axis",
            textStyle:{
                fontSize:10,
                color:"white"
            },
            backgroundColor:"rgba(0,0,0,0.8)",
            borderColor:"#116386",
            formatter:(params) => {
                return(`
                    <div style="font-size:12px; color:#1fb0ee; margin-bottom:4px;">
                        ${params[0].axisValueLabel}
                    </div>
                    <div>
                    <div style="display:flex; align-items:center; gap:4px; font-size:14px;">${params[0].data[1]}
                    </div>
                    </div>
                `)
            }
        },
        legend: {
            show: false,
        },
        grid: {
            top: "5%",
            left: "1%",
            right:"2%",
            bottom: "1%",
            containLabel: true
        },
        xAxis: {
            type: "time",
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
            splitNumber:5,
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
        series: []
    })

    useEffect(() => {
        if(!data) return;
        let dataArr=[]
        for(let i = 0; i < data.rms?.acq_time.length; i++){
            dataArr.push([data.rms.acq_time[i], data.rms.value[i]])
        }
        setOptions({...options, series:[{
                  type: 'line',
                  stack: false,                
                  symbol:'circle',
                  symbolSize:3,
                  smooth:true,
                  lineStyle:{
                      color: "#3ca7ff",
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
                          color: "#20adff9b"
                        },
                        {
                          offset: 0.7,
                          color:"#208ad136"
                        }
                      ])
                  },
                  markLine: {
                      data: [{ type: 'average', yAxis:data.rms?.threshold }],
                      label:{
                          show:false,
                      },
                        lineStyle:{
                            color: "#ee6c44"
                      },
                      symbolSize: 4,
                      emphasis:{
                          lineStyle:{
                              width:2
                          }
                      }
                    },
                  data:dataArr}]});
    },[data])

    return (
        <>
     {data.length !== 0 ? <ReactECharts
            option={options}
            className="line"
            style={{ width: "100%", height: "100%" }}
        /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </>
    );
};

export default ModalLineChart;