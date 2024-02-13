"use client";
import React from "react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { destinationData } from "@/data/home/flight/flight-data";
import Button from "@/components/common/btn";
import Link from "next/link";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const HeroSection: FC = () => {
  const { symbol, currencyValue } = useSelector(
    (state: RootState) => state.currency
  );
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
      id="carouselExampleControls"
      className="carousel  slide"
      data-bs-ride="carousel"
    >
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
                <p style={paragraphStyle}>
                  "Discover Your Next Adventure: Explore, Dream, Travel!"
                </p>
              </div>
              <a href="/home/flight">
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
                <p style={paragraphStyle}>
                  FlyGO - Your Passport to Unforgettable Adventures
                </p>
              </div>
              <a href="/home/flight">
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
                <p style={paragraphStyle2}>
                  Where Comfort Meets Adventure: Your Journey, Our Promise
                </p>
              </div>
              <a href="/home/flight">
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
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroSection;
