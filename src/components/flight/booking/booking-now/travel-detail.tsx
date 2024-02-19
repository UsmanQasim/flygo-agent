import { FC, useEffect, useState } from "react";
import { IStoredFormData } from "./page";
import { countries } from "./country";

const SESSION_STORAGE_KEY = "formData";

interface IPersonDetails {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passport: string;
  expirationDate: string;
  type: string;
  issueCountry: string;
}

const initialValue: IPersonDetails = {
  title: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  nationality: "",
  passport: "",
  expirationDate: "",
  type: "",
  issueCountry: "",
};

interface IPassengerData {
  adults: IPersonDetails[];
  children: IPersonDetails[];
  infants: IPersonDetails[];
}

interface ITravelDetailsProps {
  passengerData: IPassengerData;
  customerData: { email: string; phoneNumber: string };
  setCustomerData: Function;
  setPassengerData: Function;
  storedFormData: IStoredFormData | undefined;
}

type PassengerType = "adults" | "children" | "infants";

type Passengers = {
  [key in PassengerType]: IPersonDetails[];
};

const TravelDetail: FC<ITravelDetailsProps> = ({
  passengerData,
  customerData,
  setCustomerData,
  setPassengerData,
  storedFormData,
}) => {
  const [passengers, setPassengers] = useState<Passengers>({
    adults: [],
    children: [],
    infants: [],
  });

  useEffect(() => {
    const rawData = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!rawData) {
      // Bye bye here
      return;
    }

    const parsedData = JSON.parse(rawData);
    if (!parsedData) {
      // Bye bye here
      return;
    }

    const { passengers } = parsedData;
    if (!passengers) {
      // Bye bye here
      return;
    }

    setPassengers({
      adults: createEmptyPassengers(passengers.adults || 0),
      children: createEmptyPassengers(passengers.children || 0),
      infants: createEmptyPassengers(passengers.infants || 0),
    });
  }, []);

  const createEmptyPassengers = (length: number): IPersonDetails[] => {
    return new Array<IPersonDetails>(length).fill(initialValue);
  };

  const updateField = (
    passengerType: string,
    index: number,
    label: string,
    value: string
  ) => {
    setPassengerData((prev: any) => {
      const dataForThisPassengerType = prev[passengerType][0];
      dataForThisPassengerType[label] = value;

      const newPassengerData = {
        ...prev,
        [passengerType]: [dataForThisPassengerType],
      };

      return newPassengerData;
    });
  };

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomerData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    sessionStorage.setItem("passengers", JSON.stringify(passengers));
    sessionStorage.setItem("customer_info", JSON.stringify(customerData));
  }, [passengers, customerData]);

  const getTitle = (passengerType: string, index: number): string => {
    return `${passengerType.charAt(0).toUpperCase()}${
      passengerType === "adults"
        ? "dult"
        : passengerType === "children"
        ? "hild"
        : "nfant"
    } ${index + 1}`;
  };

  return (
    <>
      {Object.entries(passengers).map(([passengerType, passengerData]) =>
        passengerData.map((passenger, index) => (
          <PassengerBox
            title={getTitle(passengerType, index)}
            key={`${passengerType}_${index}`}
            index={index}
            onChange={(label: string, value: string) => {
              setPassengers((prev) => ({
                ...prev,
                [passengerType]: (
                  prev[passengerType as PassengerType] as IPersonDetails[]
                ).map((p, i) => (index === i ? { ...p, [label]: value } : p)),
              }));
            }}
            passengerData={passenger}
          />
        ))
      )}

      {/* Customer BOX */}
      <div className="review_box">
        <div className="title-top">
          <h5>Customer</h5>
        </div>
        <div className="flight_detail">
          <div className="row form_flight">
            <div className="col-md-12">
              <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                  event.preventDefault()
                }
              >
                <h6>contact details</h6>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      name="email"
                      onChange={handleContactChange}
                      value={customerData.email}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputnumber">Phone no:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputnumber"
                      name="phoneNumber"
                      onChange={handleContactChange}
                      value={customerData.phoneNumber}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface IPassengerBoxProps {
  title: string;
  passengerData: IPersonDetails;
  onChange: Function;
  index: number;
}

const PassengerBox: FC<IPassengerBoxProps> = ({
  title,
  passengerData,
  onChange,
  index,
}) => {
  return (
    <div className="review_box">
      <div className="title-top">
        <h5>{title + " Details"}</h5>
      </div>
      <div className="flight_detail">
        <div className="row form_flight">
          <div className="col-md-12">
            <form
              onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                event.preventDefault()
              }
            >
              <h6>adult 1</h6>
              <div className="row g-3">
                <div className="form-group col-md-4">
                  <label htmlFor="inputState">Title</label>
                  <select
                    id="inputState"
                    className="form-control"
                    name="adult1-title"
                    onChange={(event) => onChange("title", event.target.value)}
                    value={passengerData.title}
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="first">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstt"
                    name="adult1-firstName"
                    onChange={(event) =>
                      onChange("firstName", event.target.value)
                    }
                    value={passengerData.firstName}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="last">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastt"
                    name="adult1-lastName"
                    onChange={(event) =>
                      onChange("lastName", event.target.value)
                    }
                    value={passengerData.lastName}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="last">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    name="adult1-dateOfBirth"
                    onChange={(event) =>
                      onChange("dateOfBirth", event.target.value)
                    }
                    value={passengerData.dateOfBirth}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="last">Nationality</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="adult1-nationality"
                    onChange={(event) =>
                      onChange("nationality", event.target.value)
                    }
                    value={passengerData.nationality}
                  >
                    <option value="" disabled>
                      Nationality
                    </option>
                    {countries.map((data, i) => {
                      return (
                        <option key={i} value={data.name}>
                          {data.name}
                        </option>
                      );
                    })}

                    {/* <option value="Saudia Arabia">Saudia Arabia</option>
                    <option value="Brazil">Brazil</option> */}
                  </select>
                </div>
              </div>
              <h6 className="mt-4">Documents</h6>
              <div className="row g-3">
                <div className="form-group col-md-4">
                  <label htmlFor="inputState">Passport</label>
                  <input
                    type="text"
                    className="form-control"
                    id="passport"
                    name="adult1-passport"
                    onChange={(event) =>
                      onChange("passport", event.target.value)
                    }
                    value={passengerData.passport}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="first">Expiration Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="adult1-expirationDate"
                    onChange={(event) =>
                      onChange("expirationDate", event.target.value)
                    }
                    value={passengerData.expirationDate}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputState">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="passport"
                    name="adult1-type"
                    onChange={(event) => onChange("type", event.target.value)}
                    value={passengerData.type}
                  />
                </div>

                <div className="form-group col-md-4">
                  <label htmlFor="last">Issue Country</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="adult1-issueCountry"
                    onChange={(event) =>
                      onChange("issueCountry", event.target.value)
                    }
                    value={passengerData.issueCountry}
                  >
                    <option value="" disabled>
                      Issue Country
                    </option>
                    {countries.map((data, i) => {
                      return (
                        <option key={i} value={data.name} className="select">
                          {data.name}
                        </option>
                      );
                    })}
                    {/* <option value="Pakistan">Pakistan</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Uganda">Uganda</option> */}
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelDetail;
