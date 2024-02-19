"use client";
import Button from "@/components/common/btn";
import { DownloadInvoice } from "@/constant/constant";
import {
  CloudBack,
  CloudFront,
  CloudMiddle,
  PlaneSVG,
} from "@/data/svg/flight-svg";
import Img from "@/utils/BackgroundImageRatio";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { parseCookies } from "nookies";

const SuccessPage: FC<ISuccessProps> = ({ title, svg, img }) => {
  const [code, setCode] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const bookingCode = sessionStorage.getItem("BookingCode");
    if (bookingCode && bookingCode?.length > 0 && bookingCode !== undefined) {
      setCode(bookingCode);
    }
  }, []);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.accessToken;
    if (!token) return;

    const parsedToken = decodeURI(token);

    if (parsedToken) setToken(parsedToken);
  }, []);

  return (
    <section className="section-b-space success-section">
      <div className="container">
        {svg && (
          <div className="animation">
            <CloudBack />
            <CloudMiddle />
            <div className="animation__plane--shadow"></div>
            <PlaneSVG />
            <CloudFront />
          </div>
        )}
        <div className="row success-detail mt-0">
          <div className="col">
            <Img src={img} className="img-fluid" alt="" />
            <h2>{title}</h2>
            <p>
              thank you for you payment. we have received your payment
              successfully. your transaction ID is "{code}", you will get an
              email invoice soon!
            </p>
            <div className="d-flex gap-2 justify-content-center">
              {token && (
                <Link
                  href={`https://flygo-admin.vercel.app/auth/accept-redirects?__t=${encodeURI(
                    token
                  )} `}
                  target="_blank"
                >
                  <Button
                    btnClass="btn btn-solid color1"
                    name={"View Booking History "}
                  />
                </Link>
              )}
              <Button btnClass="btn btn-solid color1" name={DownloadInvoice} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
