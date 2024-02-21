import { FC } from "react";
// import "@/public/assets/scss/color1.scss";
import CustomLayout from "@/layouts/layout";
import FaqContent from "@/components/pages/other-pages/faq/page";
import Breadcrumb from "@/components/common/breadcrumb/page";

const Faq: FC = () => {
  return (
    <CustomLayout title="inner-page" userBgClass="user user-light">
      <Breadcrumb
        // title={"home"}
        title={""}
        // subTitle={"faq"}
        subTitle={""}
        bannerImg={"/assets/faq.jpg"}
      />
      <FaqContent />
    </CustomLayout>
  );
};

export default Faq;
