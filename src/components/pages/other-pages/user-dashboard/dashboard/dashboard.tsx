import { useEffect, useState } from "react";
import Img from "@/utils/BackgroundImageRatio";
import { AgentDashBoardData, GetDashboard } from "@/services/dashboard";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {
  GetALLAgentBookings,
  GetAgentBookingById,
  IDashboardBookingData,
} from "@/services/dashboard";
import moment from "moment";
import Loader from "@/layouts/loader/page";

type DashboardType = {
  handleTabClick: Function;
};

const Dashboard = ({ handleTabClick }: DashboardType) => {
  const [dashboardData, setDashboardData] = useState<AgentDashBoardData>();
  const [bookingID, setBookingID] = useState<any>();
  const [bookingIDModal, setBookingIDModal] = useState<any>();
  const [show, setShow] = useState(false);
  const [bookingData, setBookingData] = useState<
    IDashboardBookingData[] | undefined
  >([]);

  useEffect(() => {
    GetDashboard()
      .then((res) => setDashboardData(res))
      .catch((er) => {
        console.error(er);
      });

    GetALLAgentBookings()
      .then((res) => res && setBookingData(res.bookings))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    GetAgentBookingById(bookingID)
      .then((res) => setBookingIDModal(res))
      .catch((err) => {
        console.error(err);
      });
  }, [bookingID]);

  return (
    <div className="dashboard-main">
      {/* <div className="dashboard-intro">
        <h5>
          welcome! <span>Mark Enderess</span>
        </h5>
        <p>you have completed 70% of your profile. add basic info to complete profile.</p>
        <div className="complete-profile">
          <div className="row">
            {[
              { text: "verified email ID", icon: "far fa-check-square" },
              { text: "verified phone number", icon: "far fa-check-square" },
              { text: "complete basic info", icon: "far fa-window-close", className: "not-complete" },
            ].map((item, index) => (
              <div className="col-xl-4" key={index}>
                <div className={`complete-box ${item.className || ""}`}>
                  <i className={item.icon}></i>
                  <h6>{item.text}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <div className="counter-section">
        <div className="row">
          <div className="col-xl-6 col-sm-6">
            <div className="counter-box">
              <Img
                src={"/assets/images/icon/flight.png"}
                className="img-fluid"
                alt="total balance"
              />
              <h3>SAR {dashboardData?.wallet}</h3>
              <h5>{"Total Balance"}</h5>
            </div>
          </div>
          <div className="col-xl-6 col-sm-6">
            <div className="counter-box">
              <Img
                src={"/assets/images/icon/flight.png"}
                className="img-fluid"
                alt="flight"
              />
              <h3>{dashboardData?.totalBookings}</h3>
              <h5>{"Total Bookings"}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-info">
        <div className="row">
          {/* <div className="col-md-6">
            <div id="chart">
              <ReactApexChart
                type="radialBar"
                width={300}
                height={319}
                options={chartDataOption}
                series={chartData.series}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="activity-box">
              <h6>recent activity</h6>
              <ul>
                {activities.map((activity, index) => (
                  <li key={index} className={activity.className || ""}>
                    <i className={activity.icon}></i>
                    {activity.text}
                    <span>{activity.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
          <div className="w-100">
            <div className="card ">
              <div className="card-header">
                <div className="card-header-title mb-4">
                  <h3>
                    <b>Booking History</b>
                  </h3>
                </div>
              </div>
              <div className="card-body ">
                <div className="table-responsive ">
                  <table className=" dashboard-table table border-0 ">
                    <thead>
                      <tr>
                        <th>
                          <span>Flight No</span>
                        </th>
                        <th>
                          <span>Origin</span>
                        </th>
                        <th>
                          <span />
                        </th>
                        <th>
                          <span>Departure Date</span>
                        </th>
                        <th>
                          <span />
                        </th>
                        <th>
                          <span>Arrival Date</span>
                        </th>
                        <th>
                          <span>Destination</span>
                        </th>
                        <th>
                          <span>Status</span>
                        </th>
                        <th>
                          <span>View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingData?.slice(0, 5).map((data: any, index: any) => (
                        <tr key={index} className="text-left ">
                          <td className="p-3">
                            <span className="fw-bolder">{data.flight_no}</span>
                          </td>
                          <td className="p-3">
                            <span className="fw-bolder">{data.origin}</span>
                          </td>
                          <td className="p-3">
                            {/* <span>{data.origin}</span> */}
                          </td>
                          <td className="p-3">
                            <span>
                              {" "}
                              {/* {flightTakeOff()} */}
                              {moment(data.depart_date_time).format(
                                "MMMM Do YYYY"
                              )}
                            </span>
                          </td>
                          <td className="p-3">
                            <span />
                          </td>
                          <td className="p-3">
                            <span>
                              {/* {flightLand()} */}
                              {moment(data.arrival_date_time).format(
                                "MMMM Do YYYY"
                              )}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="fw-bolder mt-2">
                              {data.destination}
                            </span>
                          </td>
                          <td className="p-3">
                            <span
                              className={`p-2 text-white badge text-capitalize `}
                              style={{
                                background:
                                  data.status === "pending"
                                    ? "#233972"
                                    : data.status === "Cancelled"
                                    ? "#E77C2B"
                                    : "#41A24C",
                              }}
                            >
                              {data.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <span
                              onClick={() => {
                                setShow(true), setBookingID(data?.itinerary_id);
                              }}
                              style={{
                                cursor: "pointer",
                                fontSize: "20px",
                                color: "#253C72",
                              }}
                            >
                              <i className="fa fa-eye" />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={() => handleTabClick("bookings")}
                  className="border mt-4 p-4 text-center w-100 rounded bg-primary text-white"
                >
                  Show All Bookings
                </button>
              </div>
            </div>
          </div>

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
                    <Col
                      sm={6}
                      style={{ color: "#253B74", fontWeight: 600 }}
                    ></Col>
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
                        <Col
                          sm={6}
                          style={{ color: "#253B74", fontWeight: 600 }}
                        >
                          {value.givenName} {}
                          {value.surname}
                        </Col>
                      </Row>
                      <Row style={{ paddingTop: "10px" }}>
                        <Col sm={6} style={{ fontWeight: "bold" }}>
                          Email
                        </Col>
                        <Col
                          sm={6}
                          style={{ color: "#253B74", fontWeight: 600 }}
                        >
                          {value.emails}
                        </Col>
                      </Row>
                      <Row style={{ paddingTop: "10px" }}>
                        <Col sm={6} style={{ fontWeight: "bold" }}>
                          Phone No.
                        </Col>
                        <Col
                          sm={6}
                          style={{ color: "#253B74", fontWeight: 600 }}
                        >
                          {value.phones[0].number}
                        </Col>
                      </Row>

                      <Row style={{ paddingTop: "10px" }}>
                        <Col sm={6} style={{ fontWeight: "bold" }}>
                          Type
                        </Col>
                        <Col
                          sm={6}
                          style={{ color: "#253B74", fontWeight: 600 }}
                        >
                          {value.type}
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={6} style={{ fontWeight: "bold" }}>
                      Flight Detail :
                    </Col>
                    <Col
                      sm={6}
                      style={{ color: "#253B74", fontWeight: 600 }}
                    ></Col>
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
                        <Col
                          sm={6}
                          style={{ color: "#253B74", fontWeight: 600 }}
                        >
                          {data.flightNumber}
                        </Col>
                      </Row>
                      <Row style={{ paddingTop: "10px" }}>
                        <Col sm={6} style={{ fontWeight: "bold" }}>
                          Flight Name
                        </Col>
                        <Col
                          sm={6}
                          style={{ color: "#253B74", fontWeight: 600 }}
                        >
                          {data.airlineName}
                        </Col>
                      </Row>
                      <Row style={{ paddingTop: "10px" }}>
                        <Col sm={6} style={{ fontWeight: "bold" }}>
                          Departure Date/Time
                        </Col>
                        <Col
                          sm={6}
                          style={{ color: "#253B74", fontWeight: 600 }}
                        >
                          {data.departureDate}
                          {" / "}
                          {data.departureTime}
                        </Col>
                      </Row>
                      <Row style={{ paddingTop: "10px" }}>
                        <Col sm={6} style={{ fontWeight: "bold" }}>
                          Arrival Date/Time
                        </Col>
                        <Col
                          sm={6}
                          style={{ color: "#253B74", fontWeight: 600 }}
                        >
                          {data.arrivalDate}
                          {" / "}
                          {data.arrivalTime}
                        </Col>
                      </Row>
                      <Row style={{ paddingTop: "10px" }}>
                        <Col sm={6} style={{ fontWeight: "bold" }}>
                          Terminal Name
                        </Col>
                        <Col
                          sm={6}
                          style={{ color: "#253B74", fontWeight: 600 }}
                        >
                          {data.arrivalTerminalName}
                        </Col>
                      </Row>
                      <Row style={{ paddingTop: "10px" }}>
                        <Col sm={6} style={{ fontWeight: "bold" }}>
                          Cabin Type
                        </Col>
                        <Col
                          sm={6}
                          style={{ color: "#253B74", fontWeight: 600 }}
                        >
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
