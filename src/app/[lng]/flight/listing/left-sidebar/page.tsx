"use client";
import { FC, useEffect, useState } from "react";
import BannerBreadcrumbs from "@/components/flight/sidebar/left-sidebar/page";
import CustomLayout from "@/layouts/layout";
import SearchSection from "@/components/flight/sidebar/left-sidebar/search-section/search-section.tsx";
import GridView from "@/components/common/grid-page/grid/grid-view";
import { IAirlineDetails, searchFlight } from "@/services/flights";
import NotFound from "@/components/flight/sidebar/no-sidebar/not-found";

const LeftSidebar: FC = () => {
  const [flights, setFlights] = useState<IAirlineDetails[]>([]);

  const getFlightsList = async () => {
    const postData = {
      originDest: [
        {
          origin: "DMM",
          destination: "ISB",
          depart_date: "2024-02-14",
        },
      ],
      passengers: {
        adults: 2,
        children: 1,
        infants: 1,
      },
    };

    searchFlight(postData)
      .then((res) => {
        if (res?.success) {
          setFlights(res?.data);
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFlightsList();
  }, []);

  return (
    <CustomLayout title="light_header custom-user-header" loader="pre">
      <BannerBreadcrumbs />
      <SearchSection />
      {flights.length > 0 ? (
        <GridView
          flights={flights}
          side={"left"}
          type={"flight"}
          schedule={true}
          latestFilter
        />
      ) : (
        <NotFound />
      )}
    </CustomLayout>
  );
};

export default LeftSidebar;
