import { observable } from 'mobx';

const Main = observable({
    login:false,
    setLogin(){
        this.login = true
    }
})

export default Main;