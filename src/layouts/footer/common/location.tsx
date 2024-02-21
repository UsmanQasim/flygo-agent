import { OurLocation } from "@/constant/constant";

const Location: React.FC = () => {
  return (
    <div className="col-xl-3 col-md-6">
      <div className="footer-title">
        <h5>{OurLocation}</h5>
      </div>
      <div className="footer-content">
        <div className="footer-map">
          <iframe src="https://maps.google.com/maps?width=100%25&amp;height=800&amp;hl=en&amp;q=Jeddah+(Flygo)&amp;t=k&amp;z=10&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
            allowFullScreen
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default Location;
