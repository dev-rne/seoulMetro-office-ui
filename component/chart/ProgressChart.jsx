import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import useStore from 'component/store/store.js';
import { observer } from 'mobx-react';

const ProgressChart =  observer(() => {

    const store = useStore().Main;

    useEffect(() => {
        if(store.statusData === []) return;
        
    },[store.statusData])

    const [options, setOptions] = useState({
        grid: {
            top: "8%",
            left: "0%",
            right:"0%",
            bottom: "1%",
            containLabel: true
        },
        xAxis: {
            type: "category",
            axisTick: {
                show: false,
            },
            axisLabel: {
                show:false,
            },
            splitLine: {
                show:false,
            },
            axisLine: {
                lineStyle: {
                    color: "#346d949f",
                },
            },
        },
        yAxis: {
            type: "value",
            axisTick: {
                show: false,
            },
            splitLine: {
                show:false,
            },
            axisLabel: {
                show:false,
            },
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ],
        color:["#1080ffc0"]
    })

    return (
        <ReactECharts
            option={options}
            className="line"
            style={{ width: "100%", height: "100%" }}
        />
    );
});


export default ProgressChart;