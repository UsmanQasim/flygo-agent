import { PopularCities } from "@/constant/constant";
import useOutsideDropdown from "@/utils/useOutsideDropdown";
import Image from "next/image";
import { FC, useState, useRef, useEffect } from "react";

const SelectCity: FC<IFlightCityProps> = ({
  value,
  flighData,
  placeHolder,
  onSelectedCityChange,
}) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useOutsideDropdown(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [citiesPerPage] = useState<number>(5); // Number of cities to load per page
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCityRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (loading) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    if (lastCityRef.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }, options);

      observer.current.observe(lastCityRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (!loading) return;

    setLoading(false);
  }, [loading]);

  const loadMoreCities = () => {
    setLoading(true);
  };

  // Filter cities based on search term
  const filteredCities = flighData.filter(
    (city) =>
      city.POI_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.COUNTRY_CODE.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.VENDOR_CODE.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic to get current cities based on pagination and search term
  const indexOfLastCity = currentPage * citiesPerPage;
  const currentCities = filteredCities.slice(0, indexOfLastCity);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (onSelectedCityChange) onSelectedCityChange(inputValue);
    setSearchTerm(inputValue);
    setCurrentPage(1);
  };

  const handleCitySelect = (city: string) => {
    if (onSelectedCityChange) onSelectedCityChange(city);
    setIsComponentVisible(false);
  };

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control open-select"
        id="exampleInputEmail1"
        placeholder={placeHolder}
        value={value} // Use selectedCity as the value
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        onChange={handleSearchChange}
      />

      {value === "From" ? (
        <img src="/assets/images/icon/from.png" className="img-fluid" alt="" />
      ) : (
        <img
          src="/assets/images/icon/location.png"
          className="img-fluid"
          alt=""
        />
      )}
      <div
        ref={ref}
        className={`selector-box ${isComponentVisible ? "show" : ""}`}
      >
        <h6 className="title">{PopularCities}</h6>
        <ul>
          {currentCities.map((data: IFlightProps, index) => (
            <li key={index}>
              <a href="#" onClick={() => handleCitySelect(data.VENDOR_CODE)}>
                <h5>{data.COUNTRY_CODE}</h5>
                <h6>{data.POI_NAME}</h6>
                <span>{data.VENDOR_CODE}</span>
              </a>
            </li>
          ))}
          <li ref={lastCityRef}></li>
        </ul>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default SelectCity;
