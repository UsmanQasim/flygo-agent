"use client";
import { useTranslation } from "@/app/i18n/client";
import { setLanguage } from "@/redux-toolkit/reducers/language";
import { RootState } from "@/redux-toolkit/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Language: React.FC<ILanguageProps> = ({ value }) => {
  const { i18LangStatus } = useSelector((state: RootState) => state.language);
  const { i18n } = useTranslation(i18LangStatus);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const changeLng = (lng: string) => {
    dispatch(setLanguage(lng));
    const languageCodeRegex = /^\/[a-z]{2}(\/|$)/;
    const updatedPath = pathname.replace(languageCodeRegex, `/${lng}$1`);
    router.push(updatedPath);
  };

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      const language = pathSegments[0];
      if (language !== i18LangStatus) {
        dispatch(setLanguage(language));
      }
    }
  }, []);

  return (
    <div
      className="front-setting rounded"
      style={{
        width: "80px",
        cursor: "pointer",
        position: "relative",
        marginLeft: "10px",
        minWidth: "80px",
      }}
    >
      <input
        type="text"
        readOnly
        className="form-control dropdown-toggle "
        value={i18LangStatus}
        style={{
          position: "relative",
          cursor: "pointer",
          border: "1px solid #3FA34B",
          backgroundColor: "#3FA34B",
          color: "white",
          textTransform: "uppercase",
        }}
        name="language"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      />
      <div
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
          width: "80px",
          minWidth: "80px !important",
        }}
      >
        {value?.option?.map((elem, index) => (
          <li
            key={index}
            onClick={() => {
              changeLng(elem.lang);
              i18n.changeLanguage(elem.lang);
            }}
            value={elem.lang}
            className="dropdown-item"
            style={{ marginLeft: "0px" }}
          >
            {elem.language}
          </li>
        ))}
      </ul>
    </div>
    // <li
    //   className="front-setting rounded"
    //   style={{ border: "1px solid #3FA34B", backgroundColor: "#3FA34B" }}
    // >
    //   <select
    //     value={i18LangStatus}
    //     style={{ color: "white" }}
    //     onChange={(e) => {
    //       changeLng(e.target.value);
    //       i18n.changeLanguage(e.target.value);
    //     }}
    //   >
    //     {value?.option?.map((elem, index) => {
    //       return (
    //         <option key={index} value={elem.lang}>
    //           {elem.language}
    //         </option>
    //       );
    //     })}
    //   </select>
    // </li>
  );
};

export default Language;
