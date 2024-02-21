// import { bookingsData } from "@/data/pages/all-page";
import React, { FC, useEffect, useState } from "react";
import RenderBooking from "./render-booking";
import DashboardTitle from "../common/dashboard-title";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Loader from "@/layouts/loader/page";
import {
  GetALLAgentBookings,
  IDashboardBookingData,
} from "@/services/dashboard";
import { GetAgentBookingById } from "@/services/dashboard";


const Bookings: FC = () => {
  const [bookingData, setBookingData] = useState<
    IDashboardBookingData[] | undefined
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [show, setShow] = useState(false);
  const [itineraryId, setItineraryId] = useState<number>();
  const [bookingIDModal, setBookingIDModal] = useState<any>(null); // Initialize to null

  useEffect(() => {
    GetALLAgentBookings({
      page: currentPage,
      pageSize: pageSize,
    })
      .then((res) => {
        if (res && res.totalCount) {
          setBookingData(res?.bookings);
          setTotalCount(res?.totalCount || 0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  


  useEffect(() => {
    if (show && itineraryId) {
      GetAgentBookingById(itineraryId as number)
        .then((res) => setBookingIDModal(res))
        .catch((err) => {
          console.error(err);
        });
    }
  }, [itineraryId, show]);

  const handleIconClick = (itineraryId: number) => {
    setItineraryId(itineraryId);
    setShow(true);
  };

  return (
    <>
      <div className="dashboard-box">
        <DashboardTitle title={"All Bookings"} />
        {bookingData && bookingData.map((booking) => (
          <RenderBooking
            key={booking.id}
            {...booking}
            onIconClick={handleIconClick}
          />
        ))}.
             </div>
      {/* .filter((booking: IDashboardBookingData) => booking.status === "upcoming") */}
      {/* <div className="dashboard-box">
        <DashboardTitle title={"past bookings"} />
        {bookingsData.filter((booking: IBookingProps) => booking.status === "past").map(RenderBooking)}
      </div>
      <div className="dashboard-box">
        <DashboardTitle title={"cancelled bookings"} />
        {bookingsData.filter((booking: IBookingProps) => booking.status === "cancelled").map(RenderBooking)}
      </div> */}

       <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>
            Booking Details
          </Modal.Title>
        </Modal.Header>
        {bookingIDModal ? (
          <Modal.Body>
            <Container>
              <Row style={{ paddingTop: "10px" }}>
                <Col sm={6} style={{ fontWeight: "bold" }}>
                  Booking ID
                </Col>
                <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}>
                  {bookingIDModal?.bookingId}
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px" }}>
                <Col sm={6} style={{ fontWeight: "bold" }}>
                  Travellers Detail :
                </Col>
                <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}></Col>
              </Row>

              {bookingIDModal?.travelers.map((value: any) => (
                <div
                  className="container "
                  style={{
                    border: "1px solid #80808017",
                    backgroundColor: "#80808017",
                    borderRadius: "8px",
                    padding: "10px",
                    marginTop: "5px",
                  }}
                >
                  <Row>
                    <Col sm={6} style={{ fontWeight: "bold" }}>
                      Name
                    </Col>
                    <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}>
                      {value.givenName} {}
                      {value.surname}
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={6} style={{ fontWeight: "bold" }}>
                      Email
                    </Col>
                    <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}>
                      {value.emails}
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={6} style={{ fontWeight: "bold" }}>
                      Phone No.
                    </Col>
                    <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}>
                      {value.phones[0].number}
                    </Col>
                  </Row>

                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={6} style={{ fontWeight: "bold" }}>
                      Type
                    </Col>
                    <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}>
                      {value.type}
                    </Col>
                  </Row>
                </div>
              ))}
              <Row style={{ paddingTop: "10px" }}>
                <Col sm={6} style={{ fontWeight: "bold" }}>
                  Flight Detail :
                </Col>
                <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}></Col>
              </Row>
              <div className="container">
                <br />
                <div className="d-flex align-items-center justify-content-between w-100 g-3">
                  <div className="d-flex align-items-center justify-content-center gap-3 w-25">
                    <div className="d-flex flex-column justify-content-start align-items-start">
                      <h4 className="m-0">
                        {bookingIDModal?.flights[0]?.fromAirportCode}
                      </h4>
                    </div>
                  </div>
                  <div className="w-50">
                    <hr />
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3 w-25">
                    <div className="d-flex flex-column justify-content-start align-items-start">
                      <h4 className="m-0">
                        {bookingIDModal?.flights[0]?.toAirportCode}{" "}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              {bookingIDModal?.flights.map((data: any) => (
                <>
                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={6} style={{ fontWeight: "bold" }}>
                      Flight No.
                    </Col>
                    <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}>
                      {data.flightNumber}
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={6} style={{ fontWeight: "bold" }}>
                      Flight Name
                    </Col>
                    <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}>
                      {data.airlineName}
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={6} style={{ fontWeight: "bold" }}>
                      Departure Date/Time
                    </Col>
                    <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}>
                      {data.departureDate}
                      {" / "}
                      {data.departureTime}
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={6} style={{ fontWeight: "bold" }}>
                      Arrival Date/Time
                    </Col>
                    <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}>
                      {data.arrivalDate}
                      {" / "}
                      {data.arrivalTime}
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={6} style={{ fontWeight: "bold" }}>
                      Terminal Name
                    </Col>
                    <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}>
                      {data.arrivalTerminalName}
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={6} style={{ fontWeight: "bold" }}>
                      Cabin Type
                    </Col>
                    <Col sm={6} style={{ color: "#253B74", fontWeight: 600 }}>
                      {data.cabinTypeName}
                    </Col>
                  </Row>
                </>
              ))}
            </Container>
          </Modal.Body>
        ) : (
          <Loader />
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> 
    </>
  );
};

export default Bookings;
