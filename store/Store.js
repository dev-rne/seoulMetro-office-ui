import { observable } from 'mobx';

const GetInfo = observable({
    trainList:[],
    selectTrain:[],
    showList(value){
        this.trainList = value;
        this.selectTrain = value.train[0]
        console.log(this.selectTrain);
    },
    changeList(idx){
        for(let i = 0; i < this.trainList.train.length; i++){
            this.trainList.train[i].check = false;
        }
        this.trainList.train[idx].check = true;
        this.selectTrain = this.trainList.train[idx]
    }
})

const useStore = () => (GetInfo)

export default useStore;