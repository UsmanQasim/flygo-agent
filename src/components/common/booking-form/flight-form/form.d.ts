interface LocationOptionProps {
  isOneWay: boolean;
  isRoundTrip: boolean;
  isMultiCityTrip: boolean;
  onOptionChange: (isRoundTrip: string) => void;
}

interface IQuantityInputProps<T extends number | number[]> {
  quantities?: T;
  handleQuantityChange?: (
    index: number,
    value: T extends number[] ? number : T
  ) => void;
  index?: number;
  setOpen?: Function;
  open?: boolean;
}

interface ISelectCityProps {
  cityData: ICityProps[];
  value: string;
}

interface ICityProps {
  id: number;
  place: string;
  airport: string;
  button: string;
}

interface IFlightCityProps {
  flighData: IFlightProps[];
  value: string;
  placeHolder?: string;
  onChange?: Function;
  onSelectedCityChange?: (city: string) => void;
}

interface IFlightProps {
  VENDOR_CODE: string;
  POI_NAME: string;
  CITY_NAME?: string;
  COUNTRY_CODE: string;
  LATITUDE: string;
  LONGITUDE: string;
}
