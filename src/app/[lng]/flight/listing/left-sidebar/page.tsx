"use client";
import { FC, useEffect, useState } from "react";
import BannerBreadcrumbs from "@/components/flight/sidebar/left-sidebar/page";
// import "@/public/assets/scss/color1.scss";
import CustomLayout from "@/layouts/layout";
import SearchSection from "@/components/flight/sidebar/left-sidebar/search-section/search-section.tsx";
import GridView from "@/components/common/grid-page/grid/grid-view";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-toolkit/store";
import { getFlights } from "@/redux-toolkit/flight-api";
import FlightData from "./flightData.json";
import { postFlight } from "@/src/services/login.service";

const LeftSidebar: FC = () => {
  const [flights, setFlights] = useState([]);
  const { data } = useSelector((state: RootState) => state.flight);

  const getFlightsList = async () => {
    const postData = {
      originDest: [
        {
          origin: "DMM",
          destination: "ISB",
          depart_date: "2024-02-07",
        },
      ],
      passengers: {
        adults: 2,
        children: 1,
        infants: 1,
      },
    };
    const res = await postFlight(postData);
    // console.log(res, "ress");
    if (res?.success) {
      setFlights(res?.data);
    }
  };

  useEffect(() => {
    getFlightsList();
  }, []);

  return (
    <CustomLayout title="light_header custom-user-header" loader="pre">
      <BannerBreadcrumbs />
      <SearchSection />
      <GridView
        flights={flights}
        side={"left"}
        value={data}
        type={"flight"}
        schedule={true}
        latestFilter
      />
    </CustomLayout>
  );
};

export default LeftSidebar;
