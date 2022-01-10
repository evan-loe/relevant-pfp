import React, { Component } from "react";
import "cropperjs/dist/cropper.css";
import "./assets/imagecropper.css";
import Cropper from "cropperjs";
import pfpMask from "./assets/relevant-pfp-mask.png";
import pfpMaskq from "./assets/relevant-pfp-mask-q.png";
import Facebook from "./Facebook";
import { saveAs } from "file-saver";

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
    this.handleSelectMask = this.handleSelectMask.bind(this);
  }

  crop(cropper, imageMask) {
    const canvas = this.previewElement.current.querySelector("#preview");
    console.log(window.innerHeight);
    console.log(window.innerWidth);
    canvas.width = 450;
    canvas.height = 450;

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
      event.target.id === "relevant-mask"
        ? this.maskq.current.classList.remove("active")
        : this.mask.current.classList.remove("active");
      event.target.classList.add("active");
      this.setState({
        isDefaultMask: event.target.id === "relevant-mask",
      });
    } else if (event.type === "mouseover") {
      event.target.classList.add("active");
    } else if (event.type === "mouseout") {
      if (event.target.id === "relevant-mask" && !this.state.isDefaultMask) {
        event.target.classList.remove("active");
      } else if (
        event.target.id === "relevant-mask-q" &&
        this.state.isDefaultMask
      ) {
        event.target.classList.remove("active");
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

    const cropper = new Cropper(this.imageElement.current, {
      zoomable: true,
      scalable: false,
      aspectRatio: 1,
      autoCropArea: 1,
      crop: () => {
        this.crop(cropper);
      },
    });
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
    console.log("Removing event listeners");
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
    console.log(picture, name);
    this.state.cropper.replace(picture);
  }

  onLogout() {
    console.log("Logout!");
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

  render() {
    return (
      <div id="parent" className="parent-container">
        <div className="images-container">
          <div className="uploadImage-container">
            <div className="title-box">Input</div>
            <div className="img-container">
              <img
                ref={this.imageElement}
                src={this.state.fileURL}
                alt="Source"
              />
            </div>
            <div className="button-container">
              <div>
                {this.state.name === ""
                  ? "Choose your profile picture from your device or Facebook!"
                  : `Hi ${this.state.name}!`}
              </div>
              <Facebook onLogin={this.onLogin} onLogout={this.onLogout} />
              <label htmlFor="file-upload" className="custom-file-upload">
                <FontAwesomeIcon icon={faFolder} id="folderIcon" />
                Upload From Device
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={this.onFileChange}
                accept=".jpg, .jpeg, .png"
                className="uploadButton"
              />
            </div>
          </div>
          <div className="mask-container">
            <div className="title-box">Select A Filter</div>
            <div className="selectMask">
              <img
                ref={this.mask}
                id="relevant-mask"
                className="mask active"
                alt="relevant mask without question mark"
                src={require("./assets/relevant-pfp-mask.png")}
              ></img>
              <img
                ref={this.maskq}
                id="relevant-mask-q"
                className="mask"
                alt="relevant mask without question mark"
                src={require("./assets/relevant-pfp-mask-q.png")}
              ></img>
            </div>
          </div>
          <div className="preview-container" ref={this.previewElement}>
            <div className="title-box">Preview</div>
            <canvas id="preview"></canvas>
            <div className="button-container">
              <div>
                Don't forget to download and change your profile picture!
              </div>
              <a className="generic-button" href="https://facebook.com">
                <FontAwesomeIcon icon={faFacebook} id="facebookIcon" />
                Go To Facebook.com
              </a>
              <button className="generic-button" onClick={this.saveImage}>
                <FontAwesomeIcon icon={faArrowCircleDown} id="downloadIcon" />
                Download Image
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCropper;
