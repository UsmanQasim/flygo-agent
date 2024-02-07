import { ContinueBooking } from "@/constant/constant";
import FlightDetail from "./flight-detail";
import TravelDetail from "./travel-detail";
import TravelInsurance from "./travel-insurance";
import { FC, useState } from "react";
import InformationPage from "@/components/common/booking-page/information";
import Summary from "@/components/common/booking-page/summary";
import Coupon from "@/components/common/booking-page/coupon";
import { useRouter } from "next/navigation";

export interface FormData {
  adult1: {
    title: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    passport: string;
    expirationDate: string;
    type: string;
    issueCountry: string;
  };
  email: string;
  phoneNumber: string;
}

const BookingNowComponent: FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    adult1: {
      title: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      passport: "",
      expirationDate: "",
      type: "",
      issueCountry: "",
    },
    email: "",
    phoneNumber: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(formData);
    // Add any further logic here, such as submitting the data to a server

    router.push("/flight/booking/add-ons");
  };

  return (
    <section className="small-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="review-section">
              <FlightDetail />
              {/* <InformationPage type="flight" /> */}
              <TravelDetail setFormData={setFormData} formData={formData} />
              {/* <TravelInsurance /> */}
            </div>
          </div>
          <div className="col-lg-4 res-margin">
            <div className="sticky-cls-top">
              <div className="review-section">
                <Summary />
                {/* <Coupon /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="continue-btn">
          <button className="btn btn-solid" onClick={handleSubmit}>
            {ContinueBooking}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookingNowComponent;
