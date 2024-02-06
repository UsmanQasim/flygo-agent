"use client";
import { FC, useState } from "react";
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
  FlightCard
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleDetailWrapClick = (item: any) => {
    if (activeItem === item.id) {
      setActiveItem(null);
    } else {
      setActiveItem(item.id ?? null);
    }
  };
  const convertMinutesToHoursAndMinutes = (minutes: number | undefined) => {
    const hours = Math.floor(minutes || 0 / 60);
    const remainingMinutes = minutes || 0 % 60;

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
    <div className="detail-bar">
      {flights &&
        flights.map((itinerary) => {
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
           <FlightCard currencyValue={currencyValue} symbol={symbol} flight={data} activeItem={activeItem} handleDetailWrapClick={handleDetailWrapClick}/>
          );
        })}
    </div>
  );
};

export default DetailBar;
