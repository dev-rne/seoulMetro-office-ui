const BoxFrame = ({edge}) =>{
    return(
        <div className="boxFrame">
             <div className="box-edge top-L "></div>
            <div className="box-edge top-R "></div>
            <div className="box-edge bottom-L "></div>
            <div className="box-edge bottom-R "></div>
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
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        z-index:0;
                    }
                    .top-L{
                        top: -1px;
                        left: -1px;
                        border-top: 1px solid #BBE3F8;
                        border-left: 1px solid #BBE3F8;
                    }
                    .top-R{
                        top: -1px;
                        right: -1px;
                        border-top: 1px solid #BBE3F8;
                        border-right: 1px solid #BBE3F8;
                    }
                    .bottom-L{
                        bottom: -1px;
                        left: -1px;
                        border-bottom: 1px solid #BBE3F8;
                        border-left:1px solid #BBE3F8;
                    }
                    .bottom-R{
                        bottom: -1px;
                        right: -1px;
                        border-bottom: 1px solid #BBE3F8;
                        border-right: 1px solid #BBE3F8;
                    }
        
                }
                `}
            </style>
        </div>
    )
}

export default BoxFrame;