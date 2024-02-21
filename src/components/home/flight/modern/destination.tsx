"use client";
import { FC } from "react";
import { slide3 } from "@/components/common/slider-options";
import TitleThree from "@/components/common/title/title-three";
import { destinationData } from "@/data/home/flight/flight-data";
import Slider from "react-slick";
import Button from "@/components/common/btn";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import Img from "@/utils/BackgroundImageRatio";
import Link from "next/link";
import { parseCookies } from "nookies";

const Destination: FC = () => {
  const { symbol, currencyValue } = useSelector(
    (state: RootState) => state.currency
  );

  const { accessToken } = parseCookies();

  const loginURL = accessToken
    ? "/home/flight"
    : `/pages/other-pages/login?returnURL=${encodeURI("/home/flight")}`;

  return (
    <section className="blog_section destination-section section-b-space ratio_55">
      <div className="container">
        <TitleThree
          classTitle={"title-2"}
          subTitle="featured..."
          span="destination"
          desc="Discover our recommended spots for your next adventure. Explore hidden gems and popular destinations handpicked for you."
        />
        <Slider {...slide3} className="slide-3 no-arrow">
          {destinationData.map((data: IDestinationProps, index) => (
            <div key={index}>
              <div className="blog-wrap">
                <div className="blog-image">
                  <div>
                    <Img src={data.img} className="img-fluid bg-img" alt="" />
                  </div>
                </div>
                <div className="destination-details">
                  <div>
                    <h5>{data.country}</h5>
                    <h2>{data.place}</h2>
                    <h6>
                      Book your economy class tickets now for travel and embark
                      on an unforgettable journey to the heart of the vibrant
                      capital.
                    </h6>
                    <Link href={loginURL}>
                      <Button
                        btnClass="btn btn-rounded color2 fs-6"
                        name={`from ${symbol}${(
                          currencyValue * data.from
                        ).toFixed(0)}*`}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Destination;
