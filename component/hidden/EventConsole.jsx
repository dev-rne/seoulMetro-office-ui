import EventMarqee from "component/hidden/EventMarquee";

const EventConsole = ({baring}) => {
    return (
        <div className="event">
            <div className="label">이벤트 콘솔</div>
            <div className="eventList">
                <EventMarqee baring={baring}/>
            </div>
          
            {/* =======✨여기서부터는 style✨ =======*/}
            <style jsx>
                {`
                    .event{
                        width:100%;
                        height:40px;
                        align-items:center;
                        display:flex;
                        gap:10px;
                        border: 1px solid #0b4a5e;
                        padding:4px 10px;
                        border-radius:12px;
                        background: #07172594;
                        
                        .label{
                            background: linear-gradient(to right, rgba(0,0,0,0) 5%, #006685,rgba(0,0,0,0) 95%);
                            color:#a9ebf7; 
                            width: 120px;
                            display:flex;
                            justify-content:center;
                            align-items:center;
                            height:100%;
                            font-weight:600;
                        }

                        .eventList{
                            width:calc(100% - 120px);
                            height:100%;
                            color: #fff;
                            display:flex;
                            align-items:center;                
                        }
                    }
                `}
            </style>
        </div>
    )
}

export default EventConsole;
