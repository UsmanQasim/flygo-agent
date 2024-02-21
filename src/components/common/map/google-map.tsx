import { FC } from "react";

const GoogleMapComponent: FC = () => {
  return (
    <iframe
      style={{ height: "100%", width: "100%" }}
      className="map"
      id="map"
      title="flygo location"
      src="https://maps.google.com/maps?width=100%25&amp;height=800&amp;hl=en&amp;q=Jeddah+(Flygo)&amp;t=k&amp;z=10&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      allowFullScreen
    ></iframe>
  );
};

export default GoogleMapComponent;
