import { MakePayment } from "@/constant/constant";
import { RootState } from "@/redux-toolkit/store";
import {
  ICompleteBookingProps,
  completeBookingFlight,
} from "@/services/flights";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SuccessBtn = () => {
  const router = useRouter();
  const { i18LangStatus } = useSelector((state: RootState) => state.language);

  const makePaymentBtn = () => {
    // router.push(`${i18LangStatus}`);

    router.push(`${"/flight/booking/success"}`);
  };

  useEffect(() => {
    const userDataLocalStorage = JSON.parse(
      localStorage.getItem("userData") || "{}"
    );
    const bookingDetailsSession = JSON.parse(
      sessionStorage.getItem("booking_details") || "{}"
    );
    const passengersSession = JSON.parse(
      sessionStorage.getItem("passengers") || "{}"
    );
    const formDataSession = JSON.parse(
      sessionStorage.getItem("formData") || "{}"
    );

    const flightsSession = JSON.parse(
      sessionStorage.getItem("flights") || "{}"
    );

    const customerInfoSession = JSON.parse(
      sessionStorage.getItem("customer_info") || "{}"
    );

    if (
      !userDataLocalStorage ||
      !bookingDetailsSession ||
      !passengersSession ||
      !formDataSession ||
      !flightsSession ||
      !customerInfoSession
    )
      return;

    let data = JSON.stringify({
      agentId: userDataLocalStorage.id,
      seatsRequested:
        formDataSession.passengers.adults +
        formDataSession.passengers.children +
        formDataSession.passengers.infants,
      flights: flightsSession,
      air_price: {
        total_fare: parseFloat(
          bookingDetailsSession.price.main +
            "." +
            bookingDetailsSession.price.decimals
        ),
      },
      passengers: {
        adults: passengersSession.adults.map((adult: any) => ({
          given_name: adult.firstName,
          sur_name: adult.lastName,
          dob: adult.dateOfBirth,
          gender: adult.gender,
          Document: {
            ExpirationDate: adult.expirationDate,
            Number: adult.passport,
            Type: adult.type,
            IssueCountry: adult.issueCountry,
            NationalityCountry: adult.nationality,
          },
        })),
        children: passengersSession.children.map((child: any) => ({
          given_name: child.firstName,
          sur_name: child.lastName,
          dob: child.dateOfBirth,
          gender: child.gender,
          Document: {
            ExpirationDate: child.expirationDate,
            Number: child.passport,
            Type: child.type,
            IssueCountry: child.issueCountry,
            NationalityCountry: child.nationality,
          },
        })),
        infants: passengersSession.infants.map((infant: any) => ({
          given_name: infant.firstName,
          sur_name: infant.lastName,
          dob: infant.dateOfBirth,
          gender: infant.gender,
          Document: {
            ExpirationDate: infant.expirationDate,
            Number: infant.passport,
            Type: infant.type,
            IssueCountry: infant.issueCountry,
            NationalityCountry: infant.nationality,
          },
        })),
      },
      customer_info: {
        phone: customerInfoSession.phoneNumber,
        email: customerInfoSession.email,
      },
    });

    const parseData: ICompleteBookingProps = JSON.parse(data);

    completeBookingFlight(parseData).then((res) => {
      res?.data?.ItineraryRef?.ID &&
        sessionStorage.setItem("BookingCode", res?.data?.ItineraryRef?.ID);
      // router.push(`${"/flight/booking/success"}`);
    });
  }, []);

  return (
    <div className="payment-btn">
      <button
        type="button"
        className="btn btn-solid color1"
        onClick={makePaymentBtn}
      >
        {MakePayment}
      </button>
    </div>
  );
};

export default SuccessBtn;
