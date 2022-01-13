import React from "react";

import { Link } from "react-router-dom";

import styles from "./assets/footer.module.css";

import {
  faFacebookF,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.connect}>
          <h2>Connect With Us!</h2>
          <p>Follow us on Facebook and Instagram to stay updated!</p>
          <p>
            If you have any questions, please send us an email at
            <a href="mailto:relevant2021@gmail.com"> relevant2021@gmail.com</a>
          </p>
        </div>
        <div className={styles.socialContainer}>
          <FontAwesomeIcon
            icon={faFacebookF}
            size="4x"
            className={styles.logo}
          />
          <div className={styles.socialHandle}>@RelevantSeriesUofT</div>
          <a href="https://www.facebook.com/RelevantSeriesUofT">Follow Us</a>
        </div>
        <div className={styles.socialContainer}>
          <FontAwesomeIcon
            icon={faInstagram}
            size="4x"
            className={styles.logo}
          />
          <div className={styles.socialHandle}>@RelevantUofT</div>
          <a href="https://www.instagram.com/relevantuoft/">Follow Us</a>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div>
          <FontAwesomeIcon icon={faGithub} className={styles.githubLinkIcon} />
          <a href="https://github.com/evan-loe/relevant-pfp">
            Github for this page!
          </a>
        </div>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <div>Copyright 2022</div>
      </div>
    </div>
  );
}

export default Footer;
