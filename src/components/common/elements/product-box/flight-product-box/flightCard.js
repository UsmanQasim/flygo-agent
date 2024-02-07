import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import Button from "@/components/common/btn";
import { BookNow } from "@/constant/constant";
import { airlines } from "@/src/utils/bookingData/airlines";

const FlightCard = ({
  currencyValue,
  symbol,
  activeItem,
  flight,
  handleDetailWrapClick,
}) => {
  const {
    destination,
    origin,
    total_time,
    flight_stops,
    flightSchedules,
    basePrice,
    flight_classes,
  } = flight;
  const [arePackagesVisible, setPackagesVisible] = useState(false);

  const togglePackages = () => {
    setPackagesVisible((prev) => !prev);
  };
  const convertGmtTimeToBasic = (time) => {
    let a = time.split("+")[0];
    let b = a.split(":");
    b.pop();
    return b.join(":");
  };

  // TODO: Need to implement real data
  return (
    <div
      className={`detail-wrap wow fadeInUp ${
        activeItem === flight.id ? "active" : ""
      }`}
      key={flight.id}
      onClick={() => handleDetailWrapClick(flight)}
    >
      <div className="row">
        <div className="col-md-1">
          <div className="logo-sec" style={{ paddingLeft: "16px" }}>
            {/* <ul>
              {flightSchedules?.map((sch) => (
                <div style={{ fontSize: "14px" }} key={sch.id}>
                  {airlines
                    ?.filter((a) => a.id === sch.carrier.marketing)
                    .map((a) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                        key={a.id}
                      >
                        <img
                          src={a.logo}
                          style={{ width: "35px", height: "35px" }}
                        />
                        <h6 style={{ textAlign: "left" }}>
                          {a.name}
                          <br />[{sch.carrier.marketing}
                          {sch.carrier.marketingFlightNumber}]
                        </h6>
                      </div>
                    ))}
                </div>
              ))}
            </ul> */}
          </div>
        </div>
        <div className="col-md-6">
          <div className="airport-part">
            <div className="airport-name">
              <h4>{origin?.CITY_NAME}</h4>
              <h6>
                {convertGmtTimeToBasic(flightSchedules[0].departure.time)}
                {flightSchedules[0]?.day_adjustment &&
                  `(+${flightSchedules[0]?.day_adjustment})`}
              </h6>
            </div>
            <div className="airport-progress">
              <i className="fas fa-plane-departure fa-lg float-start"></i>
              <i className="fas fa-plane-arrival fa-lg float-end"></i>
              <div className="stop">{total_time}</div>
            </div>
            <div className="airport-name arrival">
              <h4>{destination?.CITY_NAME}</h4>
              <h6>
                {convertGmtTimeToBasic(
                  flightSchedules[flightSchedules.length - 1].arrival.time
                )}
                {flightSchedules[flightSchedules.length - 1]?.day_adjustment &&
                  `(+${
                    flightSchedules[flightSchedules.length - 1]?.day_adjustment
                  })`}
              </h6>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="price">
            <div>
              <h4>
                {symbol}
                {basePrice !== undefined
                  ? (currencyValue * basePrice).toFixed(2)
                  : "N/A"}
              </h4>
              <span>{flight.priceTag}</span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="book-flight">
            <button onClick={togglePackages} className="btn btn-solid color1">
              View Detail{" "}
             {arePackagesVisible ? <img
                src="/top_arrow.png"
                style={{ width: "16px", height: "16px" }}
              />: <img
                src="/bottom_arrow.png"
                style={{ width: "16px", height: "16px" }}
              />}
            </button>
          </div>
        </div>
      </div>
      {arePackagesVisible && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px",
            gap: "20px",
            paddingTop: "16px",
            paddingBottom: "16px",
            marginLeft: "16px",
            marginRight: "16px",
            borderRadius: "10px",
            border: "1px solid #dc3545",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              width: "90%",
            }}
          >
            {flightSchedules?.map((sch, index) => (
              <div style={{ fontSize: "14px" }} key={sch.id}>
                {airlines
                  ?.filter((a) => a.id === sch.carrier.marketing)
                  .map((a, airlineIndex) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                      key={airlineIndex}
                    >
                      <img
                        src={a.logo}
                        style={{ width: "35px", height: "35px" }}
                      />
                      <h6 style={{ textAlign: "left" }}>
                        {a.name}
                        <br />[{sch.carrier.marketing}
                        {sch.carrier.marketingFlightNumber}]
                      </h6>
                      {index !== flightSchedules?.length - 1 && (
                        <img
                          src="/right_arrow.png"
                          style={{ width: "60px", height: "30px" }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              gap: "10px",
              margin: 5,
            }}
          >
            <PackageCard
              titleColor="white"
              bgColor="grey"
              textColor="black"
              title={flight_classes[0].bookingCode}
              price={{ main: basePrice, decimals: 74, currency: symbol }}
              flightSchedules={flightSchedules}
            >
              <PackageItemCard
                icon={
                  <i
                    className="fas fa-shopping-bag"
                    style={{ fontSize: "16px" }}
                  ></i>
                }
                title="Cabin baggage"
                amount="1 x 7 kg"
              />
              <PackageItemCard
                icon={
                  <i
                    className="far fa-calendar"
                    style={{ fontSize: "16px" }}
                  ></i>
                }
                title="Change booking"
                amount="250 SAR"
              />
            </PackageCard>

            <PackageCard
              titleColor="white"
              bgColor="#253A74"
              textColor="black"
              title={flight_classes[1].bookingCode}
              price={{ main: 747, decimals: 24, currency: symbol }}
              recommended
              flightSchedules={flightSchedules}
            >
              <PackageItemCard
                icon={
                  <i
                    className="fas fa-shopping-bag"
                    style={{ fontSize: "16px" }}
                  ></i>
                }
                title="Cabin baggage"
                amount="1 x 7 kg"
              />
              <PackageItemCard
                icon={
                  <i
                    className="far fa-calendar"
                    style={{ fontSize: "16px" }}
                  ></i>
                }
                title="Checked baggage"
                amount="1 x 20 kg"
              />
              <PackageItemCard
                icon={<i className="material-icons" />}
                title="Seat selection"
                amount="Standard"
              />
              <PackageItemCard
                icon={
                  <i
                    className="fas fa-shopping-bag"
                    style={{ fontSize: "16px" }}
                  ></i>
                }
                title="Change booking"
                amount="100 SAR"
              />
            </PackageCard>

            <PackageCard
              titleColor="white"
              bgColor="#3BA746"
              textColor="black"
              title={flight_classes[2].bookingCode}
              price={{ main: 876, decimals: 85, currency: symbol }}
              flightSchedules={flightSchedules}
            >
              <PackageItemCard
                icon={<i></i>}
                title="Cabin baggage"
                amount="1 x 7 kg"
              />
              <PackageItemCard
                icon={<i></i>}
                title="Checked baggage"
                amount="1 x 30 kg"
              />
              <PackageItemCard
                icon={<i></i>}
                title="Seat selection"
                amount="All available"
              />
              <PackageItemCard
                icon={<i></i>}
                title="Change booking"
                amount="Free of charge"
              />
              <PackageItemCard
                icon={<i></i>}
                title="Cancel booking"
                amount="150 SAR"
              />
            </PackageCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;

function PackageCard({
  recommended,
  bgColor,
  textColor,
  title,
  price,
  children,
  flightSchedules,
  titleColor,
}) {
  return (
    <Link href="/flight/booking/booking-now">
      <div
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          width: "300px",
          border: "1px solid",
          borderColor: `${bgColor}`,
          cursor: "pointer",
        }}
        className="card"
        onClick={() => {
          const bookingDetails = { bookingCode: title, price: price };
          const flights = flightSchedules.map((flight) => {
            const { airport: origin, time, date } = flight.departure;
            const { airport: destination } = flight.arrival;
            const { marketing, marketingFlightNumber } = flight.carrier;

            return {
              bookingCode: title,
              departure_date_time: moment(`${time} ${date}`).format(
                "YYYY-MM-DDTHH:mm:ss"
              ),
              origin,
              destination,
              marketing_airline: {
                code: marketing,
                flight_number: marketingFlightNumber.toString(),
              },
            };
          });

          sessionStorage.setItem("flights", JSON.stringify(flights));
          sessionStorage.setItem(
            "booking_details",
            JSON.stringify(bookingDetails)
          );
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: `${bgColor}`,
            height: "50px",
            position: "relative",
          }}
          className="card-header flex justify-content-center align-items-center"
        >
          <p
            className="fw-bold text-center "
            style={{
              color: `${titleColor}`,
              fontSize: "25px",
              marginBottom: "0px !important",
            }}
          >
            {title}
          </p>
          {recommended && (
            <p
              className="fw-bold position-absolute bottom-0 start-50 translate-middle-x"
              style={{
                color: `${textColor}`,
                borderRadius: "50px",
                backgroundColor: "orange",
                padding: "0",
                paddingLeft: "0.75rem", // Equivalent to px={3}
                paddingRight: "0.75rem", // Equivalent to px={3}
                paddingTop: "0", // Equivalent to py={0}
                paddingBottom: "0", // Equivalent to py={0}
                fontSize: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                marginBottom: "-10px",
              }}
            >
              Recommended
            </p>
          )}
        </div>
        {/* Body with content */}
        {/* <div
          className="card-body d-flex flex-column"
          style={{
            minHeight: "120px",
            padding: "1rem",
            paddingTop: "1.5rem",
            paddingBottom: "3.75rem",
          }}
        >
          {children}
        </div> */}
        {/* Footer with price */}
        <div
          className="card-footer d-flex align-items-center justify-content-center border-top "
          style={{ height: "50px" }}
        >
          <p
            className="fw-bold me-2 text-center mb-0 "
            style={{ fontSize: "25px", color: `${textColor}` }}
          >
            {price.main}
          </p>
          <p
            className="fw-bold me-2 text-center mb-0 "
            style={{ fontSize: "15px", color: `${textColor}` }}
          >
            .{price.decimals}
          </p>
          <p
            className={`me-2 text-center mb-0`}
            style={{ fontSize: "15px", color: `${textColor}` }}
          >
            {price.currency}
          </p>
        </div>
      </div>
    </Link>
  );
}
function PackageItemCard({ icon, title, amount }) {
  return (
    <div
      className="d-flex align-items-center mb-2"
      style={{ fontSize: "13px" }}
      router
    >
      <div className="col-1 pr-2">{icon}</div>
      <div className="col-6">{title}</div>
      <div className="col-4 text-end pe-2">{amount}</div>
    </div>
  );
}
