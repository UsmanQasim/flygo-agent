import { IDashboardBookingData } from "@/services/dashboard";
import { FC, useEffect, useState } from "react";
import moment from "moment";

const RenderBooking: FC<IDashboardBookingData> = ({
  id,
  itinerary_id,
  origin,
  destination,
  arrival_date_time,
  depart_date_time,
  flight_no,
  airline,
  agent_id,
  status,
  cost,
  createdAt,
  updatedAt,
  onIconClick,
}) => {
  return (
    <>
      <div className="dashboard-detail" key={id}>
        <div className="booking-box">
          <div className="date-box2">
            <span className="date">ID</span>
            <span className="day">{id}</span>
          </div>
          <div className="date-box">
            <span className="date">Flight No.</span>
            <span className="day">{flight_no}</span>
          </div>
          <div className="date-box3">
            {/* <span className="day">{flight_no}</span> */}
            <span className="date">
              {moment(createdAt).format("MMMM Do YYYY")}
            </span>
            {/* <span className="month">aug</span> */}
          </div>

          <div className="detail-middle">
            <div className="media">
              <div className="media-body">
                <h6 className="media-heading">{origin}</h6>
                <p>
                  Departure Date <br />
                  <span>{moment(arrival_date_time).format("LLL")}</span>
                </p>
              </div>
              <div className="icon">
                <i className={"fas fa-plane"}></i>
              </div>
              <div className="media-body">
                <h6 className="media-heading">{destination}</h6>
                <p>
                  Arrival Date <br />{" "}
                  <span>{moment(depart_date_time).format("LLL")}</span>
                </p>
              </div>
              {/* <div className="media-body">
              <h6 className="media-heading">ID: {id}</h6>
              <p>
                order date: <span>{createdAt}</span>
              </p>
            </div> */}
            </div>
          </div>
          <div className="detail-last">
            {status === "upcoming" ? (
              <>
                <a href="#">
                  <i
                    className="fas fa-window-close"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title="cancle booking"
                  ></i>
                </a>
                <span className="badge bg-info">{cost}</span>
              </>
            ) : status === "past" ? (
              <span className="badge bg-success">past</span>
            ) : (
              <span
                className={`badge`}
                style={{
                  background:
                    status === "pending"
                      ? "#233972"
                      : status === "Cancelled"
                      ? "#E77C2B"
                      : "#41A24C",
                }}
              >
                {status}
              </span>
            )}
          </div>
          <span
            onClick={() => {
              if (itinerary_id) onIconClick(itinerary_id as number);
            }}
            style={{
              cursor: "pointer",
              fontSize: "20px",
              color: "#253C72",
              marginLeft: "10px",
            }}
          >
            <i className="fa fa-eye" />
          </span>
        </div>
      </div>
    </>
  );
};

export default RenderBooking;
