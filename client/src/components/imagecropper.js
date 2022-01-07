import React, { Component } from "react";
import "cropperjs/dist/cropper.css";
import "./imagecropper.css";
import Cropper from "cropperjs";
import axios from "axios";

const apiEndpoint = "api/fileupload";

class ImageCropper extends Component {
  constructor() {
    super();
    this.state = {
      imageDestination: "",
      selectedFile: "",
      fileURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-girl-cat-names-1606245046.jpg?crop=0.668xw:1.00xh;0.126xw,0&resize=640:*",
      cropper: null,
    };
    this.imageElement = React.createRef();
  }

  componentDidMount() {
    const cropper = new Cropper(this.imageElement.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = cropper.getCroppedCanvas();
        this.setState({ imageDestination: canvas.toDataURL("image/png") });
      },
    });
    this.setState({ cropper: cropper });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.fileURL !== this.state.fileURL) {
      this.state.cropper.destroy();
      const cropper = new Cropper(this.imageElement.current, {
        zoomable: false,
        scalable: false,
        aspectRatio: 1,
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

  onFileUpload = () => {
    const canvas = this.state.cropper.getCroppedCanvas();
    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append("profileImage", blob, "cropped.png");
      axios.post(apiEndpoint, formData);
    });
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {new Date(this.state.selectedFile.lastModified).toString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose a file before pressing the upload button!</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>Relevant Image Converter</h1>
        <h3>
          Upload your profile picture and we'll convert it to have relevant
          details on it!
        </h3>
        <div>
          <input
            type="file"
            onChange={this.onFileChange}
            accept=".jpg, .jpeg, .png"
          />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
        <div className="img-container">
          <img ref={this.imageElement} src={this.state.fileURL} alt="Source" />
        </div>
      </div>
    );
  }
}

export default ImageCropper;
