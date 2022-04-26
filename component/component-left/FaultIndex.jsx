import FaultIndexChart from '../chart/FaultIndexChart'

const FaultIndex = () => {
  return (
      <div className="box">
        <div className="title">
          <img src={require('../../assets/circle.svg')} />
          <span>Fault Index</span>
        </div>
        <div className="content">
          <FaultIndexChart/>
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
}


export default FaultIndex;