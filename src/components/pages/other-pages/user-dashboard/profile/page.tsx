"use client";
import { userSection } from "@/data/pages/all-page";
import React, { FC, useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import EmailModalShow from "./EmailModalShow";
import PhoneModalShow from "./PhoneModalShow";
import PasswordModalShow from "./PasswordModalShow";
import { parseCookies } from "nookies";
import moment from "moment";

const Profile: FC = () => {
  const { userData } = parseCookies();
  const user = userData ? JSON.parse(userData) : null;
  const [modalOpen, setModalOpen] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [isOkey, setIsOkey] = useState(false);
  const toggle = () => setModalOpen(!modalOpen);
  const multipleToggleHandle = (name: string) => {
    name === "email address"
      ? setEmailModal(!emailModal)
      : name == "phone no"
      ? setPhoneModal(!phoneModal)
      : setPasswordModal(!passwordModal);
  };

  useEffect(() => {
    setIsOkey(true);
  }, []);
  const excludeKeys = ["accessToken", "logo", "updatedAt", "admin_id", "role"];
  console.log(user, "user");
  return (
    <>
      <div className="dashboard-box">
        <div className="dashboard-title">
          <h4>{"Profile"}</h4>
          {"Profile" && <span onClick={toggle}>edit</span>}
        </div>
        {isOkey && (
          <div className="dashboard-detail">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>ID</div>
              <div style={{ textAlign: "start", width: "50%" }}>{user?.id}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>Email</div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.email}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>Landline</div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.landline}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>Mobile</div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.mobile}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>Country</div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.country}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>City</div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.city}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>TravelAgentId</div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.travelAgentId}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>
                Representative Name
              </div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.representativeName}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>Company Name</div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.companyName}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>Akama</div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.akama}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>CreditLimit</div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.creditLimit}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>
                ServiceCharges
              </div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.serviceCharges || "N/A"}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>
                ServiceChargesType
              </div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.serviceChargesType || "N/A"}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>Wallet</div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {user?.wallet}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
                marginBottom: "15px",
              }}
            >
              <div style={{ fontWeight: 700, width: "50%" }}>CreatedAt</div>
              <div style={{ textAlign: "start", width: "50%" }}>
                {" "}
                {moment(user?.createdAt).format("LLL")}
              </div>
            </div>

            {/* {isOkey && (
            <ul suppressHydrationWarning={true}>
              {user &&
                Object.entries(user).map(([key, value], index) =>
                  !excludeKeys.includes(key) ? (
                    <li key={index} suppressHydrationWarning={true}>
                      <div className="details">
                        <div className="left">
                          <h6 suppressHydrationWarning={true}>{key}</h6>
                        </div>
                        <div className="right">
                          {value !== null ? (
                            <>
                              {key === "createdAt" || key === "updatedAt" ? (
                                <h6 suppressHydrationWarning={true}>
                                  {moment(value).format("LLL")}
                                </h6>
                              ) : (
                                <h6 suppressHydrationWarning={true}>
                                  {(value as string) || ""}
                                </h6>
                              )}
                            </>
                          ) : (
                            <h6 suppressHydrationWarning={true}>-</h6>
                          )}
                        </div>
                      </div>
                    </li>
                  ) : null
                )}
            </ul>
          )} */}
          </div>
        )}
      </div>
      <EditProfile open={modalOpen} toggle={toggle} />
      <EmailModalShow open={emailModal} toggle={multipleToggleHandle} />
      <PhoneModalShow open={phoneModal} toggle={multipleToggleHandle} />
      <PasswordModalShow open={passwordModal} toggle={multipleToggleHandle} />
    </>
  );
};

export default Profile;
