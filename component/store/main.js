import { observable } from 'mobx';
import axios from 'axios';

const Main = observable({
    trainList:[],
    selectTrain:[],
    selectTrainStatus:[],
    eventData:[],
    showModal:false,
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
            this.trainList = response.data;
            this.selectTrain = response.data.train[0];
            this.selectTrainStatus = response.data.train[0];
        });
    },
    callEventData(){
        axios.get('./data/eventConsole.json').then(response => {
            console.log(response.data.event);
            this.eventData = response.data.event;
        });
    }
})

export default Main;