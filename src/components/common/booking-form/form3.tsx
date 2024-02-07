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

"use client";
import { useState, FC } from "react";
// import { cityData } from "@/data/home/flight/flight-data";
import { airports } from "@/data/flight/filter-data";
import DatePickerComponent from "../date-picker";
import SelectCity from "@/components/common/booking-form/flight-form/select-city";
import SelectTraveler from "./flight-form/select-taraveler";
import LocationOption from "./flight-form/location-option";
import Link from "next/link";

interface CityInputProps {
  value: string;
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
        value={value}
        flighData={airports}
        onChange={handleChange}
        placeHolder={placeholder}
      />
    </div>
  );
};

interface MultiCityInputProps {
  index: number;
  addMoreCity: () => void;
  onRemove: (index: number) => void;
  onChange: (data: any) => void;
}

const MultiCityInput: FC<MultiCityInputProps> = ({
  index,
  onRemove,
  addMoreCity,
  onChange,
}) => {
  const [departureDate, setDepartureDate] = useState(new Date());

  const handleDepartureDateChange = (date: Date) => {
    setDepartureDate(date);
    onChange({
      from: "",
      to: "",
      departureDate: date.toISOString().split("T")[0], // Convert Date object to ISO string and extract date part
    });
  };

  return (
    <div className="row flight-form-input mb-2">
      {/* <CityInput
        value={value}
        // onCityChange={handleOriginChange}
        placeholder="From"
      />
      <CityInput
        value={destination}
        // onCityChange={handleDestinationChange}
        placeholder="To"
      /> */}
      <div className="col mb-1">
        <div className="form-control">
          <DatePickerComponent
            setStart={handleDepartureDateChange}
            start={departureDate}
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
      </div>
    </div>
  );
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

  const [formData, setFormData] = useState({
    trip_type: "oneway", //oneway, round , multi
    origin: "AHB",
    destination: "ADB",
    depart_date: new Date(),
    return_date: new Date(),
    passengers: {
      adults: 0,
      children: 0,
      infants: 0,
    },
    multiCityFlights: [{ origin: "", destination: "", depart_date: "" }],
  });

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

  const addCity = () => {
    setMultiCities([
      ...multiCities,
      <MultiCityInput
        key={multiCities.length}
        index={multiCities.length}
        onRemove={removeCity}
        addMoreCity={addCity}
        onChange={(data) => handleMultiCityChange(multiCities.length, data)}
      />,
    ]);
  };

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

    // Collect form data
    const formDataForSession = {
      trip_type: isOneWay
        ? "oneway"
        : isRoundTrip
        ? "round"
        : isMultiCityTrip
        ? "multicity"
        : "",
      origin: "", // Origin will be collected from CityInput component
      destination: "", // Destination will be collected from CityInput component
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
        origin: "", // Origin for multi-city flight will be collected from CityInput component
        destination: "", // Destination for multi-city flight will be collected from CityInput component
        depart_date: "", // Departure date for multi-city flight will be collected from DatePickerComponent
      })),
    };

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
          {multiCities.map((city, index) => (
            <MultiCityInput
              key={index}
              index={index}
              onRemove={removeCity}
              addMoreCity={addCity}
              onChange={(data) => handleMultiCityChange(index, data)}
            />
          ))}
          {multiCities.length < 1 && (
            <div className="row flight-form-input mb-4">
              <button
                type="button"
                onClick={addCity}
                className="btn btn-solid color1"
              >
                +
              </button>
            </div>
          )}
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
      <Link href="/flight/listing/left-sidebar">
        <button className="btn btn-rounded color1" type="submit">
          Book Now
        </button>
      </Link>
    </form>
  );
};

export default FlightThree;
