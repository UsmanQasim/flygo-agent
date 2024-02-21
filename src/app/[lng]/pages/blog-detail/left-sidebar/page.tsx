// import "@/public/assets/scss/color1.scss";
import Breadcrumb from "@/components/common/breadcrumb/page";
import CustomLayout from "@/layouts/layout";
import { FC } from "react";
import BodyContent from "@/components/pages/blog-detail/page";

const LeftSidebar: FC = () => {
  return (
    <CustomLayout title="light_header" userBgClass="user user-light" logo={"dark"} loader="pre">
      <Breadcrumb title="" subTitle="" bannerImg={"https://4kwallpapers.com/images/wallpapers/riffelsee-lake-switzerland-glacier-mountains-snow-covered-3840x2160-3912.jpg"} />
      <BodyContent side="left" />
    </CustomLayout>
  );
};

export default LeftSidebar;
