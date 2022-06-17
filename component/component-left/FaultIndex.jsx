import LineChartRms from 'component/chart/LineChartRms';
import useStore from 'component/store/store.js';
import {useState, useEffect} from 'react';
import { observer } from 'mobx-react';

const FaultIndex =  observer(() => {

  const store = useStore().Main;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setLocation(store.location)
  },[store.location])

  return (
      <div className="box">
        <div className="title">
          <img src={require('../../assets/circle.svg')} />
          <span>Anomaly bearing RMS trend [{location}]</span>
        </div>
        <div className="content">
          <LineChartRms data={store.rms} />
        </div>
        <style jsx>
         {`
         .box{
          padding:10px;
           display:flex;
           flex-direction:column;
           height:100%;

           .title{
            width:100%;
            display:flex;
            gap:6px;
            color:white;
            font-size:16px;
            font-weight:500;
            align-items:center;
           }
           .content{
             flex:1;
           }
         }
         `}
        </style>
      </div>
  )
})


export default FaultIndex;