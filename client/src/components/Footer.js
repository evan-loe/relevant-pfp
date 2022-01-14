import React from "react";
import "./assets/footer.css";

import { Link } from "react-router-dom";

import {
  faFacebookF,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
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
      <div className="bottomFooter">
        <div>
          <a href="https://github.com/evan-loe/relevant-pfp">
            <FontAwesomeIcon icon={faGithub} id="githubLinkIcon" />
            Check out my Gitub!
          </a>
        </div>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <a href="https://relevant-pfp.herokuapp.com/privacyPolicy.html">
          Privacy Policy
        </a>
        <div>Copyright 2022</div>
      </div>
    </div>
  );
}

export default Footer;
