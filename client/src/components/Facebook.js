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
      { fields: "picture.width(720).height(720),name,first_name" },
      (fbResponse) => {
        axios
          .get(fbResponse.picture.data.url, { responseType: "blob" })
          .then((response) => {
            console.log(response);
            const url = URL.createObjectURL(response.data);
            this.props.onLogin(url, fbResponse.first_name);
          });
      }
    );
  }

  componentDidMount() {
    window.loginDone = () => {
      this.getProfilePic();
    };

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "351105316406816",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
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
          data-width="250px"
          data-size="large"
          data-button-type="login_with"
          data-layout="default"
          data-auto-logout-link="false"
          data-use-continue-as="false"
          data-onlogin="loginDone()"
        ></div>
      </div>
    );
  }
}
