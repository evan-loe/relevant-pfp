import React, { useRef, useEffect } from "react";
import styles from "./assets/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCalendar,
  faQuestion,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const toggleButton = useRef(null);
  const navBarLinks = useRef(null);

  useEffect(() => {
    toggleButton.current.addEventListener("click", () => {
      navBarLinks.current.classList.toggle(styles.active);
    });
  }, []);

  return (
    <nav>
<<<<<<< HEAD
      <div className={styles.navContainer}>
        <Link to="/">
          <div className={styles.mainNavLink} href="#parent">
            <div className={styles.title}>rel·e·vant</div>
            <div className={styles.subtitle}>
              facebook profile picture converter
            </div>
          </div>
        </Link>

        <a href="#" className={styles.toggleButton} ref={toggleButton}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
=======
      <div className="navContainer">
        <a className="mainNavLink" href="/html/">
          <div className="title">rel·e·vant</div>
          <div className="subtitle">facebook profile picture converter</div>
        </a>
        <a className="secondaryNavLink" href="https://relevantseries.com/">
          relevant 2022 website
          <FontAwesomeIcon className="icon" icon={faQuestion} />
        </a>
        <a
          className="secondaryNavLink"
          href="https://github.com/evan-loe/relevant-pfp"
        >
          github
          <FontAwesomeIcon className="icon" icon={faGithub} />
>>>>>>> parent of 53474a6 (added privacy policy page)
        </a>
        <div className={styles.navBarLinks} ref={navBarLinks}>
          <ul>
            <li>
              <a
                className={styles.secondaryNavLink}
                href="https://relevantseries.com/"
              >
                relevant 2022 website
                <FontAwesomeIcon className={styles.icon} icon={faQuestion} />
              </a>
            </li>
            <li>
              <a
                className={styles.secondaryNavLink}
                href="https://relevantseries.com#speakers"
              >
                speaker bios
                <FontAwesomeIcon className={styles.icon} icon={faUserAlt} />
              </a>
            </li>
            <li>
              <a
                className={styles.secondaryNavLink}
                href="https://www.facebook.com/RelevantSeriesUofT/events"
              >
                facebook event page
                <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
