"use client";
import { FC, useEffect } from "react";
import CustomLayout from "@/layouts/layout";
import HomeBanner from "@/components/home/flight/modern/home-banner";
import { parseCookies, setCookie } from "nookies";
import { useSearchParams } from "next/navigation";

const Modern: FC = () => {
  const cookies = parseCookies();
  const searchParams = useSearchParams();

  const token = searchParams.get("data") as string;

  useEffect(() => {
    const decodedToken = decodeURI(token);
    const decodedTokenJson = JSON.parse(decodedToken);
    if (decodedTokenJson) {
      const { accessToken, role, user, userData } = decodedTokenJson;
      setCookie(null, "accessToken", accessToken, { path: "/", secure: true });
      setCookie(null, "token", "true", { path: "/", secure: true });
      setCookie(null, "user", user, { path: "/", secure: true });
      setCookie(null, "userData", userData, { path: "/", secure: true });
      setCookie(null, "role", role, { path: "/", secure: true });

      // window.location.href = "/home/flight";
    }

    console.table(cookies);
  }, [token]);

  return (
    <CustomLayout
      title="overlay-white"
      footerPlace={true}
      hideFooter
      userBgClass="user rounded5"
    >
      <HomeBanner />
    </CustomLayout>
  );
};

export default Modern;
