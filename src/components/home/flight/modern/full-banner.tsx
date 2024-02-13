"use client";
import { FC } from "react";
import BackgroundDiv from "@/utils/HOC/background-div";
import Banners from "@/components/common/discount-banner/banner";

const FullBanner: FC = () => {
  return (
    <section className="p-0 banner-section full-banner zig-zag-effect">
      <BackgroundDiv titleClass="section-b-space section-t-space bg-size" img={"/assets/images/bluebg.jpg"} divImg="/assets/images/bluebg.jpg" imgWidth={732} imgHeight={1905} displayClass="none">
        <Banners />
      </BackgroundDiv>
    </section>
  );
};

export default FullBanner;
