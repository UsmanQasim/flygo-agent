"use client";
import React, { useEffect } from "react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { destinationData } from "@/data/home/flight/flight-data";
import Button from "@/components/common/btn";
import Link from "next/link";

declare global {
  interface Window {
    bootstrap: {
      Carousel: any; // Adjust the type if you have a specific type for Carousel
    };
  }
}

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
    // new window.bootstrap.Carousel(carousel);
  }, []); // Run only once on component mount

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

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <div
            style={{
              backgroundImage: `url('/assets/images/plane.webp')`,
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
                <span style={paragraphStyle}>
                  "Discover Your Next Adventure: Explore, Dream, Travel!"
                </span>
              </div>
              <Link href="https://flygo-admin.vercel.app/auth/login">
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
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel-item ">
          <div
            style={{
              backgroundImage: `url('https://www.technologyhunger.com/wp-content/uploads/2021/07/Travel-Agency.jpg')`,
              height: "70vh",
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "0",
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
                <span style={paragraphStyle}>
                  FlyGO - Your Passport to Unforgettable Adventures
                </span>
              </div>
              <Link href="https://flygo-admin.vercel.app/auth/login">
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
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div
            style={{
              backgroundImage: `url('https://static1.simpleflyingimages.com/wordpress/wp-content/uploads/2022/06/heathrow_17581791063207.jpg')`,
              height: "70vh",
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "88%",
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
            >
              <span></span>
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
                <span style={paragraphStyle2}>
                  Where Comfort Meets Adventure: Your Journey, Our Promise
                </span>
              </div>
              <Link href="https://flygo-admin.vercel.app/auth/login">
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
              </Link>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroSection;
