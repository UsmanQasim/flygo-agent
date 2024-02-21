// import { bookingsData } from "@/data/pages/all-page";
import React, { FC, useEffect, useState } from "react";
import RenderBooking from "./render-booking";
import DashboardTitle from "../common/dashboard-title";
import {
  GetALLAgentBookings,
  IDashboardBookingData,
} from "@/services/dashboard";

const Bookings: FC = () => {
  const [bookingData, setBookingData] = useState<
    IDashboardBookingData[] | undefined
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    GetALLAgentBookings({
      page: currentPage,
      pageSize: pageSize,
    })
      .then((res) => {
        if (res && res.totalCount) {
          setBookingData(res?.bookings);
          setTotalCount(res?.totalCount || 0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  return (
    <>
      <div className="dashboard-box">
        <DashboardTitle title={"All Bookings"} />
        {bookingData && bookingData.map(RenderBooking)}
      </div>
      {/* .filter((booking: IDashboardBookingData) => booking.status === "upcoming") */}
      {/* <div className="dashboard-box">
        <DashboardTitle title={"past bookings"} />
        {bookingsData.filter((booking: IBookingProps) => booking.status === "past").map(RenderBooking)}
      </div>
      <div className="dashboard-box">
        <DashboardTitle title={"cancelled bookings"} />
        {bookingsData.filter((booking: IBookingProps) => booking.status === "cancelled").map(RenderBooking)}
      </div> */}
    </>
  );
};

export default Bookings;
