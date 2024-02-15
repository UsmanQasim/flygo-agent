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
  const [user, setUser] = useState<UserInfoType | null>();

  useEffect(() => {
    const userInfo = localStorage.getItem("userData");
    if (userInfo) setUser(JSON.parse(userInfo));
  }, []);

  const [settingIcon, setSettingIcon] = useState(false);
  return (
    <ul className="header-right">
      {RightNavMenuItem.map((value, i) => (
        <Fragment key={i}>
          {value.title === "currency" && <Currency value={value} />}
          {value.title === "language" && <Language value={value} />}
          {value.title === "user" && (
            <li className={`${userBgClass && userBgClass}`}>
              <Link
                href={"https://flygo-admin.vercel.app/dashboard"}
                className="border rounded p-2"
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <i className="fas fa-user " color="#233A6F"></i>
                <b>{user?.representativeName}</b>
              </Link>
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
