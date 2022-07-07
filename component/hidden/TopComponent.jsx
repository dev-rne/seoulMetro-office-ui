export default function TopComp(){

    return (
       <div className="top">
            <img src={require('assets/trainAssets/titleBG.svg')} className="bg" />
            <div className="top-box">
                <div className="img">
                <img src={require('assets/trainAssets/logo.svg')} alt="" className='logo'/>
                </div>
                <div className='title'>전동차 차축베어링 상태진단장치 시스템</div>
                    <div className="status-box">
                        <img src={require('assets/trainAssets/critical.png')} alt="" />
                    <div className="label">확인필요</div>
                </div>
            </div>
           <style jsx>
             {`
                 .top{
                    width:100%;
                    height:10%;
                    padding:30px;
                    position:relative;
                 }
                 .bg{
                     width:100%;
                     position:absolute;
                     top:10px;
                     left:0;
                     z-index:0;
                 }
                 .top-box{
                    width:100%;
                    height:100%;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    .img{
                        z-index:1;
                        width:20%;
                     img{
                         width:150px;
                     }
                    }
                    .title{
                        z-index:1;
                        font-size:20px;
                        font-weight:700;
                        width:50%;
                        text-align:center;
                        color:white;

                    }
                        .status-box{
                            z-index:1;
                            justify-content:end;
                            width:20%;
                            display:flex;
                            align-items:center;
                            padding-right:10px;

                            img{
                                width:50px;
                                transform:translateY(3px);
                            }
                            .label{
                                color:white;
                                font-weight:600;
                                font-size:14px;
                            }
                        }
                 }
             `}
           </style>
       </div>
    )
}
