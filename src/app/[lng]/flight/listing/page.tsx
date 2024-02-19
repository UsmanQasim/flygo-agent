"use client";
import { FC, useEffect, useState } from "react";
import BannerBreadcrumbs from "@/components/flight/sidebar/left-sidebar/page";
import CustomLayout from "@/layouts/layout";
// import SearchSection from "@/components/flight/sidebar/left-sidebar/search-section/search-section.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { IAirlineDetails, searchFlight } from "@/services/flights";
import NotFound from "@/components/flight/sidebar/no-sidebar/not-found";
import GridLayout from "@/components/common/grid-page/grid-layout";

type FormDataProps = {
  trip_type: string;
  origin: string;
  destination: string;
  depart_date: string;
  return_date?: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  multiCityFlights?: MutliCityProps[];
};

type MutliCityProps = {
  origin: string;
  destination: string;
  depart_date: string;
};

const FlightListing: FC = () => {
  const [flights, setFlights] = useState<IAirlineDetails[]>([]);
  const grid = useSelector((state: RootState) => state.gridReducer);
  const [formData, setFormData] = useState<FormDataProps | null>(null);

  useEffect(() => {
    const form = sessionStorage.getItem("formData");
    try {
      if (form) {
        console.log(form);
        const parsedFormData = JSON.parse(form);
        setFormData(parsedFormData);
      }
    } catch (error) {
      console.error("Error parsing form data:", error);
    }
  }, []);

  const getFlightsList = () => {
    if (!formData) return;

    let originDest: MutliCityProps[] = [];
    if (formData.multiCityFlights && formData.multiCityFlights.length > 0) {
      originDest = formData.multiCityFlights.map((flight) => ({
        origin: flight.origin,
        destination: flight.destination,
        depart_date: flight.depart_date,
      }));
    } else {
      originDest.push({
        origin: formData.origin,
        destination: formData.destination,
        depart_date: formData.depart_date,
      });
    }

    const postData = {
      originDest: originDest,
      passengers: formData.passengers,
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
  }, [formData]);

  return (
    <CustomLayout title="light_header custom-user-header" loader="pre">
      <BannerBreadcrumbs />
      {/* <SearchSection /> */}
      {flights.length > 0 ? (
        <GridLayout
          flights={flights}
          grid={grid}
          type={"flight"}
          // view={view}
          trip={"oneway"}
        />
      ) : (
        <NotFound />
      )}
    </CustomLayout>
  );
};

export default FlightListing;
