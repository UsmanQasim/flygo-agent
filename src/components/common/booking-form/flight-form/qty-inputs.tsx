import { FC, useState } from "react";

interface QuantityInputProps {
  onQuantityChange?: (quantity: number) => void; // Callback function to notify parent component about quantity change
}

const QuantityInput: FC<QuantityInputProps> = ({ onQuantityChange }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleMinusClick = () => {
    const newQuantity = Math.max(quantity - 1, 0); // Ensure quantity doesn't go below 0
    setQuantity(newQuantity);
    if (!onQuantityChange) return;
    onQuantityChange(newQuantity); // Notify parent component about quantity change
  };

  const handlePlusClick = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (!onQuantityChange) return;
    onQuantityChange(newQuantity); // Notify parent component about quantity change
  };

  return (
    <div className="input-group">
      <button
        type="button"
        className="btn qty-left-minus"
        data-type="minus"
        data-field=""
        tabIndex={0}
        onClick={handleMinusClick}
      >
        <i className="fa fa-minus" aria-hidden="true"></i>
      </button>
      <input
        type="text"
        name="quantity"
        className="form-control input-number qty-input"
        value={quantity}
        tabIndex={0}
        readOnly
      />
      <button
        type="button"
        className="btn qty-right-plus"
        data-type="plus"
        data-field=""
        tabIndex={0}
        onClick={handlePlusClick}
      >
        <i className="fa fa-plus" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default QuantityInput;
