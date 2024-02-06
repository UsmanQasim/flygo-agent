import { FC } from "react";
import SocialMedia from "./SocialMedia";

const CopyRightFooter: FC = () => {
  return (
    <div className="sub-footer">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-6 col-sm-12">
            <div className="footer-social">
              <SocialMedia />
            </div>
          </div>
          <div className="col-xl-6 col-md-6 col-sm-12">
            <div className="copy-right">
              <p>
                copyright 2023 Whetstonez{" "}
                <i className="fas fa-heart" style={{ color: "black" }}></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyRightFooter;
