"use client";
import { FC, useEffect } from "react";

import CustomLayout from "@/layouts/layout";
import BreadcrumbTwo from "@/components/common/breadcrumb/breadcrubs2";
import Addons from "@/components/flight/booking/add-ons/page";

const BookingAddOns: FC = () => {
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color1", "36, 59, 113");
    document.documentElement.style.setProperty("--theme-color2", "239, 63, 62");

    return () => {
      document.documentElement.style.setProperty(
        "--theme-color1",
        "239, 63, 62"
      );
      document.documentElement.style.setProperty(
        "--theme-color2",
        "0, 162, 247"
      );
    };
  }, []);

  return (
    <CustomLayout
      title="light_header custom-user-header"
      loader="no"
      logo="dark"
    >
      <BreadcrumbTwo title="booking" subTitle="Addons" />
      <Addons />
    </CustomLayout>
  );
};

export default BookingAddOns;
