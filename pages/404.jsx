import Link from "next/link";

export default function NotFound(){
    return (
        <>
        <div className="content">
            <h1>404</h1>
            <p>Page Not Found</p>
            <span>The resource requested could not be found on this server!</span>
            <Link href="/"><div>Back</div></Link>
        </div>
         <style jsx>
          {`
            .content{
              position:absolute;
              top:50%;
              left:50%;
              transform:translate(-50%,-50%);
              background:rgba(0,0,0,0.3);
              padding:24px;
              border-radius:12px;
              display:flex;
              justify-content:center;
              flex-direction:column;
              box-shadow:2px 2px 6px rgba(0,0,0,0.3);

              h1{
                  font-size:5em;
                  line-height:0.8em;
                  text-align:center;
                  color:#4780af;
                  font-weight:700;
              }

              p{
                  font-size:2em;
                  font-weight:600;
                  line-height:0.3em;
                  text-align:center;
                  color:white;
              }
              span{
                  margin-top:-10px;
                  color:white;
              }

              div{
                  margin-top:20px;
                  background:#24445f6e;
                  padding:6px;
                  display:flex;
                  justify-content:center;
                  font-size:20px;
                  border-radius:30px;
                  font-weight:600;
                  cursor:pointer;
                  transition:0.25s;
                  box-shadow:2px 2px 5px rgba(0,0,0,0.3)
              }

              div:hover{
                  transform:translate(-1px,-2px)
              }
            }
          `}
        </style>
        </>
    )
}