import {useState, useEffect} from 'react';
import useStore from 'component/store/store';
import { Input, Tooltip ,message } from 'antd';
import { observer } from 'mobx-react';
import { DoubleRightOutlined, PlusOutlined } from '@ant-design/icons';
import { toJS } from 'mobx';

const MainContent = observer(() => {

    const store = useStore().Admin;

    const [serial, setSerial] = useState([])

    useEffect(() => {
        store.callSerialNumberAPI()
    },[])

    useEffect(() => {
        if(store.serialNumArr === []) return;
       setSerial(store.serialNumArr)
    },[store.serialNumArr])

    useEffect(() => {
        if(store.changeSerial === 0) return;
        message.success({
            content: '시리얼키 변경에 성공했습니다.', className:"successChange"
        })
    },[store.changeSerial])

    const changeInput = ({bearing, carriage}) => {
        let bearingCP = [...serial]
        bearingCP[Number(carriage)].bearing[Number(bearing) - 1].sensor_id = event.target.value;
        setSerial(bearingCP)
    }

    const handleKeyUp = e => {
        e.target.value = e.target.value.replace(/[^0-9]/g,'');
    }

    const sumitSearialNum = () => {
        const lengthIsNine = serial.filter(list => {
            let arr = list.bearing.filter(bearing => bearing.sensor_id.length !== 9)
            return arr.length !== 0
        })
        if(lengthIsNine.length === 0){
            store.postSerialNumberAPI(serial)
        } else {
            message.error({
                content: '시리얼 키의 양식은 9자리 숫자입니다', className:"adminMessage"
            })
            return;
        }

    }

    return(
        <div className="admin-main">
            <div className="title-box">
                <div className="title"><img src={require('assets/circle.svg')} alt="" /> 베어링 별 시리얼 번호</div>
                <div className="confirmBtn" onClick={sumitSearialNum}><PlusOutlined className='icon' />시리얼 변경</div>
            </div>
                {
                    serial !== [] && serial.map((list, i) => {
                        return(
                            <div className="carriage-box" key={i}>
                                <div className="title"><DoubleRightOutlined className='icon'/>{list.carriage_number}호차</div>
                                <div className="bearing-box">
                                      {list.bearing.map((bearing,j) => {
                                          return(
                                        <div className="bearing" key={j}>
                                            <div className="label">
                                               
                                            {bearing.bearing_number}번 베어링 :</div>
                                            <div className="serial"><Input type="text" maxLength='9' defaultValue={bearing.sensor_id} onChange={() => 
                                            changeInput({bearing:bearing.bearing_number, carriage: list.carriage_number})}
                                            onKeyUp={handleKeyUp}
                                            className={bearing.sensor_id.length !== 9 ? "err" : ""}
                                            /></div>
      
                                        </div>
                                        )
                                      })}
                                </div>
                            </div>
                        )
                    })
                }
            <style jsx>
                {`
                    .ant-message-notice{
                        background: white;
                    }
                `}
            </style>
        </div>
    )
})

export default MainContent;