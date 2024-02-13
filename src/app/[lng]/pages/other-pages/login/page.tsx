import { FC } from "react";
// import "@/public/assets/scss/color1.scss";
import CustomLayout from "@/layouts/layout";
import Breadcrumb from "@/components/common/breadcrumb/page";
import LoginPage from "@/components/pages/other-pages/login/page";

const Login: FC = () => {
  return (
    <CustomLayout title="inner-page" userBgClass="user user-light">
      <Breadcrumb
        title={"Welcome To FlyGO"}
        subTitle={"Login with your credentials below"}
        bannerImg={"/assets/images/new/log.jpg"}
      />
      <LoginPage title="login" />
    </CustomLayout>
  );
};

export default Login;
