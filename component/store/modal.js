import { observable } from 'mobx';
import axios from 'axios';

const Main = observable({
    faultStatusData:[],
    callFaultStatusData(){
        axios.get('./data/faultStatus.json').then(res => {
            this.faultStatusData = res.data.data;
        });
    }
   
})

export default Main;