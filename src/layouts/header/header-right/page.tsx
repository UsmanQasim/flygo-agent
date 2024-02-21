"use client";
import {
  RightNavMenuItem,
  currencyDropDownData,
  languageDropDownData,
} from "@/constant/menu";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Currency from "./currency";
import Language from "./language";
import { IHeaderRightProps } from "./header-right";
import { destroyCookie, parseCookies } from "nookies";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";

export type UserInfoType = {
  id: number;
  email: string;
  landline?: string | null;
  mobile: string;
  country?: string | null;
  city?: string | null;
  travelAgentId: string;
  logo: string;
  representativeName: string;
  companyName?: string | null;
  akama: string;
  status: number;
  creditLimit?: number | null;
  serviceCharges?: number | null;
  serviceChargesType?: string | null;
  wallet: string;
  admin_id?: number | null;
  createdAt: string; // Date string in ISO 8601 format
  updatedAt: string; // Date string in ISO 8601 format
  accessToken: string;
  role: string;
};

const HeaderRight: React.FC<IHeaderRightProps> = ({ userBgClass }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserInfoType | null>();
  const [settingIcon, setSettingIcon] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const userInfo = cookies.userData;
    if (userInfo) setUser(JSON.parse(userInfo));
  }, []);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    cookies.remove("userData");
    cookies.remove("accessToken");
    cookies.remove("user");
    cookies.remove("token");
    cookies.remove("role");

    setUser(null);
  };
  return (
    <ul className="header-right">
      {RightNavMenuItem.map((value, i) => (
        <Fragment key={i}>
          {value.title === "currency" && <Currency value={value} />}
          {value.title === "language" && <Language value={value} />}
          {value.title === "user" && (
            <li className={`${userBgClass && userBgClass}`}>
              {user ? (
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="rounded p-2"
                  style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #213B70",
                    position: "relative", // Necessary for absolute positioning of the dropdown
                    borderBottomLeftRadius: showDropdown ? "0px" : "5px",
                    borderBottomRightRadius: showDropdown ? "0px" : "5px",
                  }}
                >
                  <i className="fas fa-user" color="#213B70"></i>
                  <b style={{ color: "#213B70" }}>{user?.representativeName}</b>
                  {showDropdown && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "#fff",
                        border: "1px solid #213B70",
                        borderTopLeftRadius: "0",
                        borderTopRightRadius: "0",
                        borderBottomLeftRadius: "5px",
                        borderBottomRightRadius: "5px",
                        width: "100%",
                        zIndex: 999,
                      }}
                    >
                      <a
                        href="/pages/other-pages/user-dashboard"
                        className="dropdownuser"
                        style={{
                          display: "block",
                          marginBottom: "5px",
                          border: "0px",
                          background: "transparent",
                          color: "black",
                          textAlign: "center",
                          marginTop: "10px",
                        }}
                      >
                        Dashboard
                      </a>

                      {/* <button >Dashboard</button> */}
                      <a
                        href="/"
                        onClick={handleLogout}
                        className="dropdownuser"
                        style={{
                          border: "0px",
                          background: "transparent",
                          color: "black",
                          cursor: "pointer",
                          display: "block",
                          width: "100%",
                          textAlign: "center",
                          marginBottom: "10px",
                        }}
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={"/pages/other-pages/login"}
                  className="rounded p-2"
                  style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #213B70",
                  }}
                >
                  {/* <i className="fas fa-user " color="#213B70"></i> */}
                  <b style={{ color: "#213B70" }}>LOGIN</b>
                </Link>
              )}
            </li>
          )}
          {value.title === "setting" && (
            <li className="setting">
              <a href="#js" onClick={() => setSettingIcon(!settingIcon)}>
                <i className="fas fa-cog" />
              </a>
              <ul className={`setting-open z-3 ${settingIcon ? "show " : ""} `}>
                <Currency value={currencyDropDownData} />
                <Language value={languageDropDownData} />
              </ul>
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
};

export default HeaderRight;
