import React from "react";
import "./assets/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <nav>
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
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
