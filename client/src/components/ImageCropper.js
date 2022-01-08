import React, { Component } from "react";
import "cropperjs/dist/cropper.css";
import "./assets/imagecropper.css";
import Cropper from "cropperjs";
import pfpMask from "./assets/relevant-pfp-mask.png";
import Facebook from "./Facebook";

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

  componentDidMount() {
    const cropper = new Cropper(this.imageElement.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.previewElement.current.firstChild;
        canvas.id = "preview";

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
        zoomable: false,
        scalable: false,
        aspectRatio: 1,
        crop: () => {
          const canvas = this.previewElement.current.firstChild;
          canvas.id = "preview";
          const picture = cropper.getCroppedCanvas();
          const ctx = canvas.getContext("2d");
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
        <div>
          <Facebook onLogin={this.onLogin} />
          <input
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
          <div className="preview-container" ref={this.previewElement}>
            <canvas width={500} height={500}></canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCropper;
