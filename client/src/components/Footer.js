import React from "react";
import "./assets/footer.css";

import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="connect">
          <h2>Connect With Us!</h2>
          <p>Follow us on Facebook and Instagram to stay updated!</p>
          <p>
            If you have any questions, please send us an email:{" "}
            <a href="mailto:relevant2021@gmail.com"> relevant2021@gmail.com</a>
          </p>
        </div>
        <div className="socialContainer">
          <FontAwesomeIcon icon={faFacebookF} size="4x" className="logo" />
          <div className="socialHandle">@RelevantSeriesUofT</div>
          <a href="https://facebook.com">Follow Us</a>
        </div>
        <div className="socialContainer">
          <FontAwesomeIcon icon={faInstagram} size="4x" className="logo" />
          <div className="socialHandle">@RelevantUofT</div>
          <a href="https://instagram.com">Follow Us</a>
        </div>
      </div>
      <div className="bottomFooter"></div>
    </div>
  );
}

export default Footer;
