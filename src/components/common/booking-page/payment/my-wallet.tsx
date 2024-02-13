import { FC, useEffect, useState } from "react";
import SuccessBtn from "@/components/hotels/booking/checkout/payment-section/success-btn";
import { SelectYourWallet } from "@/constant/constant";
import { options } from "@/data/hotels/booking";
import { UserInfoType } from "@/layouts/header/header-right/page";

const MyWallet: FC = () => {
  const [selectedOption, setSelectedOption] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  useEffect(() => {
    const userInfoLocal = localStorage.getItem("userData");
    if (!userInfoLocal) return;

    const userInfoParsed = JSON.parse(userInfoLocal);
    setUserInfo(userInfoParsed);
  }, []);

  const handleOptionChange = () => {
    setSelectedOption(!selectedOption);
  };

  return (
    <div className="card-body">
      <form
        className="wallet-section"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          event.preventDefault()
        }
      >
        {/* <h6>{SelectYourWallet}</h6> */}
        <div
          className={` ${
            selectedOption && "border-primary"
          } border d-flex flex-column gap-4 align-items-center justify-content-end rounded p-2 w-25 `}
          style={{ height: "120px" }}
        >
          <b> SAR {userInfo?.wallet}</b>
          <input
            className="form-check-input radio_animated"
            type="checkbox"
            name="wallet"
            id="wallet"
            checked={selectedOption}
            onChange={handleOptionChange}
          />
        </div>
        {/* <div className="row">
          {options.map((option, index) => (
            <div className="form-check col-md-6" key={index}>
              <input
                className="form-check-input radio_animated"
                type="radio"
                name="exampleRadios2"
                id={option.id}
                value={option.value}
                checked={selectedOption === option.id}
                onChange={handleOptionChange}
              />
              <label className="form-check-label" htmlFor={option.id}>
                {option.label}
              </label>
            </div>
          ))}
        </div> */}
        {selectedOption && <SuccessBtn />}
      </form>
    </div>
  );
};

export default MyWallet;
