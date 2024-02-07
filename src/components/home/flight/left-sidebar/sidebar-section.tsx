"use client";
import { useState, FC } from "react";
import LocationOption from "@/components/common/booking-form/flight-form/location-option";
// import { cityfligData } from "@/data/home/flight/flight-data";
import DatePickerComponent from "@/components/common/date-picker";
import Button from "@/components/common/btn";
import SelectTraveler from "@/components/common/booking-form/flight-form/select-taraveler";
import SelectCity from "@/components/common/booking-form/flight-form/select-city";
import Link from "next/link";

const SidebarSection: FC = () => {
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
    <section className="cab-full pt-xl-cls">
      <div className="left-bar fixed-cls">
        <div className="flight-search">
          <div className="flight-search-detail">
            <LocationOption
              isMultiCityTrip={isMultiCityTrip}
              isOneWay={isOneWay}
              isRoundTrip={isRoundTrip}
              onOptionChange={handleOptionChange}
            />
            <form
              className="row"
              onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                event.preventDefault()
              }
            >
              <div className="col-xl-12 col-md-6 form-group">
                <label>From</label>
                {/* <SelectCity value="From" cityData={cityData} /> */}
              </div>
              <div className="col-xl-12 col-md-6 form-group">
                <label>To</label>
                {/* <SelectCity value="From" cityData={cityData} /> */}
              </div>
              <div className="col-xl-12 col-md-6">
                <div className="form-group">
                  <label>departure</label>
                  <div className="form-control">
                    <DatePickerComponent
                      start={startDate}
                      setStart={setStartDate}
                    />
                  </div>
                </div>
              </div>
              {isRoundTrip && (
                <div id="dropdate" className="col-xl-12 col-md-6">
                  <div className="form-group">
                    <label>return</label>
                    <div className="form-control">
                      <DatePickerComponent
                        start={startDate1}
                        setStart={setStartDate1}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="col-xl-12 col-md-6 form-group">
                <label>Traveller & Class</label>
                {/* <SelectTraveler /> */}
              </div>
              <div className="col-12">
                <Link
                  href="/flight/listing/left-sidebar"
                  className="btn btn-solid w-100 color1 float-end"
                >
                  search
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SidebarSection;
