const PopoverBearing = ({ i,j,bearingAnomaly}) => {

    return(
        <div className="pop">
            <span className="name">{i}-{j + 1}번 베어링</span>
            <span className="critical">{ bearingAnomaly && bearingAnomaly.filter(list => list.bearing_number === j + 1 && list.carriage_number === i)[0]?.anomaly_message}</span>
            <style jsx>
                {`
                   .pop{
                       display:flex;
                       gap:6px;
                       align-items:center;
                       .name{
                           color:#ffb1a3;
                           font-weight:600;
                           letter-spacing:1px;
                       }
                   } 
                `}
            </style>
        </div>
    )
}

export default PopoverBearing;