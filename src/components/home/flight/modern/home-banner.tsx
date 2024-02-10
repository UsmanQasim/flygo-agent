"use client";
import { FC, useState } from "react";
import FlightThree from "@/components/common/booking-form/form3";
import Button from "@/components/common/btn";
import { BookNow, GreatJourneyBegins, Rica } from "@/constant/constant";
import BackgroundDiv from "@/utils/HOC/background-div";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HomeBanner: FC = () => {
  const router = useRouter();

  const handleBookNow = (formData: any) => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
    router.push("/flight/listing/left-sidebar");
  };

  return (
    <section className="cab-section flight-section p-0 border border-danger ">
      <BackgroundDiv
        img={"/assets/images/new/cloud.png"}
        // divImg="/assets/images/flights/cloud.png"
        divImg="/assets/images/new/cloud.png"
        imgWidth={1920}
        imgHeight={427}
        displayClass="none"
      />
      <div className="container overflow-auto">
        <div className="row">
          <div className="col-lg-6 ">
            <div className="cab-content">
              <div>
                <div className="top-cls">#{Rica}</div>
                <h2>{GreatJourneyBegins}</h2>
                <h3>with a small step</h3>
                {/* <div className="overflow-auto border border-danger"> */}
                <FlightThree onBookNow={handleBookNow} />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
