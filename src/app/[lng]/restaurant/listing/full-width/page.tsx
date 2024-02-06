"use client";
import { FC, useEffect } from "react";
// import "@/public/assets/scss/color1.scss";
import CustomLayout from "@/layouts/layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-toolkit/store";
import HomeBanner from "@/components/common/banner/restaurant-banner";
import { getRestaurant } from "@/redux-toolkit/restaurant-api";
import MapView from "@/components/hotels/listing/map/map-view";

const FullWidth: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.restaurant);

  useEffect(() => {
    dispatch(getRestaurant());
  }, [dispatch]);

  return (
    <CustomLayout logo="dark" title="light_header" userBgClass="user user-light" loader="food">
      <HomeBanner />
      <MapView value={data} side={"left"} gridType={"grid-view"} type="restaurant" size={4}  />
    </CustomLayout>
  );
};

export default FullWidth;
