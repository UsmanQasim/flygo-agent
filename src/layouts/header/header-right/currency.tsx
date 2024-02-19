import {
  selectCurrency,
  setCurrencyChange,
} from "@/redux-toolkit/reducers/currency";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Currency: React.FC<ICurrencyProps> = ({ value }) => {
  const { currency } = useSelector(selectCurrency);
  const dispatch = useDispatch();

  const handleCurrencyChange = (value: any) => {
    const selectedCurrency = value;
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
    <div
      className="btn-group "
      style={{ width: "80px", cursor: "pointer",position:'relative' ,minWidth:"80px"}}
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <input
        type="text"
        className="form-control dropdown-toggle "
        value={currency}
        style={{
          position: "relative",
          cursor: "pointer",
          border: "1px solid #E77C2B",
          backgroundColor: "#E77C2B",
          color: "white",textTransform:'uppercase'
        }}
        name="currency"
      />
      <div
      id="currency"

        className="input-group-text dropdown-toggle absolute bg-transparent border-0 right-0 bottom-0 h-100 text-white"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          border: "0px",
        }}
      >
        <i className="bi bi-person-fill"></i>
      </div>
      <ul
        className="dropdown-menu"
        style={{
          minWidth: "80px !important",
          width: "80px",
        }}
      >
        {value?.type?.map((currencyType, index) => (
          <li
            key={index}
            onClick={() => handleCurrencyChange(currencyType.name)}
            value={currencyType.name}
            className="dropdown-item"
            style={{ marginLeft: "0px" }}
          >
            {currencyType.name}
          </li>
        ))}
      </ul>
    </div>
    // <li
    //   className="front-setting rounded"
    //   style={{ border: "1px solid whtie", backgroundColor: "#E77C2B" }}
    // >
    //   <select
    //     onChange={handleCurrencyChange}
    //     value={currency}
    //     style={{ color: "white" }}
    //   >
    //     {value?.type?.map((currencyType, index) => (
    //       <option key={index} value={currencyType.name} className="optionClass">
    //         {currencyType.name}
    //       </option>
    //     ))}
    //   </select>
    // </li>
  );
};

export default Currency;
