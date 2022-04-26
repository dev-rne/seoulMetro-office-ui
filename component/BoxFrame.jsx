const BoxFrame = () =>{
    return(
        <div className="boxFrame">
             <div className="box-edge top-L blur"></div>
            <div className="box-edge top-R blur"></div>
            <div className="box-edge bottom-L blur"></div>
            <div className="box-edge bottom-R blur"></div>
            <div className="box-edge top-L"></div>
            <div className="box-edge top-R"></div>
            <div className="box-edge bottom-L"></div>
            <div className="box-edge bottom-R"></div>
            <style jsx>
                {`
                .boxFrame{
                    width:100%;
                    height:100%;
                    position: absolute;
                    top:0;
                    left:0;

                    .box-edge{
                        width: 15px;
                        height: 15px;
                        position: absolute;
                        z-index:0;
                    }
                    .top-L{
                        top: -1px;
                        left: -1px;
                        border-top: 2px solid #00c3ff;
                        border-left: 2px solid #00c3ff;
                        border-top-left-radius: 12px;
                    }
                    .top-R{
                        top: -1px;
                        right: -1px;
                        border-top: 2px solid #00c3ff;
                        border-right: 2px solid #00c3ff;
                        border-top-right-radius: 12px;
                    }
                    .bottom-L{
                        bottom: -1px;
                        left: -1px;
                        border-bottom: 2px solid #00c3ff;
                        border-left: 2px solid #00c3ff;
                        border-bottom-left-radius: 12px;
                    }
                    .bottom-R{
                        bottom: -1px;
                        right: -1px;
                        border-bottom: 2px solid #00c3ff;
                        border-right: 2px solid #00c3ff;
                        border-bottom-right-radius: 12px;
                    }
        
                    .blur{
                        filter: blur(4px);
                        -webkit-filter: blur(4px);
                        border-color: #00fff2;
                    }
                }
                `}
            </style>
        </div>
    )
}

export default BoxFrame;