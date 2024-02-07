import { OneWay, RoundTrip, MultiCityRoute } from "@/constant/constant";
import { FC, useEffect } from "react";

const LocationOption: FC<LocationOptionProps> = ({
  isOneWay = true,
  isRoundTrip,
  isMultiCityTrip,
  onOptionChange,
}) => {
  return (
    <div className="location-option d-flex">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="exampleRadios1"
          value="option1"
          checked={isOneWay}
          onChange={() => onOptionChange("oneway")}
        />
        <label className="text-dark form-check-label" htmlFor="exampleRadios1">
          {OneWay}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios2"
          id="exampleRadios2"
          value="option2"
          checked={isRoundTrip}
          onChange={() => onOptionChange("round")}
        />
        <label className="text-dark form-check-label" htmlFor="exampleRadios2">
          {RoundTrip}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios3"
          id="exampleRadios3"
          value="option3"
          checked={isMultiCityTrip}
          onChange={() => onOptionChange("multi")}
        />
        <label className="text-dark form-check-label" htmlFor="exampleRadios3">
          {MultiCityRoute}
        </label>
      </div>
    </div>
  );
};

export default LocationOption;
