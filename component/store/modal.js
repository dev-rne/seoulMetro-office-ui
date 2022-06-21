import { observable, runInAction } from 'mobx';
import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_AXIOS_URL;

const Main = observable({
    faultStatusData : [],
    statusData : [],
    modalRms : [],
    modalPeakToPeak : [],
    modalKurtosis : [],
    modalCrestFactor : [],
    modalShapeFactor : [],
    modalTemperature : [],
    rmsThreshold : 0,
    peakToPeakThreshold : 0,
    kurtosisThreshold : 0,
    crestFactorThreshold : 0,
    shapeFactorThreshold : 0,
    temperatureThreshold : 0,
    selectLocation : "",
    callTotalData:0,
    callObjectData:0,
    callFaultStatusData(){
        axios.get('./data/faultStatus.json').then(res => {
            this.faultStatusData = res.data.data;
        });
    },
    callTotalChart(date){
        axios.get(`${apiKey}/api/rule/data-feature?bearingLocation=${this.selectLocation}&startDate=${date}
        `).then(response => {
            this.resetData();
            runInAction(() => {
                let data = response.data
                for(let i = 0; i < data.rms?.acq_time.length; i++){
                    this.modalRms.push([data.rms.acq_time[i], data.rms.value[i]])
                    this.modalPeakToPeak.push([data.peak_to_peak.acq_time[i], data.peak_to_peak.value[i]])
                    this.modalKurtosis.push([data.kurtosis.acq_time[i], data.kurtosis.value[i]])
                    this.modalCrestFactor.push([data.crest_factor.acq_time[i], data.crest_factor.value[i]])
                    this.modalShapeFactor.push([data.shape_factor.acq_time[i], data.shape_factor.value[i]])
                }
                for(let i = 0; i < data.temperature?.acq_time.length; i++){
                    this.modalTemperature.push([data.temperature.acq_time[i], data.temperature.value[i]])
                }
                    this.rmsThreshold =  data.rms?.threshold;
                    this.peakToPeakThreshold = data.peak_to_peak?.threshold;
                    this.kurtosisThreshold =  data.kurtosis?.threshold;
                    this.crestFactorThreshold =  data.crest_factor?.threshold;
                    this.shapeFactorThreshold =  data.shape_factor?.threshold;
                    this.temperatureThreshold =  data.temperature?.threshold;
            })
            this.callTotalData++
        });
    },
    callModalStatus(location){
        axios.get(`${apiKey}/api/rule/data-diagnosis?bearingLocation=${location}
        `).then(response => {
            runInAction(() => {
                this.statusData = response.data;
            })
        });
    },
    callPeriodChartData({date, category}){
        axios.get(`${apiKey}/api/rule/data-feature?category=${category}&bearingLocation=${this.selectLocation}&startDate=${date}
        `).then(response => {
            runInAction(() => {
                switch(category){
                    case "rms":
                        this.modalRms = this.settingArray(response.data, category)
                        this.rmsThreshold = response.data.rms.threshold;
                        break;
                    case "peak_to_peak":
                        this.modalPeakToPeak = this.settingArray(response.data, category)
                        this.peakToPeakThreshold = response.data.peak_to_peak.threshold;
                        break;
                    case "kurtosis":
                        this.modalKurtosis = this.settingArray(response.data, category)
                        this.kurtosisThreshold = response.data.kurtosis.threshold;
                        break;
                    case "crest_factor":
                        this.modalCrestFactor = this.settingArray(response.data, category)
                        this.crestFactorThreshold = response.data.crest_factor.threshold;
                        break;
                    case "shape_factor":
                        this.modalShapeFactor = this.settingArray(response.data, category)
                        this.shapeFactorThreshold = response.data.shape_factor.threshold;
                        break;
                    case "temperature":
                        this.modalTemperature = this.settingArray(response.data, category);
                        this.temperatureThreshold = response.data.temperature.threshold;
                        break;
                }
            })
            this.callObjectData++
        });
    },
    settingArray(data,key){
        let dataArr = []
        for(let i = 0; i < data[key].acq_time.length; i++){
            dataArr.push([ data[key].acq_time[i],  data[key].value[i]])
        }
        return dataArr;
    },
    resetData(){
        this.modalRms = []
        this.modalPeakToPeak = []
        this.modalKurtosis = []
        this.modalCrestFactor = []
        this.modalShapeFactor = []
        this.modalTemperature = []
        this.rmsThreshold = 0
        this.peakToPeakThreshold = 0
        this.kurtosisThreshold = 0
        this.crestFactorThreshold = 0
        this.shapeFactorThreshold = 0
        this.temperatureThreshold = 0
    }
})

export default Main;