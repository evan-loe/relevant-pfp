import React, { Component } from "react";
import "cropperjs/dist/cropper.css";
import "./assets/imagecropper.css";
import Cropper from "cropperjs";
import pfpMask from "./assets/relevant-pfp-mask.png";
import Facebook from "./Facebook";

import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ImageCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: "",
      fileURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-girl-cat-names-1606245046.jpg?crop=0.668xw:1.00xh;0.126xw,0&resize=640:*",
      cropper: null,
      pfpImage: null,
      fbProfile: null,
    };
    this.imageElement = React.createRef();
    this.previewElement = React.createRef();
    this.pfpMask = React.createRef();
    this.onLogin = this.onLogin.bind(this);
  }

  crop(cropper) {
    const canvas = this.previewElement.current.firstChild;
    console.log(window.innerHeight);
    console.log(window.innerWidth);
    canvas.width = window.innerHeight * 0.5 + 21;
    canvas.height = window.innerHeight * 0.5 + 21;

    const picture = cropper.getCroppedCanvas();

    const ctx = canvas.getContext("2d");
    ctx.font = "bold 48px Montreal-Bold";
    ctx.fillStyle = "#00a79d";

    const img = this.state.pfpImage;

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

  componentDidMount() {
    const cropper = new Cropper(this.imageElement.current, {
      zoomable: true,
      scalable: false,
      aspectRatio: 1,
      viewMode: 1,
      crop: () => {
        this.crop(cropper);
      },
    });
    // load image
    let pfpImage = new Image();
    pfpImage.src = pfpMask;
    pfpImage.onload = () => {
      this.previewElement.current.firstChild
        .getContext("2d")
        .drawImage(pfpImage, 0, 0);
    };
    this.setState({ pfpImage: pfpImage });
    this.setState({ cropper: cropper });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("updateeee");
    if (prevState.fileURL !== this.state.fileURL) {
      console.log("updating pictureeeee");
      this.state.cropper.destroy();
      console.log(this.imageElement.current);
      const cropper = new Cropper(this.imageElement.current, {
        zoomable: true,
        scalable: false,
        aspectRatio: 1,
        crop: () => {
          this.crop(cropper);
        },
      });
      this.setState({ cropper: cropper });
    }
  }

  onFileChange = (event) => {
    this.setState({
      fileURL: URL.createObjectURL(event.target.files[0]),
      selectedFile: event.target.files[0],
    });
  };

  onLogin(picture, name) {
    this.setState({ fileURL: picture, name: name, fbProfile: picture });
    console.log(picture, name);
  }

  render() {
    return (
      <div>
        <div className="imageSelect">
          <div className="uploadText">
            Upload your profile picture or login with Facebook!
          </div>
          <Facebook onLogin={this.onLogin} className="facebookLogin" />
          <label for="file-upload" class="custom-file-upload">
            <FontAwesomeIcon icon={faFolder} className="folder" />
            Upload from device
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={this.onFileChange}
            accept=".jpg, .jpeg, .png"
            className="uploadButton"
          />
        </div>
        <div className="images-container">
          <div className="img-container">
            <img
              ref={this.imageElement}
              src={this.state.fileURL}
              alt="Source"
            />
          </div>
          <img id="arrow" alt="arrow" src={require("./assets/arrow.png")}></img>
          <div className="preview-container" ref={this.previewElement}>
            <canvas></canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCropper;
