import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts';
import { useState, useEffect } from "react";
import { Empty } from 'antd';

const ModalLineChart = ({data, threshold, title}) => {
  
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
                    <div style="font-size:14px; color:#1fb0ee; margin-bottom:4px; font-weight:600;line-height:12px">
                        ${title}
                    </div>
                    <div style="font-size:12px; color:#1fb0ee; margin-bottom:4px;line-height:12px">
                        ${params[0].axisValueLabel}
                    </div>
                    <div>
                    <div style="display:flex; align-items:center; gap:4px; font-size:12px;line-height:12px">${params[0].data[1]}
                    </div>
                    </div>
                `)
            }
        },
        legend: {
            show: false,
        },
        grid: {
            top: "10%",
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
            splitNumber:6,
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
        let seriesData = [
            {
              name:title,
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
              data: data
            }
          ]

          let dataArr = [];
          for(let i = 0; i < data.length; i++){
            dataArr.push([data[i][0], threshold])
          }

          seriesData.push(
            {
                type: 'line',
                symbol:'none',
                lineStyle:{
                    color: "rgba(0,0,0,0)",
                },
                markLine: {
                    data: [{type: 'average', yAxis:threshold}],
                    label:{
                        show:false,
                    },
                    symbolSize: 4,
                    lineStyle:{
                        color: "#bb2c08",
                        width:1
                    },
                    emphasis:{
                        lineStyle:{
                            width:2
                        },
                        label:{
                            show:true,
                            position: "insideMiddleBottom",
                            fontSize:10,
                            borderWidth:0,
                            backgroundColor:"#bb2c08",
                            color:"white",
                            padding:[2,4],
                            distance: -10
                        }
                    }
                  },
                data: dataArr
              }
          )
        setOptions({...options, series: seriesData })
    },[data])

    return (<>
     { data.length !== 0 ? <ReactECharts
            option={options}
            className="line"
            style={{ width: "100%", height: "100%" }}
        /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="데이터 없음" />}
    </>
      
    );
};

export default ModalLineChart;