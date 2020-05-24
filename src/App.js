import React, { Component } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./github.css";

import Github from "./components/Github";
import Header from "./components/Header";
import Auth0Lock from "auth0-lock";
import config from "./auth_config.json";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idToken: "",
      profile: {},
    };
  }

  static defaultProps = {
    clientID: config.clientID,
    domain: config.domain,
  };

  componentWillMount() {
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain);

    this.lock.on("authenticated", (authResult) => {
      console.log(authResult);

      this.lock.getProfile(authResult.accessToken, (error, profile) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(profile);

        this.setProfile(authResult.accessToken, profile);
      });
    });
    this.getProfile();
  }

  setProfile(idToken, profile) {
    localStorage.setItem("id_Token", idToken);
    localStorage.setItem("profile", JSON.stringify(profile));

    this.setState({
      idToken: localStorage.getItem("id_Token"),
      profile: JSON.parse(localStorage.getItem("profile")),
    });
  }

  getProfile() {
    if (localStorage.getItem("id_Token") != null) {
      this.setState(
        {
          idToken: localStorage.getItem("id_Token"),
          profile: JSON.parse(localStorage.getItem("profile")),
        },
        () => {
          console.log(this.state);
        }
      );
    }
  }

  showLock() {
    this.lock.show();
  }

  logout() {
    this.setState(
      {
        idToken: "",
        profile: "",
      },
      () => {
        localStorage.removeItem("id_Token");
        localStorage.removeItem("profile");
      }
    );
  }

  render() {
    let logStatus;

    if (this.state.idToken) {
      logStatus = <Github />;
    } else {
      logStatus = "Click on Login to view Github Viewer";
    }

    return (
      <div className="App">
        <Header
          lock={this.lock}
          idToken={this.state.idToken}
          onLogout={this.logout.bind(this)}
          onLogin={this.showLock.bind(this)}
        />
        {logStatus}
      </div>
    );
  }
}

export default App;
