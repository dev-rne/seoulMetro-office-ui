import FalutProbabilityChart from '../chart/FaultProbabilityChart'

const FalutProbability = () => {
  return (
      <div className="box">
        <div className="title">
          <img src={require('../../assets/circle.svg')} />
          <span>Fault Probability</span>
        </div>
        <div className="content">
          <FalutProbabilityChart/>
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


export default FalutProbability;