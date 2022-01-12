import React, { useRef, useEffect } from "react";
import styles from "./assets/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

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
      <div className={styles.navContainer}>
        <a className={styles.mainNavLink} href="#parent">
          <div className={styles.title}>rel·e·vant</div>
          <div className={styles.subtitle}>
            facebook profile picture converter
          </div>
        </a>
        <a href="#" className={styles.toggleButton} ref={toggleButton}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
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
                href="https://github.com/evan-loe/relevant-pfp"
              >
                github
                <FontAwesomeIcon className={styles.icon} icon={faGithub} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
