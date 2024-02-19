import { FlightDetails } from "@/constant/constant";
import Img from "@/utils/BackgroundImageRatio";
import { FC, useEffect, useState } from "react";

const FlightDetail: FC = () => {
  const [flightDetails, setFlightDetails] = useState<any>();

  useEffect(() => {
    const data = sessionStorage.getItem("flight");
    if (data) {
      const parsedData = JSON.parse(data);
      setFlightDetails(parsedData);
    }
  }, []);
  return (
    <div className="review_box">
      <div className="title-top">
        <h5>{FlightDetails}</h5>
      </div>
      <div className="flight_detail">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-6">
            <div className="airport-part">
              <div className="airport-name">
                <h6>{flightDetails?.origin?.CITY_NAME}</h6>
                <p> {flightDetails?.arrival_date}</p>
              </div>
              <div className="airport-progress">
                <i
                  className="fas fa-plane-departure float-start"
                  style={{ color: "#253c72" }}
                ></i>
                <i
                  className="fas fa-plane-arrival float-end"
                  style={{ color: "#253c72" }}
                ></i>
              </div>
              <div className="airport-name arrival">
                <h6>{flightDetails?.destination?.CITY_NAME}</h6>
                <p> {flightDetails?.depart_date}</p>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="duration">
              <div>
                <h6>Total Time</h6>
                <p> {flightDetails?.total_time}</p>
              </div>
            </div>
          </div>
          {/* <div className="col-2">
            <div className="duration">
            <div>
                <h6>Price</h6>
                <p> {flightDetails?.basePrice}</p>
              </div>
            </div>
          </div> */}
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetail;
