import { FC, useEffect, useState } from "react";
import { IStoredFormData } from "./page";

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

const TravelDetail: FC<ITravelDetailsProps> = ({
  passengerData,
  customerData,
  setCustomerData,
  setPassengerData,
  storedFormData,
}) => {
  const [formData, setFormData] = useState({
    passengers: {
      adults: 0,
      children: 0,
      infants: 0,
    },
  });

  useEffect(() => {
    if (storedFormData) {
      setFormData((prev) => ({
        ...prev,
        passengers: storedFormData.passengers,
      }));
    }

    // console.log(storedFormData);
  }, [storedFormData]);

  const updateField = (
    passengerType: string,
    index: number,
    label: string,
    value: string
  ) => {
    setPassengerData((prev: any) => {
      const dataForThisPassengerType = prev[passengerType];
      const updatedDataForThisPassengerType = dataForThisPassengerType.map(
        (x: any, i: number) => {
          if (i === index) {
            const newItems = { ...x, [label]: value };
            return newItems;
          }
          return x;
        }
      );

      const newPassengerData = {
        ...prev,
        [passengerType]: updatedDataForThisPassengerType,
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

  return (
    <>
      {formData &&
        Object.entries(formData.passengers)
          .map(([passengerType, count]) =>
            Array(count)
              .fill("")
              .map((_, index) => (
                <PassengerBox
                  title={`${passengerType.charAt(0).toUpperCase()}${
                    passengerType === "adults"
                      ? "dult"
                      : passengerType === "children"
                      ? "hild"
                      : "nfant"
                  } ${index + 1}`}
                  key={`${passengerType}_${index}`}
                  index={index}
                  passengerData={passengerData.adults[0]}
                  onChange={(label: string, value: string) =>
                    updateField(passengerType, index, label, value)
                  }
                />
              ))
          )
          .flat()}

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
                      type="number"
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
                    <option>Choose...</option>
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
                    <option selected></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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
                    <option selected></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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
