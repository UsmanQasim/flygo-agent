import {
  selectCurrency,
  setCurrencyChange,
} from "@/redux-toolkit/reducers/currency";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Currency: React.FC<ICurrencyProps> = ({ value }) => {
  const { currency } = useSelector(selectCurrency);
  const dispatch = useDispatch();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    dispatch(setCurrencyChange(selectedCurrency));
    localStorage.setItem("selectedCurrency", selectedCurrency);
  };
  useEffect(() => {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    if (storedCurrency) {
      dispatch(setCurrencyChange(storedCurrency));
    }
  }, [dispatch]);

  return (
    <li
      className="front-setting rounded"
      style={{ border: "1px solid #E77C2B", backgroundColor: "orange" }}
    >
      <select
        onChange={handleCurrencyChange}
        value={currency}
        style={{ color: "white" }}
      >
        {value?.type?.map((currencyType, index) => (
          <option
            key={index}
            value={currencyType.name}
            className=""
            style={{ color: "orange" }}
          >
            {currencyType.name}
          </option>
        ))}
      </select>
    </li>
  );
};

export default Currency;
