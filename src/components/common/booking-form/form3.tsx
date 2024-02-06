"use client";
import { useState, FC } from "react";
import { cityData } from "@/data/home/flight/flight-data";
import DatePickerComponent from "../date-picker";
import SelectCity from "@/components/common/booking-form/flight-form/select-city";
import SelectTraveler from "./flight-form/select-taraveler";
// import SelectRoute from "./flight-form/select-route";
import LocationOption from "./flight-form/location-option";

const FlightThree: FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [isOneWay, setIsOneWay] = useState(true);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [isMultiCityTrip, setIsMultiCityTrip] = useState(false);

  const handleOptionChange = (route: string) => {
    if (route === "round") {
      setIsOneWay(false);
      setIsRoundTrip(true);
      setIsMultiCityTrip(false);
    } else if (route === "multi") {
      setIsOneWay(false);
      setIsRoundTrip(false);
      setIsMultiCityTrip(true);
    } else {
      setIsOneWay(true);
      setIsRoundTrip(false);
      setIsMultiCityTrip(false);
    }
  };

  return (
    <>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          event.preventDefault()
        }
      >
        <LocationOption
          isOneWay={isOneWay}
          isRoundTrip={isRoundTrip}
          isMultiCityTrip={isMultiCityTrip}
          onOptionChange={handleOptionChange}
        />
        <SelectCity value="From" cityData={cityData} />
        <SelectCity value="To" cityData={cityData} />
        {isMultiCityTrip && (
          <div className="col">
            <SelectCity value="From" cityData={cityData} />
            <SelectCity value="To" cityData={cityData} />
          </div>
        )}

        <div className="form-group row mb-4 flight-form-input">
          <div className="col">
            <div className="form-control">
              <DatePickerComponent setStart={setStartDate} start={startDate} />
            </div>
          </div>
          {isRoundTrip && (
            <div className="col">
              <div className="form-control">
                <DatePickerComponent
                  setStart={setStartDate1}
                  start={startDate1}
                />
              </div>
            </div>
          )}
        </div>
        <div className="col">
          <SelectTraveler />
        </div>
      </form>
      {/* <SelectRoute /> */}
    </>
  );
};

export default FlightThree;
