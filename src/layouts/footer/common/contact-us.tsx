import { ContactUs } from "@/constant/constant";
import Image from "next/image";
import Link from "next/link";

const ContactUsComponent: React.FC = () => {
  return (
    <div className="col-xl-3 col-md-6 order-cls">
      <div className="footer-title mobile-title">
        <h5>{ContactUs}</h5>
      </div>
      <div className="footer-content">
        <div className="contact-detail">
          <div
            className="footer-logo"
            style={{
              // background: "rgba(255, 255, 255, 0.2)",
              background: "white",
              borderRadius: 5,
              border: "1px solid white",
              width: "50%",
            }}
          >
            <Link href="/">
              <Image
                src={"/assets/images/logo.png"}
                alt="logo"
                className="img-fluid"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <p className="text-white">
            Where Comfort Meets Adventure: Your Journey, Our Promise Previous
          </p>
          <ul className="contact-list text-white">
            <li className="text-white">
              <i className="fas fa-map-marker-alt"></i> Arafat, Al-Andalus,
              Jeddah
            </li>
            <li className="text-white">
              <i className="fas fa-phone-alt"></i>{" "}
              <a
                href="tel:+96 123 123 123"
                style={{ textDecoration: "none", color: "#ffff" }}
              >
                +96 123 123 123
              </a>
            </li>
            <li className="text-white">
              <i className="fas fa-envelope"></i>{" "}
              <a
                href="mailto:support@flygo.com"
                style={{ textDecoration: "none", color: "#ffff" }}
              >
                Support@flygo.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUsComponent;
