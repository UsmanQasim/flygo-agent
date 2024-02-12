"use client";
import { FC, useState, useEffect, useRef } from "react";
import { RootState } from "@/redux-toolkit/store";
import { useSelector } from "react-redux";
import { airports } from "@/src/utils/bookingData/airports";
import FlightCard from "./flightCard";

const DetailBar: FC<IFlightProductBoxProps> = ({
  flights,
  data,
  cardToShow,
  grid,
}) => {
  const { symbol, currencyValue } = useSelector(
    (state: RootState) => state.currency
  );
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [visibleFlights, setVisibleFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const detailBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (flights) {
      setVisibleFlights(flights.slice(0, 20));
    }
  }, [flights]);

  const loadMoreFlights = () => {
    setLoading(true);
    if (flights) {
      const currentLength = visibleFlights.length;
      const nextFlights = flights.slice(currentLength, currentLength + 20);
      setTimeout(() => {
        setVisibleFlights((prevFlights) => [...prevFlights, ...nextFlights]);
        setLoading(false);
      }, 1000);
    }
  };
  const handleDetailWrapClick = (item: any) => {
    if (activeItem === item.id) {
      setActiveItem(null);
    } else {
      setActiveItem(item.id ?? null);
    }
  };

  const convertMinutesToHoursAndMinutes = (minutes: number | undefined) => {
    if (!minutes) return;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursText = hours > 0 ? hours + " hr" + (hours > 1 ? "s" : "") : "";
    const minutesText =
      remainingMinutes > 0
        ? remainingMinutes + " min" + (remainingMinutes > 1 ? "s" : "")
        : "";

    if (hoursText && minutesText) {
      return hoursText + " " + minutesText;
    } else {
      return hoursText || minutesText;
    }
  };

  return (
    <div style={{ marginBottom: "20vh" }}>
      <div className="detail-bar">
        {visibleFlights &&
          visibleFlights?.map((itinerary, id) => {
            let legDescriptions = itinerary.legs[0];

            let originAirport = airports?.find(
              (a: { VENDOR_CODE: any }) =>
                a.VENDOR_CODE === legDescriptions.schedules[0].departure.airport
            );

            let destinationAirport = airports.find(
              (a: { VENDOR_CODE: any }) =>
                a.VENDOR_CODE ===
                legDescriptions.schedules[legDescriptions.schedules.length - 1]
                  .arrival.airport
            );

            let flight_classes = legDescriptions.flight_classes;
            let depart_date = legDescriptions.schedules[0].departure.date;
            let arrival_date = legDescriptions.schedules[0].arrival.date;
            let legs = itinerary.legs;
            let basePrice = `${itinerary.baseFareAmount}`;
            let flight_stops,
              totalMinutes,
              flightSchedules: any[] = [];

            legs.forEach(
              (leg: {
                schedules: any;
                duration: any;
                connecting_flights: any;
              }) => {
                let schedules = leg.schedules;
                schedules.forEach((sc: any) => {
                  flightSchedules.push(sc);
                });
                totalMinutes = leg.duration;
                flight_stops = leg.connecting_flights;
              }
            );

            let data = {
              id: itinerary.id,
              basePrice,
              destination: destinationAirport,
              origin: originAirport,
              total_time: convertMinutesToHoursAndMinutes(totalMinutes),
              flight_stops,
              flightSchedules,
              arrival_date,
              depart_date,
              flight_classes,
            };

            return (
              <FlightCard
                key={id}
                currencyValue={currencyValue}
                symbol={symbol}
                flightsData={flights}
                flight={data}
                activeItem={activeItem}
                handleDetailWrapClick={handleDetailWrapClick}
              />
            );
          })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {loading && <h4>Loading...</h4>}
        {!loading && flights && visibleFlights.length < flights.length && (
          <button className="btn btn-solid color1" onClick={loadMoreFlights}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailBar;
