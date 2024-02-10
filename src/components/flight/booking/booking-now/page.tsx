import { ContinueBooking } from "@/constant/constant";
import FlightDetail from "./flight-detail";
import TravelDetail from "./travel-detail";
import TravelInsurance from "./travel-insurance";
import { FC, useEffect, useState } from "react";
import InformationPage from "@/components/common/booking-page/information";
import Summary from "@/components/common/booking-page/summary";
import Coupon from "@/components/common/booking-page/coupon";
import { useRouter } from "next/navigation";

export interface IBookingDetails {
  bookingCode: string;
  price: {
    main: string;
    decimals: number;
    currency: string;
  };
}

export interface IStoredFormData {
  trip_type: string;
  origin: string;
  destination: string;
  depart_date: string;
  return_date: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  multiCityFlights: [];
}

const BookingNowComponent: FC = () => {
  const router = useRouter();
  const [storedFormData, setStoredFormData] = useState<
    IStoredFormData | undefined
  >();
  const [bookingDetails, setBookingDetails] = useState<
    IBookingDetails | undefined
  >();

  const [passengerData, setPassengerData] = useState({
    adults: [
      {
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
    ],
    children: [
      {
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
    ],
    infants: [
      {
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
    ],
  });

  const [customerData, setCustomerData] = useState({
    email: "",
    phoneNumber: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    router.push("/flight/booking/add-ons");
  };

  useEffect(() => {
    const storedFormData = sessionStorage.getItem("formData");
    const booking_details = sessionStorage.getItem("booking_details");

    if (storedFormData && booking_details) {
      const parsedFormData = JSON.parse(storedFormData);
      const parsedBookingDetails = JSON.parse(booking_details);

      setStoredFormData(parsedFormData);
      setBookingDetails(parsedBookingDetails);
    }
  }, []);

  return (
    <section className="small-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="review-section">
              <FlightDetail />
              {/* <InformationPage type="flight" /> */}
              <TravelDetail
                setPassengerData={setPassengerData}
                passengerData={passengerData}
                customerData={customerData}
                setCustomerData={setCustomerData}
                storedFormData={storedFormData}
              />
              {/* <TravelInsurance /> */}
            </div>
          </div>
          <div className="col-lg-4 res-margin">
            <div className="sticky-cls-top">
              <div className="review-section">
                <Summary bookingDetails={bookingDetails} />
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
