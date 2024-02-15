import { FC, useEffect, useState } from "react";
import SuccessBtn from "@/components/hotels/booking/checkout/payment-section/success-btn";
import { SelectYourWallet } from "@/constant/constant";
import { options } from "@/data/hotels/booking";
import { UserInfoType } from "@/layouts/header/header-right/page";
import {
  ICompleteBookingProps,
  completeBookingFlight,
} from "@/services/flights";
import { useRouter } from "next/navigation";

const MyWallet: FC = () => {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  useEffect(() => {
    const userInfoLocal = localStorage.getItem("userData");
    if (!userInfoLocal) return;

    const userInfoParsed = JSON.parse(userInfoLocal);
    setUserInfo(userInfoParsed);
  }, []);

  const makeAPICall = () => {
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

    completeBookingFlight(parseData)
      .then((res) => {
        res?.data?.ItineraryRef?.ID &&
          sessionStorage.setItem("BookingCode", res?.data?.ItineraryRef?.ID);
        router.push(`${"/flight/booking/success"}`);
      })
      .catch((err) => {
        alert(`something went wrong  , ${err}`);
      });
  };

  const handleOptionChange = () => {
    setSelectedOption(!selectedOption);
  };

  return (
    <div className="card-body">
      <form
        className="wallet-section"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          event.preventDefault()
        }
      >
        {/* <h6>{SelectYourWallet}</h6> */}
        <div
          className={` ${
            selectedOption && "border-primary"
          } border d-flex flex-column gap-4 align-items-center justify-content-end rounded p-2 w-25 `}
          style={{ height: "120px" }}
        >
          <b> SAR {userInfo?.wallet}</b>
          <input
            className="form-check-input radio_animated"
            type="checkbox"
            name="wallet"
            id="wallet"
            checked={selectedOption}
            onChange={handleOptionChange}
          />
        </div>
        {/* <div className="row">
          {options.map((option, index) => (
            <div className="form-check col-md-6" key={index}>
              <input
                className="form-check-input radio_animated"
                type="radio"
                name="exampleRadios2"
                id={option.id}
                value={option.value}
                checked={selectedOption === option.id}
                onChange={handleOptionChange}
              />
              <label className="form-check-label" htmlFor={option.id}>
                {option.label}
              </label>
            </div>
          ))}
        </div> */}
        {selectedOption && (
          <button
            className="payment-btn btn btn-solid color1"
            onClick={makeAPICall}
          >
            Make Payment
          </button>
        )}
        {/* {selectedOption && <SuccessBtn />} */}
      </form>
    </div>
  );
};

export default MyWallet;
