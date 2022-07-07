import Marquee from "react-fast-marquee";
import React, { useEffect, useState } from "react";

const EventMarqee = ({baring}) => {

   const [bearingErr, setBearingErr] = useState(null);

   useEffect(() => {
    if(!baring) return;
    setBearingErr(baring);
   },[baring])

   return(
        <Marquee speed={50} gradient={false} pauseOnHover={true} loop={0} className="marqueeBox">
             {bearingErr?.map((list,i) => {
            return(
                <li key={i}>
                <div className="circle critical"></div>
                    <div className='alramList'>
                        <span>{list.carriage_number}</span>호차  
                        <span className="bearing">{list.bearing_number}</span>번 {list.anomaly_message}
                    </div>
                </li>
            )
            })}
                <style jsx>
                    {`
                        .marqueeBox{
                            height:100%;
                        }
                            
                        li{
                            display:flex;
                            list-style:none;
                            margin-right:40px;
                            align-items:center;
                            gap:10px;
                            position:relative;

                            .circle{
                                width:12px;
                                height:12px;
                                border-radius:10px;
                                background: radial-gradient(#0ac6ffa4,#08759696);

                                &.warning{
                                    background: radial-gradient(#ffdd1fa0,#96700894);
                                }
                                &.critical{
                                    background: radial-gradient(#ff2c2ca4,#b1020292);
                                }
                            }

                            .alramList{
                                display:flex;
                                align-items:center;
                                
                                span{
                                    color: #ff5943;
                                    font-weight:600;
                                }
                                .bearing{
                                    margin-left:4px;
                                }
                               
                            }
                            
                        }
                        li::after{
                            content:"";
                            position:absolute;
                            top:50%;
                            right:-20px;
                            width:1px;
                            height:80%;
                            transform:translateY(-50%);
                            background:#ffffff7b;
                        }
                        

                    `}
            </style>
        </Marquee>
   )

}

export default EventMarqee;