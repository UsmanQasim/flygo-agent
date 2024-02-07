import { FC } from "react";
import DetailBar from "../product-box/flight-product-box/detail-bar";

const FlightProductBox: FC<IFlightProductBoxProps> = ({
  flights,
  data,
  cardToShow,
  grid,
}) => {
  return (
    <div className="flight-detail-sec m-0">
      <div className="title-bar">
        <div className="row">
          <div className="col-3">
            <p>Airline</p>
          </div>
          <div className="col-5">
            <p>departure & arrival</p>
          </div>
          <div className="col-2">
            <p>price</p>
          </div>
        </div>
      </div>
      <DetailBar
        flights={flights}
        data={data}
        cardToShow={cardToShow}
        grid={grid}
      />
    </div>
  );
};

export default FlightProductBox;
