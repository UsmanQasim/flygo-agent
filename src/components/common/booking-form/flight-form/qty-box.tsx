import QuantityInput from "./qty-inputs";
import { Adult } from "@/constant/constant";

interface QtyBoxProps {
  onAdultChange?: (value: number) => void;
  onChildrenChange?: (value: number) => void;
  onInfantChange?: (value: number) => void;
}

const QtyBox: React.FC<QtyBoxProps> = ({
  onAdultChange,
  onChildrenChange,
  onInfantChange,
}) => {
  return (
    <div className="room-cls">
      <div className="qty-box">
        <label>{Adult}</label>
        <QuantityInput onQuantityChange={onAdultChange} />
      </div>
      <div className="qty-box">
        <label>children</label>
        <QuantityInput onQuantityChange={onChildrenChange} />
      </div>
      <div className="qty-box">
        <label>infant</label>
        <QuantityInput onQuantityChange={onInfantChange} />
      </div>
    </div>
  );
};

export default QtyBox;
