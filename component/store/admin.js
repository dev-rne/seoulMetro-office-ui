import axios from 'axios';
import { observable } from 'mobx';

const Admin = observable({
    serialNumArr:[],
    changeSerial:0,
    callSerialNumberAPI(){
        axios.get(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/rule/sensors`).then(res=>{
            this.serialNumArr = res.data;
        })
    },
    postSerialNumberAPI(data){
        axios.post(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/rule/sensors`, data).then((res) => {
            this.callSerialNumberAPI()
            this.changeSerial++
        })
    }
})

export default Admin;