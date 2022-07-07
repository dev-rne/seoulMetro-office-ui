import Seo from 'component/Seo';
import TopComp from 'component/hidden/TopComponent';
import MainContent from 'component/hidden/MainContent';
import { Modal, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import LoginInfo from 'public/data/sec_login.json'
import { ForwardOutlined } from '@ant-design/icons';

const Hidden = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [login, setLogin] = useState(false)

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if(!user){
      setIsModalVisible(true)
    }else{
      setLogin(true)
    }
  },[])

  const confirmLogin = () => {
    if(id === "" || pw === "") {
      message.error("양식을 완성해 주세요");
      return;
    }
    const user = LoginInfo.loginInfo.filter((list) => list.id === id);
    const userPw = user.filter((list) => list.pw === pw);

    if(userPw.length === 0) {
      message.error("아이디나 비밀번호를 확인해주세요");
      return;
    }
    sessionStorage.setItem("user", id);
    setLogin(true)
    setIsModalVisible(false)
  }

  const inputID = (value) => {
    setId(value.target.value)
  }
  const inputPW = (value) => {
    setPw(value.target.value)
  }
  return (
     <div className="sec_home">
      <Seo title="Hidden-Dashboard"/>
      <TopComp/>
      <div className='content-box'>
        <MainContent login={login} />
      </div>
      
      {/* =======✨여기서부터는 style✨ =======*/}
      <style jsx>
                {`
                    .sec_home{
                      display:flex;
                      width:100%;
                      height:100vh;
                      overflow:hidden;
                      flex-direction:column;

                      .content-box{
                        flex:1;
                        padding:20px;
                        padding-top:0;
                      }
                    }
                `}
            </style>
           
      <Modal visible={isModalVisible} footer={null} closable="" wrapClassName="sec_mask" className="loginModal">
        <div className="login-box">
          <img src={require('assets/logo.svg')} alt="" className='logo'/>
          <div className="input-box">
            <Input placeholder="ID" onChange={inputID} defaultValue="" onPressEnter={confirmLogin} />
            <Input placeholder="PW" onChange={inputPW} type="password" defaultValue="" onPressEnter={confirmLogin}/>
          </div>

          <div className="login-btn" onClick={confirmLogin}>LOGIN
          <ForwardOutlined className="icon"/>
          </div>
          </div>
      </Modal>
    </div>
  )
}

export default Hidden;