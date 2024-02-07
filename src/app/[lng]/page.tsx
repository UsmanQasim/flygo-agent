"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/home/flight/modern");
  }, []);

  return <></>;
};

export default Home;
