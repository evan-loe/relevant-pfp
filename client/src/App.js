import axios from "axios";
import React, { Component } from "react";
import "./App.css";

const apiEndpoint = "api/uploadFile";

class App extends Component {
  state = {
    selectedFile: null,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    console.log(event.target.files[0]);
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(this.state.selectedFile);

    axios.post(apiEndpoint, formData);
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
      </div>
    );
  }
}

export default App;
