import { observer } from 'mobx-react';
import BoxFrame from './BoxFrame';

import FalutStatus from './component-left/FaultStatus';
import FalutProbability from './component-left/FalutProbability';
import FaultIndex from './component-left/FaultIndex';

const LeftBox = observer(() => {

  return (
      <div className="left-box">
        <div className="box">
          <BoxFrame/>
          <FalutStatus/>
        </div>
        <div className="box">
          <BoxFrame/>
          <FalutProbability/>
        </div>
        <div className="box">
          <BoxFrame/>
          <FaultIndex/>
        </div>
        <style jsx>
         {`
         .left-box{
          width:23%;
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


export default LeftBox;