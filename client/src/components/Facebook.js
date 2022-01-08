import React, { Component } from "react";
import axios from "axios";

export default class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userID: "",
    };
  }

  getProfilePic() {
    window.FB.api(
      `/me`,
      { fields: "picture.width(720).height(720),name" },
      (response) => {
        console.log(`Good to see you ${response.name}`);
        console.log(response);
        axios
          .get(response.picture.data.url, { responseType: "blob" })
          .then((response) => {
            console.log(response);
            const url = URL.createObjectURL(response.data);
            this.props.onLogin(url, response.name);
          });
      }
    );
  }

  componentDidMount() {
    console.log("mounted!");
    window.loginDone = () => {
      console.log("cheese");
      console.log(this);
      this.getProfilePic();
    };

    window.fbAsyncInit = async function () {
      await window.FB.init({
        appId: "351105316406816",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
      console.log("loaded fb sdk");
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  render() {
    return (
      <div>
        <div
          className="fb-login-button"
          data-width=""
          data-size="large"
          data-button-type="continue_with"
          data-layout="default"
          data-auto-logout-link="true"
          data-use-continue-as="false"
          data-onlogin="loginDone()"
        ></div>
      </div>
    );
  }
}
