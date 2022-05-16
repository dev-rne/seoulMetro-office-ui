import Seo from "component/Seo";
import TopComp from "component/TopComp";
import TrainComp from "component/TrainComp";
import MainDashboard from "component/MainDashboard";

export default function Home(props) {
  return (
    <>
      <Seo title="Dashboard" />
      <TopComp />
      <div className="main">
        <TrainComp />
        <MainDashboard />
        <style jsx>
          {`
            .main{
              width:100%;
              height:90%;
              padding:0 20px 20px;
            }
          `}
        </style>
      </div>
    </>
  )
}


export async function getServerSideProps(){
  return{
      props:{
      }
  }
}