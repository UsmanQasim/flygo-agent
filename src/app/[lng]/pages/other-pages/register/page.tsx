import { FC } from "react";
// import "@/public/assets/scss/color1.scss";
import CustomLayout from "@/layouts/layout";

import Breadcrumb from "@/components/common/breadcrumb/page";
import LoginPage from "@/components/pages/other-pages/login/page";

const Register: FC = () => {
  return (
    <CustomLayout title="inner-page" userBgClass="user user-light">
      <Breadcrumb
        title=""
        subTitle=""
        // title={"home"}
        // subTitle={"sign up"}
        bannerImg={"/assets/signup-s.jpg"}
      />
      <LoginPage title="sign up" />
    </CustomLayout>
  );
};

export default Register;
