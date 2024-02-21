import { UserSvg } from "@/data/svg/page-svg";
import Img from "@/utils/BackgroundImageRatio";
import { parseCookies } from "nookies";
import { FC, useEffect, useState } from "react";

const UserDetail: FC = () => {
  const [user, setUser] = useState<{
    representativeName: string;
    mobile: string;
    email: string;
  }>();
  useEffect(() => {
    const { userData } = parseCookies();
    if (userData) {
      const userParsed = JSON.parse(userData);
      setUser(userParsed);
    }
  }, []);

  return (
    <div className="profile-top">
      {/* <div className="profile-image">
        <Img src="/assets/images/avtar/1.jpg" className="img-fluid" alt="" />
        <a className="profile-edit" href="#">
          <UserSvg />
        </a>
      </div> */}
      {user && (
        <div className="profile-detail">
          <h5>{user.representativeName}</h5>
          <h6>{user.mobile}</h6>
          <h6>{user.email}</h6>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
