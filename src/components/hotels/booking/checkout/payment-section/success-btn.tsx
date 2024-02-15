import { MakePayment } from "@/constant/constant";
import { RootState } from "@/redux-toolkit/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SuccessBtn = () => {
  const router = useRouter();
  const { i18LangStatus } = useSelector((state: RootState) => state.language);

  const makePaymentBtn = () => {
    // router.push(`${i18LangStatus}`);
    router.push(`${"/flight/booking/success"}`);
  };

  useEffect(() => {}, []);

  return (
    <div className="payment-btn">
      <button
        type="button"
        className="btn btn-solid color1"
        onClick={makePaymentBtn}
      >
        {MakePayment}
      </button>
    </div>
  );
};

export default SuccessBtn;
