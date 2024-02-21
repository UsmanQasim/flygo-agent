import { FC } from "react";
import Img from "@/utils/BackgroundImageRatio";
import Link from "next/link";

const ComingSoonContent: FC = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backdropFilter: "blur(7px)",
          height: "100vh",
          width: "100%",
          zIndex: -1,
          position: "absolute",
          opacity: "0.8",
        }}
      ></div>
      <div className="coming-soon ripple-effect">
        {/* <Img src="/assets/images/inner-pages/coming-soon.jpg" alt="" className="img-fluid bg-img" /> */}
        <div className="object">
          <div className="object-rope"></div>
          <div className="object-shape">
            Coming <span className="soon">Soon</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="offset-lg-4 col-lg-4 offset-md-3 col-md-6">
              <div className="coming-soon-detail">
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    flexDirection: "column",
                  }}
                >
                  <div className="">
                    {/* <Link href="/home/cab/modern"> */}
                    <Img
                      src={"/assets/images/logo-coming.png"}
                      alt=""
                      className="img-fluid"
                    />
                    {/* </Link> */}
                  </div>
                  <div
                    className="col-md-12"
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "column",
                    }}
                  >
                    <h1
                      style={{ color: "white", margin: "0px", padding: "0px" }}
                    >
                      Coming Soon!
                    </h1>
                    <div className="actions">
                      <Link href={"/"}>
                        <button type="button" className="btn btn-solid">
                          Back to Home
                        </button>
                      </Link>
                    </div>
                  </div>
                  {/* <form onSubmit={(event: React.FormEvent<HTMLFormElement>)=>event.preventDefault()} className="theme-form w-100">
                  <input type="text" name="password" id="name" className="form-control" autoFocus={true} placeholder="Enter your email address" />
                  <div className="col-md-12">
                  <div className="actions">
                  <button type="button" className="btn btn-solid">
                  notify me
                  </button>
                  </div>
                  </div>
                </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ComingSoonContent;
