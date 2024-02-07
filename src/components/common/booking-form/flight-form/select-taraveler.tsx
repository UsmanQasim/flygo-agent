import { FC, useState } from "react";
import QtyBox from "@/components/common/booking-form/flight-form/qty-box";
import useOutsideDropdown from "@/utils/useOutsideDropdown";
// import Image from "next/image";
// import FlightClass from "./flight-class";

interface SelectTravelerProps {
  onPassengerChange: (
    adults: number,
    children: number,
    infants: number
  ) => void;
}

const SelectTraveler: FC<SelectTravelerProps> = ({ onPassengerChange }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useOutsideDropdown(false);
  const [selectedCity, setSelectedCity] = useState(
    "1 Adult, 1 Child, 1 Infant"
  );
  const [adultQuantity, setAdultQuantity] = useState(1);
  const [childrenQuantity, setChildrenQuantity] = useState(1);
  const [infantQuantity, setInfantQuantity] = useState(1);

  const handleApply = () => {
    setSelectedCity(
      `${adultQuantity} Adult, ${childrenQuantity} Child, ${infantQuantity} Infant`
    );

    onPassengerChange(adultQuantity, childrenQuantity, infantQuantity);
    setIsComponentVisible(false);
  };

  const handleAdultChange = (value: number) => {
    setAdultQuantity(value);
  };

  const handleChildrenChange = (value: number) => {
    setChildrenQuantity(value);
  };

  const handleInfantChange = (value: number) => {
    setInfantQuantity(value);
  };

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control open-select"
        placeholder="traveler"
        value={selectedCity}
        readOnly={true}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      />
      <img src="/assets/images/icon/user.png" className="img-fluid" alt="" />
      <div
        ref={ref}
        className={`selector-box-flight ${isComponentVisible ? "show" : ""}`}
      >
        <QtyBox
          onAdultChange={handleAdultChange}
          onChildrenChange={handleChildrenChange}
          onInfantChange={handleInfantChange}
        />
        {/* <FlightClass /> */}
        <div className="bottom-part">
          <span className="btn border-0" onClick={handleApply}>
            apply
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectTraveler;
