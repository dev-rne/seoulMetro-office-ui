import { observable, runInAction } from 'mobx';
import axios from 'axios';
import {config} from 'config.js'

const Main = observable({
    trainList:[],
    selectTrain:[],
    selectTrainStatus:[],
    eventData:[],
    showModal:false,
    anomaly: [],
    location:"",
    rms:[],
    totalData:[],
    statusData:[],
    showList(value){
        this.trainList = value;
        this.selectTrain = value.train[0]
    },
    changeList(idx){
        for(let i = 0; i < this.trainList.train.length; i++){
            this.trainList.train[i].check = false;
        }
        this.trainList.train[idx].check = true;
        this.selectTrain = this.trainList.train[idx]
        this.selectTrainStatus = this.trainList.train[idx];

    },
    callTrainData(){
        axios.get('./data/train.json').then(response => {
           runInAction(() => {
            this.trainList = response.data;
            this.selectTrain = response.data.train[0];
            this.selectTrainStatus = response.data.train[0];
           })
        });
    },
    async callAnomaly(){
       
        await axios.get(`${config.api}/api/rule/carriage-info`).then(response => {
           runInAction(() => {
            this.anomaly = response.data;
            this.location = response.data[0]?.bearing_location
           })
        });
    },
    callRms(location){
        axios.get(`${config.api}/api/rule/data-feature?category=rms&bearingLocation=${location}
        `).then(response => {
            runInAction(() => {
                this.rms = response.data;
            })
        });
    },
    setLocation(location){
        this.location = location
    },
    callTotalChart(location){
        axios.get(`${config.api}/api/rule/data-feature?bearingLocation=${location}
        `).then(response => {
            runInAction(() => {
                this.totalData = response.data;
            })
        });
    },
    callModalStatus(location){
        axios.get(`${config.api}/api/rule/data-diagnosis?bearingLocation=${location}
        `).then(response => {
            runInAction(() => {
                this.statusData = response.data;
            })
        });
    },
})

export default Main;