import { observable, runInAction } from 'mobx';
import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_AXIOS_URL

const Main = observable({
    trainList:[],
    selectTrain:[],
    selectTrainStatus:[],
    eventData: [],
    showModal: false,
    anomaly: [],
    location:"",
    rms:[],
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
    callAnomaly(){
        // axios.get(`${apiKey}/api/rule/carriage-info`)
        axios.get('./data/carriage-info.json').then(response => {
           runInAction(() => {
            this.anomaly = response.data;
            // this.location = response.data[0]?.bearing_location
           })
        });
    },
    callRms({location, date}){
        // axios.get(`${apiKey}/api/rule/data-feature?category=rms&bearingLocation=${location}&startDate=${date}
        // `)
        axios.get('./data/rms.json').then(response => {
            runInAction(() => {
                this.rms = response.data;
            })
        });
    },
    setLocation(location){
        this.location = location
    },
    resetRms(){
        this.rms = []
    }
})

export default Main;