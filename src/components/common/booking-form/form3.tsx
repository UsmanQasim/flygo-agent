"use client";
import { useState, FC, useEffect, Dispatch, SetStateAction } from "react";
// import { cityData } from "@/data/home/flight/flight-data";
import { airports } from "@/data/flight/filter-data";
import DatePickerComponent from "../date-picker";
import SelectCity from "@/components/common/booking-form/flight-form/select-city";
import SelectTraveler from "./flight-form/select-taraveler";
import LocationOption from "./flight-form/location-option";

import { uuid } from "uuidv4";
import { useRouter } from "next/navigation";

interface CityInputProps {
  value?: string;
  onCityChange: (value: string) => void;
  placeholder: string;
}

const CityInput: FC<CityInputProps> = ({
  value,
  onCityChange,
  placeholder,
}) => {
  return (
    <div className="col">
      <SelectCity
        value={value || ""}
        flighData={airports}
        onSelectedCityChange={onCityChange}
        placeHolder={placeholder}
      />
    </div>
  );
};

// interface IMultiCityInputProps {
//   index: number;
//   addMoreCity: () => void;
//   onRemove: (index: number) => void;
//   onChange: (data: any) => void;
// }

type MultiCityInputProps = {
  city: CityData;
  addCityData: () => void;
  removeCityData: (id: string) => void;
  updateCitiesData: (city: CityData) => void;
  isLast?: boolean;
};

const MultiCityInput: FC<MultiCityInputProps> = (props) => {
  const {
    city,
    addCityData,
    removeCityData,
    updateCitiesData,
    isLast = false,
  } = props;

  return (
    <div className="row flight-form-input mb-2">
      <CityInput
        value={city.from}
        onCityChange={(from) => updateCitiesData({ ...city, from })}
        placeholder="From"
      />
      <CityInput
        value={city.to}
        onCityChange={(to) => updateCitiesData({ ...city, to })}
        placeholder="To"
      />
      {city.date && (
        <div className="col mb-1">
          <div className="form-control">
            <DatePickerComponent
              setStart={(date: Date) => updateCitiesData({ ...city, date })}
              start={city.date}
            />
          </div>
        </div>
      )}
      <div className="btn-group gap-2">
        {isLast && (
          <button
            type="button"
            onClick={() => addCityData()}
            className="btn btn-solid color1"
          >
            +
          </button>
        )}
        <button
          type="button"
          className="btn btn-solid color1"
          onClick={() => removeCityData(city.id)}
        >
          -
        </button>
      </div>
    </div>
  );
};

type CityData = {
  id: string;
  from?: string;
  to?: string;
  date?: Date;
};

const FlightThree: FC = ({}) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [isOneWay, setIsOneWay] = useState(true);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [isMultiCityTrip, setIsMultiCityTrip] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const [citiesData, setCitiesData] = useState<CityData[]>([]);

  const [formData, setFormData] = useState({
    trip_type: "oneway",
    origin: "AHB",
    destination: "ADB",
    depart_date: new Date(),
    return_date: new Date(),
    passengers: {
      adults: 1,
      children: 1,
      infants: 1,
    },
    multiCityFlights: [{ origin: "", destination: "", depart_date: "" }],
  });

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formDataForSession = {};

    if (isMultiCityTrip) {
      formDataForSession = {
        trip_type: "multicity",
        origin: citiesData.length > 0 ? citiesData[0].from : "",
        destination:
          citiesData.length > 0 ? citiesData[citiesData.length - 1].to : "",
        depart_date: startDate.toISOString().split("T")[0],
        return_date: "", // Not applicable for multicity trip
        passengers: {
          adults: formData.passengers.adults,
          children: formData.passengers.children,
          infants: formData.passengers.infants,
        },
        multiCityFlights: [
          {
            origin,
            destination,
            depart_date: startDate.toISOString().split("T")[0],
          },
          ...citiesData.map((city) => ({
            origin: city.from,
            destination: city.to,
            depart_date: city.date?.toISOString().split("T")[0],
          })),
        ],
      };
    } else {
      formDataForSession = {
        trip_type: isOneWay ? "oneway" : "round",
        origin: origin,
        destination: destination,
        depart_date: startDate.toISOString().split("T")[0],
        return_date: isRoundTrip ? startDate1.toISOString().split("T")[0] : "",
        passengers: {
          adults: formData.passengers.adults,
          children: formData.passengers.children,
          infants: formData.passengers.infants,
        },
        multiCityFlights: [],
      };
    }

    sessionStorage.setItem("formData", JSON.stringify(formDataForSession));
    router.push("/flight/listing");
  };

  const handlePassengerChange = (
    adults: number,
    children: number,
    infants: number
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      passengers: { adults, children, infants },
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <LocationOption
        isOneWay={isOneWay}
        isRoundTrip={isRoundTrip}
        isMultiCityTrip={isMultiCityTrip}
        onOptionChange={handleOptionChange}
      />
      {!isMultiCityTrip ? (
        <>
          <CityInput
            value={origin}
            onCityChange={setOrigin}
            placeholder="From"
          />
          <CityInput
            value={destination}
            onCityChange={setDestination}
            placeholder="To"
          />
        </>
      ) : (
        <>
          <div className="row flight-form-input">
            <CityInput
              value={origin}
              onCityChange={setOrigin}
              placeholder="From"
            />
            <CityInput
              value={destination}
              onCityChange={setDestination}
              placeholder="To"
            />
            <div className="col ">
              <div className="form-control">
                <DatePickerComponent
                  setStart={setStartDate}
                  start={startDate}
                />
              </div>
            </div>
          </div>
          <ManageMultiCities
            citiesData={citiesData}
            setCitiesData={setCitiesData}
          />
        </>
      )}

      <div className="form-group row mb-4 flight-form-input mx-0">
        {!isMultiCityTrip && (
          <div className="col px-0">
            <div className="form-control ">
              <DatePickerComponent setStart={setStartDate} start={startDate} />
            </div>
          </div>
        )}

        {/* IS ROUND TRIP  */}
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
        <SelectTraveler onPassengerChange={handlePassengerChange} />
      </div>
      <button className="btn btn-rounded color1" type="submit">
        Book Now
      </button>
    </form>
  );
};

export default FlightThree;

type ManageMultiCitiesProps = {
  citiesData: CityData[];
  setCitiesData: Dispatch<SetStateAction<CityData[]>>;
};

function ManageMultiCities(props: ManageMultiCitiesProps) {
  const { citiesData, setCitiesData } = props;

  const addCityData = (
    from: string | undefined = undefined,
    to: string | undefined = undefined,
    date: Date = new Date()
  ) => {
    setCitiesData((prev) => [...prev, { id: uuid(), from, to, date }]);
  };

  const removeCityData = (id: string) => {
    setCitiesData((prev) => prev.filter((city) => city.id !== id));
  };

  const updateCitiesData = (city: CityData) => {
    setCitiesData((prev) => prev.map((c) => (c.id === city.id ? city : c)));
  };

  return (
    <>
      {citiesData.map((city, index) => (
        <MultiCityInput
          key={index}
          city={city}
          addCityData={addCityData}
          removeCityData={removeCityData}
          updateCitiesData={updateCitiesData}
          isLast={citiesData.length - 1 === index}
        />
      ))}
      {citiesData.length === 0 && (
        <div className="row flight-form-input m-0">
          <button
            type="button"
            onClick={() => addCityData()}
            className="btn btn-solid color1"
          >
            +
          </button>
        </div>
      )}
    </>
  );
}
