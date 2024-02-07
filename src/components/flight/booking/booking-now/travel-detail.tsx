import { TravellerDetails } from "@/constant/constant";
import { FC } from "react";
import { FormData } from "./page";
interface ITravelDetailsProps {
  setFormData: Function;
  formData: FormData;
}
const TravelDetail = ({ setFormData, formData }: ITravelDetailsProps) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const [field, index] = name.split("-");

    setFormData((prevState: any) => ({
      ...prevState,
      [field]: { ...prevState[field], [index]: value },
    }));
  };

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="review_box">
        <div className="title-top">
          <h5>{TravellerDetails}</h5>
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
                      onChange={handleInputChange}
                      value={formData.adult1.title}
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
                      onChange={handleInputChange}
                      value={formData.adult1.firstName}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="last">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastt"
                      name="adult1-lastName"
                      onChange={handleInputChange}
                      value={formData.adult1.lastName}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="last">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="adult1-dateOfBirth"
                      onChange={handleInputChange}
                      value={formData.adult1.dateOfBirth}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="last">Nationality</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="adult1-nationality"
                      onChange={handleInputChange}
                      value={formData.adult1.nationality}
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
                      onChange={handleInputChange}
                      value={formData.adult1.passport}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="first">Expiration Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="adult1-expirationDate"
                      onChange={handleInputChange}
                      value={formData.adult1.expirationDate}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputState">Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="passport"
                      name="adult1-type"
                      onChange={handleInputChange}
                      value={formData.adult1.type}
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="last">Issue Country</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="adult1-issueCountry"
                      onChange={handleInputChange}
                      value={formData.adult1.issueCountry}
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
                      value={formData.email}
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
                      value={formData.phoneNumber}
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

export default TravelDetail;
