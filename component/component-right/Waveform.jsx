import { observer } from 'mobx-react';
import WaveformChart from '../chart/WaveformChart'

const Waveform = observer(() => {

  return (
      <div className="box">
        <div className="title">
          <img src={require('../../assets/circle.svg')} />
          <span>Waveform</span>
        </div>
        <div className="content">
          <WaveformChart/>
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


export default Waveform;