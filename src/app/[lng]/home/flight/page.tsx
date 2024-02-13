import { FC } from "react";
import CustomLayout from "@/layouts/layout";
import HomeBanner from "@/components/home/flight/modern/home-banner";

const Modern: FC = () => {
  return (
    <CustomLayout
      title="overlay-white"
      footerPlace={true}
      hideFooter
      userBgClass="user rounded5"
    >
      <HomeBanner />
    </CustomLayout>
  );
};

export default Modern;
