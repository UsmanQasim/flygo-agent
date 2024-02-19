"use client";
import { FC } from "react";
import BackgroundDiv from "@/utils/HOC/background-div";
import Banners from "@/components/common/discount-banner/banner";

const FullBanner: FC = () => {
  return (
    <section
      className="p-0 banner-section full-banner zig-zag-effect"
      style={{ background: "#213A72" }}
    >
      <BackgroundDiv
        titleClass="section-b-space section-t-space bg-size"
        // img={"/assets/images/bluebg.svg"}
        img={""}
        // divImg="/assets/images/bluebg.svg"
        divImg=""
        imgWidth={732}
        imgHeight={1905}
        displayClass="none"
      >
        <Banners />
      </BackgroundDiv>
    </section>
  );
};

export default FullBanner;
