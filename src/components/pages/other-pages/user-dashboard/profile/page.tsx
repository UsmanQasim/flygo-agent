import { userSection } from "@/data/pages/all-page";
import React, { FC, useState } from "react";
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
  const toggle = () => setModalOpen(!modalOpen);
  const multipleToggleHandle = (name: string) => {
    name === "email address"
      ? setEmailModal(!emailModal)
      : name == "phone no"
      ? setPhoneModal(!phoneModal)
      : setPasswordModal(!passwordModal);
  };

  const excludeKeys = ["accessToken", "logo", "updatedAt", "admin_id", "role"];
  return (
    <>
      <div className="dashboard-box">
        <div className="dashboard-title">
          <h4>{"Profile"}</h4>
          {"Profile" && <span onClick={toggle}>edit</span>}
        </div>
        <div className="dashboard-detail">
          <ul>
            {user &&
              Object.entries(user).map(([key, value], index) =>
                !excludeKeys.includes(key) ? (
                  <li key={index}>
                    <div className="details">
                      <div className="left">
                        <h6>{key}</h6>
                      </div>
                      <div className="right">
                        {value !== null ? (
                          <>
                            {key === "createdAt" || key === "updatedAt" ? (
                              <h6>{moment(value).format("LLL")}</h6>
                            ) : (
                              <h6>{(value as string) || ""}</h6>
                            )}
                            {/* <span onClick={() => multipleToggleHandle(key)}>edit</span> */}
                          </>
                        ) : (
                          <h6>-</h6>
                        )}
                      </div>
                    </div>
                  </li>
                ) : null
              )}
          </ul>
        </div>
      </div>
      <EditProfile open={modalOpen} toggle={toggle} />
      <EmailModalShow open={emailModal} toggle={multipleToggleHandle} />
      <PhoneModalShow open={phoneModal} toggle={multipleToggleHandle} />
      <PasswordModalShow open={passwordModal} toggle={multipleToggleHandle} />
    </>
  );
};

export default Profile;
