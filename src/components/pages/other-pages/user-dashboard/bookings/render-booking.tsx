import { IDashboardBookingData } from "@/services/dashboard";
import { FC } from "react";

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
}) => {
  return (
    <div className="dashboard-detail" key={id}>
      <div className="booking-box">
        <div className="date-box">
          <span className="day">{flight_no}</span>
          <span className="date">{createdAt}</span>
          <span className="month">aug</span>
        </div>
        <div className="detail-middle">
          <div className="media">
            <div className="icon">
              <i className={"fas fa-plane"}></i>
            </div>
            <div className="media-body">
              <h6 className="media-heading">{destination}</h6>
              <p>
                amount paid: <span>${depart_date_time}</span>
              </p>
            </div>
            <div className="media-body">
              <h6 className="media-heading">ID: {id}</h6>
              <p>
                order date: <span>{createdAt}</span>
              </p>
            </div>
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
            // setShow(true), setBookingID(data?.itinerary_id);
          }}
          style={{
            cursor: "pointer",
            fontSize: "20px",
            color: "#253C72",
          }}
        >
          <i className="fa fa-eye" />
        </span>
      </div>
    </div>
  );
};

export default RenderBooking;
