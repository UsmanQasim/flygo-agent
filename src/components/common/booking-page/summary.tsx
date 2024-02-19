import { IBookingDetails } from "@/components/flight/booking/booking-now/page";
import { BookingSummary } from "@/constant/constant";
import { FC, useEffect, useState } from "react";

interface ISummary {
  bookingDetails?: IBookingDetails | undefined;
}

const Summary = ({ bookingDetails }: ISummary) => {
  const [bookingInfo, setBookingInfo] = useState<IBookingDetails>();
  useEffect(() => {
    if (bookingDetails) {
      setBookingInfo(bookingDetails);
    }
  }, [bookingDetails]);

  return (
    <>
      {bookingDetails && bookingDetails.price && (
        <div className="review_box">
          <div className="title-top" >
            <h5>{BookingSummary}</h5>
          </div>
          <div className="flight_detail">
            <div className="summery_box">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Passanger Fee</td>
                    <td>
                      {bookingDetails.price.currency}{" "}
                      {bookingDetails.price.main +
                        "." +
                        bookingDetails.price.decimals}
                    </td>
                  </tr>
                  <tr>
                    <td>total taxes</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Insurance</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Convenience fee</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
              <div className="grand_total">
                <h5>
                  grand total:{" "}
                  <span>
                    {bookingDetails.price.currency}{" "}
                    {bookingDetails.price.main +
                      "." +
                      bookingDetails.price.decimals}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Summary;
