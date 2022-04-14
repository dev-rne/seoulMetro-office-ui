import trainData from './data/train.json';
import trainIcon from 'assets/trainIcon.png';
import {useEffect} from 'react';
import { observer } from 'mobx-react';
import useStore from 'store/Store.js'

const TrainComp = observer(() => {
    const store = useStore();

    useEffect(() => {
        store.showList(trainData)
    },[])

  return (
      <div className="trainComp">
          <div className="bg">
            <img src={require('../assets/check.png')} className="check"/>
          </div>
          
            <img src={require('../assets/comp-side.png')} className="sideL"/>
            <img src={require('../assets/comp-side.png')} className="sideR"/>
          <div className="train-box">
            {store.trainList.train && store.trainList.train.map((list,i) => {
                return(
                    <div className="train" key={i} onClick={() =>  store.changeList(i)}>
                        <img src={trainIcon} className="trainIcon" />
                        <div className="name">
                            <img src={require('../assets/nameIcon.png')} />
                            <div className="title">{list.name}</div>
                        </div>
                        <div className={list.check ? "check" : ""}  ></div>
                    </div>
                )
            })}
          </div>
        <style jsx>
          {`
            .trainComp{
                width:100%;
                height:15%;
                position:relative;

                .bg{
                    width:100%;
                    position:absolute;
                    height:100%;
                    top:0;
                    left:0;
                    background:linear-gradient(to right, #003F64 10%, #002033 15%, #001C2D 85%, #003F64);
                    border-top: 1px solid #0AA3DE;
                    border-bottom: 1px solid #0AA3DE;
                    clip-path: polygon(0.7% 0, 99.3% 0, 100% 10%, 100% 91%, 99.3% 100%, 0.7% 100%, 0 90%, 0 10%);
                    .check{
                        width:100%;
                        opacity:0.5
                    }
                }
                    .sideL{
                        height:100%;
                        position:absolute;
                        top:0;
                        left:-3px;
                    }
                    .sideR{
                        height:100%;
                        position:absolute;
                        top:0;
                        right:-3px;
                        transform:rotate(180deg)
                    }
                
                .train-box{
                    width:100%;
                    height:100%;
                    padding:10px;
                    display:flex;
                    justify-content:center;
                    .train{
                        width:calc((100% / 10 )- 20px);
                        height:100%;
                        z-index:1;
                        flex-direction:column;
                        align-items:center;
                        justify-content:center;
                        display:flex;
                        gap:6px;
                        position:relative;
                        cursor:pointer;

                        .trainIcon{
                            width:90%;
                        }
                        .name{
                            height:30%;
                            position:relative;
                            display:flex;
                            justify-content:center;
                            align-items:center;
                            font-size:18px;
                            font-weight:600;

                            img{
                                width:200%;
                                position:absolute;
                                top:50%;
                                left:50%;
                                transform:translate(-50%,-50%);
                                z-index:-1;
                            }
                        }

                        .check{
                            width:100%;
                            height:100%;
                            position:absolute;
                            top:0;
                            left:0;
                            border-radius:10px;
                            border: 1px solid #09CCFF;
                            animation: err 1.5s infinite;
                        }

                        @keyframes err{
                            from{background: #3bd8ff40}
                            50%{background: #3bd8ff13}
                            to{background: #3bd8ff40}
                        }
                    }
                }
            }
          `}
        </style>
      </div>
  )
})


export default TrainComp;