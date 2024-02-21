"use client";

import { useEffect } from "react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import Link from "next/link";
import { parseCookies } from "nookies";

declare global {
  interface Window {
    bootstrap: {
      Carousel: any; // Adjust the type if you have a specific type for Carousel
    };
  }
}

const paragraphStyle = {
  fontSize: "46px",
  color: "#233972",
  fontWeight: 700,
  margin: "0px",
  padding: "20px",
  background: "-webkit-linear-gradient(#dd7e2a, #273c70)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const paragraphStyle2 = {
  fontSize: "46px",
  color: "#233972",
  fontWeight: 700,
  margin: "0px",
  padding: "20px",
};

const carouselData = [
  {
    url: "/assets/images/plane.webp",
    title: "Discover Your Next Adventure: Explore, Dream, Travel!",
  },
  {
    url: "/assets/carousal-s.jpg",
    title: "FlyGO - Your Passport to Unforgettable Adventures",
  },
  {
    url: "https://static1.simpleflyingimages.com/wordpress/wp-content/uploads/2022/06/heathrow_17581791063207.jpg",
    title: "Where Comfort Meets Adventure: Your Journey, Our Promise",
  },
];

const HeroSection: FC = () => {
  const { symbol, currencyValue } = useSelector(
    (state: RootState) => state.currency
  );

  useEffect(() => {
    // Initialize the carousel when the component mounts
    var myCarousel = document.querySelector(".carousel");
    new window.bootstrap.Carousel(myCarousel, {
      interval: 5000,
      wrap: true,
    });
  }, []);

  const { accessToken } = parseCookies();

  const loginURL = accessToken
    ? "/home/flight"
    : `/pages/other-pages/login?returnURL=${encodeURI("/home/flight")}`;

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {new Array(carouselData.length).fill("").map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="carouselExampleIndicators"
            className={i === 0 ? "active" : ""}
            data-bs-slide-to={`${i}`}
            aria-label={`Slide ${i + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {carouselData.map(({ url, title }, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={index}
          >
            <div
              style={{
                backgroundImage: `url(${url})`,
                height: "70vh",
                backgroundRepeat: "no-repeat",
                backgroundPositionY: "53%",
                backgroundSize: "cover",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                className="mt-5"
              >
                <div
                  style={{
                    backgroundColor: "#fbfcfb82",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "8px",
                  }}
                  className="my-5 "
                >
                  <span style={paragraphStyle}>{title}</span>
                </div>
                <a href={loginURL}>
                  <button
                    type="button"
                    className="btn p-3"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#273c",
                      color: "white",
                    }}
                  >
                    Book Now
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroSection;
