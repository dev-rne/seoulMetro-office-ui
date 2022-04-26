import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts';
import { useEffect, useState } from "react";

const color = [ "#1ff896","#ffd42a","#c4e75a"]
const colorOpacity = ["#1ff896b7", "#ffd42ab9","#aecb569d"]
const colorOpacity2 = ["#1ff8962f","#ffd42a3d","#aecb5636"]
const XData=[
    ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12'],
    ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
]
const data = [
    {
        name: 'Email',
        data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
        name: 'Union Ads',
        data:[ 3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
    },
]

const WaveForm = () => {


    const [options, setOptions] = useState({
        tooltip: {
            trigger: 'none',
            textStyle:{
                fontSize:10,
                color:"white"
            },
            axisPointer: {
                type: 'cross',
                label:{
                    fontSize:10,
                    padding:[4,4,2,4]
                }
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
            top: "17%",
            left: "10%",
            right:"5%",
            bottom: "11%",
        },
        xAxis: {},
        yAxis: {
            type: "value",
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: "#4a7d8d55",
                },
            },
            axisLabel: {
                fontSize:10,
                color: "#4a7d8d",
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
        const dataArr2 = []
        for(let i = 0; i < 2; i++){
            dataArr.push({
                name: data[i].name,
                type: 'line',
                symbol:'circle',
                smooth: true,
                symbolSize:5,
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

              dataArr2.push({
                type: "category",
                boundaryGap: false,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    color: colorOpacity[i],
                    fontSize:10,
                    width: 50,
                    overflow:"truncate",
                    ellipsis: "..."
                },
                splitNumber:8,
                splitLine: {
                    show:false,
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colorOpacity[i],
                    },
                },
                data:XData[i]
            })
        }
        setOptions({
            ...options,
            series:dataArr,
            xAxis:dataArr2
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

export default WaveForm;
