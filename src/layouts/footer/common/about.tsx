import { About } from "@/constant/constant";
import Link from "next/link";

const AboutComponent: React.FC = () => {
  return (
    <div className="col-xl-2 col-md-6">
      <div className="footer-space">
        <div className="footer-title">
          <h5>{About}</h5>
        </div>
        <div className="footer-content">
          <div className="footer-links">
            <ul>
              <li className="text-white">
                <Link
                  className="text-white"
                  href="/pages/other-pages/about-us-2"
                >
                  about us
                </Link>
              </li>
              <li className="text-white">
                <Link className="text-white" href="/pages/other-pages/faq">
                  FAQ
                </Link>
              </li>
              <li className="text-white">
                <Link className="text-white" href="/pages/other-pages/login">
                  login
                </Link>
              </li>
              <li className="text-white">
                <Link className="text-white" href="/pages/other-pages/register">
                  register
                </Link>
              </li>
              <li className="text-white">
                <Link
                  className="text-white"
                  href="/pages/other-pages/coming-soon-1"
                >
                  terms & co.
                </Link>
              </li>
              <li className="text-white">
                <Link
                  className="text-white"
                  href="/pages/other-pages/user-dashboard"
                >
                  privacy
                </Link>
              </li>
              <li className="text-white">
                <Link
                  className="text-white"
                  href="https://support.pixelstrap.com/"
                >
                  support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
