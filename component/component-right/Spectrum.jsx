import { observer } from 'mobx-react';
import SpectrumChart from '../chart/SpectrumChart'

const Spectrum = observer(() => {

  return (
      <div className="box">
        <div className="title">
          <img src={require('../../assets/circle.svg')} />
          <span>Spectrum</span>
        </div>
        <div className="content">
          <SpectrumChart/>
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


export default Spectrum;