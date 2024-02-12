"use client";
import FlightThree from "@/components/common/booking-form/form3";
import Button from "@/components/common/btn";
import { GreatJourneyBegins, Rica } from "@/constant/constant";
import BackgroundDiv from "@/utils/HOC/background-div";
import { useRouter } from "next/navigation";

const HomeBanner = () => {
  return (
    <section className="cab-section flight-section p-0 border border-danger ">
      <BackgroundDiv
        img={"/assets/images/new/cloud.png"}
        divImg="/assets/images/new/cloud.png"
        imgWidth={1920}
        imgHeight={427}
        displayClass="none"
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 ">
            <div className="cab-content">
              <div className="h-75  overflow-auto no-scrollbar">
                <div className="top-cls">#{Rica}</div>
                <h2>{GreatJourneyBegins}</h2>
                <h3>with a small step</h3>
                <FlightThree />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
