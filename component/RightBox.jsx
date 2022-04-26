import { observer } from 'mobx-react';
import BoxFrame from './BoxFrame';

import Spectrum from './component-right/Spectrum';
import Waveform from './component-right/Waveform';
import BaringStatus from './component-right/BaringStatus';

const RightBox = observer(() => {
  return (
    <div className="right-box">
    <div className="box">
      <BoxFrame/>
      <Waveform/>
    </div>
    <div className="box">
      <BoxFrame/>
      <Spectrum/>
    </div>
    <div className="box">
      <BoxFrame/>
      <BaringStatus/>
    </div>
    <style jsx>
     {`
     .right-box{
      width:22%;
      height:100%;
      display:flex;
      flex-direction:column;
      gap:12px;

      .box{
        width:100%;
        height:calc((100% - 24px) / 3);
        border:1px solid #0AA4DE;
        position:relative;
        border-radius:10px;
        background:rgba(0,0,0,0.3)
      }
    }
     `}
    </style>
  </div>
  )
})


export default RightBox;