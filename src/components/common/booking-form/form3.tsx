"use client";
import { useState, FC, useEffect, Dispatch, SetStateAction } from "react";
// import { cityData } from "@/data/home/flight/flight-data";
import { airports } from "@/data/flight/filter-data";
import DatePickerComponent from "../date-picker";
import SelectCity from "@/components/common/booking-form/flight-form/select-city";
import SelectTraveler from "./flight-form/select-taraveler";
import LocationOption from "./flight-form/location-option";
import Link from "next/link";

import { uuid } from "uuidv4";

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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCityChange(event.target.value);
  };
  return (
    <div className="col">
      <SelectCity
        value={value || ""}
        flighData={airports}
        onChange={handleChange}
        placeHolder={placeholder}
      />
    </div>
  );
};

interface IMultiCityInputProps {
  index: number;
  addMoreCity: () => void;
  onRemove: (index: number) => void;
  onChange: (data: any) => void;
}

type MultiCityInputProps = {
  city: CityData;
  addCityData: () => void;
  removeCityData: (id: string) => void;
};

const MultiCityInput: FC<MultiCityInputProps> = (props) => {
  const { city, addCityData, removeCityData } = props;

  // const [departureDate, setDepartureDate] = useState(new Date());

  // const handleDepartureDateChange = (date: Date) => {
  //   setDepartureDate(date);
  //   onChange({
  //     from: "",
  //     to: "",
  //     departureDate: date.toISOString().split("T")[0],
  //   });
  // };

  return (
    <div className="row flight-form-input mb-2">
      <CityInput value={city.from} onCityChange={() => {}} placeholder="From" />
      {/* <CityInput
        value={city.to}
        onCityChange={() => void}
        placeholder="To"
      /> */}
      {/* <div className="col mb-1">
        <div className="form-control">
          <DatePickerComponent
            setStart={() => {}}
            start={city.data}
          />
        </div>
      </div>
      <div className="btn-group gap-2">
        <button
          type="button"
          onClick={addMoreCity}
          className="btn btn-solid color1"
        >
          +
        </button>
        <button
          type="button"
          className="btn btn-solid color1"
          onClick={() => onRemove(index)}
        >
          -
        </button>
      </div> */}
    </div>
  );
};

type CityData = {
  id: string;
  from?: string;
  to?: string;
  date?: Date;
};

const FlightThree: FC<{ onBookNow: (formData: any) => void }> = ({
  onBookNow,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [isOneWay, setIsOneWay] = useState(true);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [isMultiCityTrip, setIsMultiCityTrip] = useState(false);
  const [multiCities, setMultiCities] = useState<JSX.Element[]>([]);
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

  // const addCity = () => {
  //   setMultiCities([
  //     ...multiCities,
  //     <MultiCityInput
  //       key={multiCities.length}
  //       index={multiCities.length}
  //       onRemove={removeCity}
  //       addMoreCity={addCity}
  //       onChange={(data) => handleMultiCityChange(multiCities.length, data)}
  //     />,
  //   ]);
  // };

  const removeCity = (index: number) => {
    setMultiCities((prevCities) => {
      if (index === prevCities.length - 1) {
        return prevCities.slice(0, -1); // Remove the last element
      }
      return prevCities.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataForSession = {
      trip_type: isOneWay
        ? "oneway"
        : isRoundTrip
        ? "round"
        : isMultiCityTrip
        ? "multicity"
        : "",
      origin: "",
      destination: "",
      depart_date: startDate.toISOString().split("T")[0],
      return_date: isRoundTrip
        ? startDate1.toISOString().split("T")[0]
        : startDate.toISOString().split("T")[0],
      passengers: {
        adults: formData.passengers.adults,
        children: formData.passengers.children,
        infants: formData.passengers.infants,
      },
      multiCityFlights: multiCities.map((city) => ({
        origin: "",
        destination: "",
        depart_date: "",
      })),
    };

    sessionStorage.setItem("formData", JSON.stringify(formDataForSession));
    onBookNow(formDataForSession);
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

  const handleMultiCityChange = (index: number, data: any) => {
    setMultiCities((prevCities) => {
      const updatedCities = [...prevCities];
      updatedCities[index] = data;
      return updatedCities;
    });
  };

  const handleOriginChange = (value: string) => {
    setOrigin(value);
  };

  const handleDestinationChange = (value: string) => {
    setDestination(value);
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
            onCityChange={handleOriginChange}
            placeholder="From"
          />
          <CityInput
            value={destination}
            onCityChange={handleDestinationChange}
            placeholder="To"
          />
        </>
      ) : (
        <>
          <div className="row flight-form-input">
            <CityInput
              value={origin}
              onCityChange={handleOriginChange}
              placeholder="From"
            />
            <CityInput
              value={destination}
              onCityChange={handleDestinationChange}
              placeholder="To"
            />
            <div className="col">
              <div className="form-control">
                <DatePickerComponent
                  setStart={setStartDate}
                  start={startDate}
                />
              </div>
            </div>
          </div>
          {/* {multiCities.map((city, index) => (
            <MultiCityInput
              key={index}
              index={index}
              onRemove={removeCity}
              addMoreCity={addCity}
              onChange={(data) => handleMultiCityChange(index, data)}
            />
          ))} */}
          <ManageMultiCities
            citiesData={citiesData}
            setCitiesData={setCitiesData}
          />
        </>
      )}

      <div className="form-group row mb-4 flight-form-input">
        {!isMultiCityTrip && (
          <div className="col">
            <div className="form-control">
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

  const updateCitiesData = () => {};

  return (
    <>
      {citiesData.map((city, index) => (
        <MultiCityInput
          key={index}
          city={city}
          addCityData={addCityData}
          removeCityData={removeCityData}
        />
      ))}
      {citiesData.length === 0 && (
        <div className="row flight-form-input mb-4">
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

// "use client";
// import { useState, FC } from "react";
// import { cityData } from "@/data/home/flight/flight-data";
// import DatePickerComponent from "../date-picker";
// import SelectCity from "@/components/common/booking-form/flight-form/select-city";
// import SelectTraveler from "./flight-form/select-taraveler";
// // import SelectRoute from "./flight-form/select-route";
// import LocationOption from "./flight-form/location-option";

// const FlightThree: FC = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [startDate1, setStartDate1] = useState(new Date());
//   const [isOneWay, setIsOneWay] = useState(true);
//   const [isRoundTrip, setIsRoundTrip] = useState(false);
//   const [isMultiCityTrip, setIsMultiCityTrip] = useState(false);

//   const handleOptionChange = (route: string) => {
//     if (route === "round") {
//       setIsOneWay(false);
//       setIsRoundTrip(true);
//       setIsMultiCityTrip(false);
//     } else if (route === "multi") {
//       setIsOneWay(false);
//       setIsRoundTrip(false);
//       setIsMultiCityTrip(true);
//     } else {
//       setIsOneWay(true);
//       setIsRoundTrip(false);
//       setIsMultiCityTrip(false);
//     }
//   };

//   return (
//     <>
//       <form
//         onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
//           event.preventDefault()
//         }
//       >
//         <LocationOption
//           isOneWay={isOneWay}
//           isRoundTrip={isRoundTrip}
//           isMultiCityTrip={isMultiCityTrip}
//           onOptionChange={handleOptionChange}
//         />
//         <SelectCity value="From" cityData={cityData} />
//         <SelectCity value="To" cityData={cityData} />
//         {isMultiCityTrip && (
//           <div className="col">
//             <SelectCity value="From" cityData={cityData} />
//             <SelectCity value="To" cityData={cityData} />
//           </div>
//         )}

//         <div className="form-group row mb-4 flight-form-input">
//           <div className="col">
//             <div className="form-control">
//               <DatePickerComponent setStart={setStartDate} start={startDate} />
//             </div>
//           </div>
//           {isRoundTrip && (
//             <div className="col">
//               <div className="form-control">
//                 <DatePickerComponent
//                   setStart={setStartDate1}
//                   start={startDate1}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="col">
//           <SelectTraveler />
//         </div>
//       </form>
//       {/* <SelectRoute /> */}
//     </>
//   );
// };

// export default FlightThree;
