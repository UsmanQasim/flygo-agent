import { FC } from "react";
import CustomLayout from "@/layouts/layout";
import Destination from "@/components/home/flight/modern/destination";
import AirlinesDetail from "@/components/home/flight/modern/airlines-detail";
import FlightRoute from "@/components/home/flight/modern/flight-route";
import FullBanner from "@/components/home/flight/modern/full-banner";
import AirlineTickets from "@/components/home/flight/modern/airline-tickets";
import TopDestination from "@/components/home/flight/modern/top-destination";
import Blog from "@/components/home/flight/modern/blog";
import SubscribeComp from "@/components/home/flight/modern/subscribe";
import HeroSection from "@/components/home/flight/modern/heroSection";

const Home: FC = () => {
  return (
    <CustomLayout
      title="overlay-white"
      footerPlace={true}
      hideFooter
      userBgClass="user rounded5"
    >
      {/* <TopHeader /> */}
      <HeroSection />
      <Destination />
      <AirlinesDetail />
      <FlightRoute />
      <FullBanner />
      {/* <AirlineTickets /> */}
      {/* <TopDestination /> */}
      <Blog />
      <SubscribeComp />
    </CustomLayout>
  );
};

export default Home;
