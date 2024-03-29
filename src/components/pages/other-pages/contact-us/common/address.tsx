import { FC } from "react";

const AddressContent: FC<IAddressProps> = ({ colClass }) => {
  return (
    <div className="row">
      <div className={colClass}>
        <div className="contact_wrap">
          <div className="title_bar">
            <i className="fas fa-map-marker-alt"></i>
            <h4>Address</h4>
          </div>
          <div className="contact_content">
            <p>
              Arafat <br />
              Al-Andalus, Jeddah
            </p>
          </div>
        </div>
      </div>
      <div className={colClass}>
        <div className="contact_wrap">
          <div className="title_bar">
            <i className="fas fa-envelope"></i>
            <h4>email address</h4>
          </div>
          <div className="contact_content">
            <ul>
              <li>Support@FlyGo.com</li>
              <li>info@FlyGo.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={colClass}>
        <div className="contact_wrap">
          <div className="title_bar">
            <i className="fas fa-phone-alt"></i>
            <h4>phone</h4>
          </div>
          <div className="contact_content">
            <ul>
              <li>+96 123 - 456 - 7890</li>
              <li>+96 163 - 451 - 7894</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={colClass}>
        <div className="contact_wrap">
          <div className="title_bar">
            <i className="fas fa-fax"></i>
            <h4>fax</h4>
          </div>
          <div className="contact_content">
            <ul>
              <li>+96 212 999 8888</li>
              <li>+96 1-2222 8888</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressContent;
