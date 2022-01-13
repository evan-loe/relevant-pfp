import React, { Component } from "react";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import pfpMask from "./assets/relevant-pfp-mask.png";
import pfpMaskq from "./assets/relevant-pfp-mask-q.png";
import Facebook from "./Facebook";
import { saveAs } from "file-saver";
import { Fade } from "react-reveal";

import styles from "./assets/imagecropper.module.css";

import { faArrowCircleDown, faFolder } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ImageCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: "",
      fileURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-girl-cat-names-1606245046.jpg?crop=0.668xw:1.00xh;0.126xw,0&resize=640:*",
      cropper: null,
      pfpMask: null,
      pfpMaskq: null,
      fbProfile: null,
      name: "",
      isDefaultMask: true,
    };
    this.imageElement = React.createRef();
    this.previewElement = React.createRef();
    this.mask = React.createRef();
    this.maskq = React.createRef();
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.saveImage = this.saveImage.bind(this);
    this.saveOrigImage = this.saveOrigImage.bind(this);
    this.handleSelectMask = this.handleSelectMask.bind(this);
  }

  crop(cropper, imageMask) {
    const canvas = this.previewElement.current.querySelector("#preview");
    canvas.width =
      window.innerWidth <= 810
        ? window.innerWidth * 0.6 + 30
        : window.innerWidth * 0.2 + 30;
    canvas.height =
      window.innerWidth <= 810
        ? window.innerWidth * 0.6 + 30
        : window.innerWidth * 0.2 + 30;

    const picture = cropper.getCroppedCanvas();

    const ctx = canvas.getContext("2d");
    ctx.font = "bold 48px Montreal-Bold";
    ctx.fillStyle = "#00a79d";

    const img =
      imageMask ?? this.state.isDefaultMask
        ? this.state.pfpMask
        : this.state.pfpMaskq;

    ctx.drawImage(
      picture,
      0,
      0,
      picture.width,
      picture.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  handleSelectMask(event) {
    if (event.type === "click") {
      event.target.id === "relevantMask"
        ? this.maskq.current.classList.remove(styles.active)
        : this.mask.current.classList.remove(styles.active);
      event.target.classList.add(styles.active);
      this.setState({
        isDefaultMask: event.target.id === "relevantMask",
      });
    } else if (event.type === "mouseover") {
      event.target.classList.add(styles.active);
    } else if (event.type === "mouseout") {
      if (event.target.id === "relevantMask" && !this.state.isDefaultMask) {
        event.target.classList.remove(styles.active);
      } else if (
        event.target.id === "relevantMaskQ" &&
        this.state.isDefaultMask
      ) {
        event.target.classList.remove(styles.active);
      }
    }
  }

  componentDidMount() {
    this.mask.current.addEventListener("mouseover", this.handleSelectMask);
    this.mask.current.addEventListener("mouseout", this.handleSelectMask);
    this.mask.current.addEventListener("click", this.handleSelectMask);
    this.maskq.current.addEventListener("mouseover", this.handleSelectMask);
    this.maskq.current.addEventListener("mouseout", this.handleSelectMask);
    this.maskq.current.addEventListener("click", this.handleSelectMask);

    window.addEventListener("resize", () => {
      this.state.cropper.zoom(-0.2);
    });

    const cropper = new Cropper(
      this.imageElement.current.querySelector("#image"),
      {
        zoomable: true,
        scalable: false,
        aspectRatio: 1,
        autoCropArea: 1,
        viewMode: 1,
        crop: () => {
          this.crop(cropper);
        },
      }
    );
    // load image
    let pfpImage = new Image();
    pfpImage.src = pfpMask; // set default to pfpMask
    let pfpImageq = new Image();
    pfpImageq.src = pfpMaskq;
    pfpImage.onload = () => {
      this.previewElement.current
        .querySelector("#preview")
        .getContext("2d")
        .drawImage(pfpImage, 0, 0);
    };
    this.setState({ pfpMask: pfpImage });
    this.setState({ pfpMaskq: pfpImageq });
    this.setState({ cropper: cropper });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isDefaultMask !== this.state.isDefaultMask) {
      this.crop(this.state.cropper);
    }
  }

  componentWillUnmount() {
    this.mask.current.removeEventListener("mouseover", this.handleSelectMask);
    this.mask.current.removeEventListener("mouseout", this.handleSelectMask);
    this.mask.current.removeEventListener("click", this.handleSelectMask);
    this.maskq.current.removeEventListener("mouseover", this.handleSelectMask);
    this.maskq.current.removeEventListener("mouseout", this.handleSelectMask);
    this.maskq.current.removeEventListener("click", this.handleSelectMask);
  }

  onFileChange = (event) => {
    const fileURL = URL.createObjectURL(event.target.files[0]);
    this.setState({
      fileURL: fileURL,
      selectedFile: event.target.files[0],
    });
    this.state.cropper.replace(fileURL);
  };

  onLogin(picture, name) {
    this.setState({ fileURL: picture, name: name, fbProfile: picture });
    this.state.cropper.replace(picture);
  }

  onLogout() {
    this.setState({
      fileURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-girl-cat-names-1606245046.jpg?crop=0.668xw:1.00xh;0.126xw,0&resize=640:*",
      name: "",
    });
    this.state.cropper.replace(
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-girl-cat-names-1606245046.jpg?crop=0.668xw:1.00xh;0.126xw,0&resize=640:*"
    );
  }

  saveImage() {
    this.previewElement.current.querySelector("#preview").toBlob((blob) => {
      saveAs(blob, `${this.state.name}relevant2022pfp.png`);
    }, "image/png");
  }

  saveOrigImage() {
    saveAs(
      this.imageElement.current.querySelector("#image").src,
      `${this.state.name}original-profile-picture`
    );
  }

  render() {
    return (
      <div id="parent" className={styles.parentContainer}>
        <div className={styles.imagesContainer}>
          <Fade>
            <div className={styles.sectionTitleContainer}>
              <div>
                {this.state.name === ""
                  ? "Step 1: Choose your profile picture from your device or Facebook!"
                  : `Hi ${this.state.name}! Thanks for signing in`}
              </div>
              <div className={styles.buttonContainer}>
                <Facebook onLogin={this.onLogin} onLogout={this.onLogout} />
                <label htmlFor="fileUpload" className={styles.customFileUpload}>
                  <FontAwesomeIcon
                    icon={faFolder}
                    className={styles.folderIcon}
                  />
                  Upload From Device
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  onChange={this.onFileChange}
                  accept=".jpg, .jpeg, .png"
                  className={styles.uploadButton}
                />
              </div>
            </div>
          </Fade>
          {/* <div className={styles.arrow}>
            <a href="#croppingSection">
              <Fade>
                <FontAwesomeIcon icon={faAngleDoubleDown} size="6x" />
              </Fade>
            </a>
          </div> */}
          <Fade>
            <div
              id="croppingSection"
              className={`${styles.sectionTitleContainer} ${styles.colSectionContainer}`}
            >
              <div>Step 2: Crop your profile picture and select a filter!</div>
              <ul>
                <li>Scoll to zoom in</li>
                <li>Drag picture to move around</li>
                <li>
                  If you want better control you can grab the corners and resize
                  them
                </li>
              </ul>
            </div>
          </Fade>
          <div className={styles.imageCropContainer}>
            <div ref={this.imageElement}>
              <Fade>
                <div className={styles.imgContainer}>
                  <img id="image" src={this.state.fileURL} alt="Source" />
                </div>
              </Fade>
            </div>
            <div className={styles.maskContainer}>
              {/* <div className={styles.titleBox}>Select A Filter</div> */}
              <Fade>
                <div className={styles.selectMask}>
                  <img
                    ref={this.mask}
                    id="relevantMask"
                    className={`${styles.mask} ${styles.active}`}
                    alt="relevant mask without question mark"
                    src={require("./assets/relevant-pfp-mask.png")}
                  ></img>
                  <img
                    ref={this.maskq}
                    id="relevantMaskQ"
                    className={styles.mask}
                    alt="relevant mask without question mark"
                    src={require("./assets/relevant-pfp-mask-q.png")}
                  ></img>
                </div>
              </Fade>
            </div>
            <div ref={this.previewElement} className={styles.previewContainer}>
              <Fade>
                <canvas id="preview"></canvas>
              </Fade>
            </div>
          </div>
          {/* <div className={styles.arrow}>
            <a href="#downloadSection">
              <Fade>
                <FontAwesomeIcon icon={faAngleDoubleDown} size="6x" />
              </Fade>
            </a>
          </div> */}
          <Fade>
            <div id="downloadSection" className={styles.sectionTitleContainer}>
              <div>
                Step 4: Download your new relevant 2022 profile picture!
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.genericButton}
                  onClick={this.saveImage}
                >
                  <FontAwesomeIcon
                    icon={faArrowCircleDown}
                    className={styles.downloadIcon}
                  />
                  Download Image
                </button>
                <button
                  className={styles.genericButton}
                  onClick={this.saveOrigImage}
                >
                  <FontAwesomeIcon
                    icon={faArrowCircleDown}
                    className={styles.downloadIcon}
                  />
                  Download my original (unedited) profile picture!
                </button>
              </div>
            </div>
          </Fade>
          <Fade>
            <div
              id="facebookLinkSection"
              className={styles.sectionTitleContainer}
            >
              <div>
                Step 5: Change your profile picture on Facebook and other social
                media!
              </div>
              <div className={styles.buttonContainer}>
                <a className={styles.genericButton} href="https://facebook.com">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className={styles.facebookIcon}
                  />
                  Take me to Facebook
                </a>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    );
  }
}

export default ImageCropper;
