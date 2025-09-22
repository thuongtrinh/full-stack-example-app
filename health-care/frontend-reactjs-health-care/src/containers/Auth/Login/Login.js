import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import { COOKIES, KeyCodeUtils, LanguageUtils, path } from "../../../utils";

import userIcon from "../../../../src/assets/images/user.svg";
import passIcon from "../../../../src/assets/images/pass.svg";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import authService from "../../../services/authService";
import { apiRequestDTO } from "../../../models/apis/apiRequestDTO";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import userService from "../../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
  }

  initialState = {
    username: "",
    password: "",
    loginError: "",
    isShowPassword: false,
  };

  state = {
    ...this.initialState,
  };

  refresh = () => {
    this.setState({
      ...this.initialState,
    });
  };

  onUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  redirectToSystemPage = () => {
    const redirectPath = path.HOME;
    this.props.navigate(`${redirectPath}`);
  };

  handlerKeyDown = (event) => {
    this.setState({ loginError: "" });
    const keyCode = event.which || event.keyCode;
    if (keyCode === KeyCodeUtils.ENTER) {
      event.preventDefault();
      if (!this.btnLogin.current || this.btnLogin.current.disabled) return;
      this.btnLogin.current.click();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handlerKeyDown);
  }

  handShowPassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };

  processLogin = (lang) => {
    const { username, password } = this.state;
    if (username === "" || password === "") {
      this.setState({
        loginError: LanguageUtils.getMessageByKey("login.userpass-wrong", lang),
      });
      return;
    }

    const requestData = apiRequestDTO({
      data: { email: username, password },
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });

    authService
      .signIn(requestData)
      .then((response) => {
        const responseObject = response.data;
        const accessToken = responseObject.data.accessToken;
        this.props.userLoginSuccess(accessToken);
        Cookies.set(COOKIES.TOKEN, accessToken);

        this.getUserInfo().then(() => {
          this.redirectToSystemPage();
        });
      })
      .catch((error) => {
        this.setState({
          loginError: LanguageUtils.getMessageByKey(
            "login.userpass-wrong",
            lang
          ),
        });
        console.log(error);
      });
  };

  async getUserInfo() {
    const requestData = apiRequestDTO({
      data: {},
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });

    await userService
      .getUserInfo(requestData)
      .then((response) => {
        const responseObject = response.data;
        this.props.getUserInfoSuccess(responseObject.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { username, password, loginError } = this.state;
    const { lang } = this.props;

    return (
      <div className="login-wrapper">
        <div className="login-container">
          <div className="form_login">
            <h2 className="title">
              <FormattedMessage id="login.login" />
            </h2>
            <div className="form-group icon-true">
              <img className="icon" src={userIcon} alt="this" />
              <input
                placeholder={LanguageUtils.getMessageByKey(
                  "login.username",
                  lang
                )}
                id="username"
                name="username"
                type="text"
                className="form-control"
                value={username}
                onChange={this.onUsernameChange}
              />
            </div>

            <div id="password-input-container" className="form-group icon-true">
              <img className="icon" src={passIcon} alt="this" />
              <input
                placeholder={LanguageUtils.getMessageByKey(
                  "login.password",
                  lang
                )}
                id="password"
                name="password"
                type={this.state.isShowPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={this.onPasswordChange}
              />
              <span
                onClick={() => {
                  this.handShowPassword();
                }}
              >
                {this.state.isShowPassword ? (
                  <FaEye className="icon-eye" style={{ fontSize: "1.3em" }} />
                ) : (
                  <FaEyeSlash
                    className="icon-eye"
                    style={{ fontSize: "1.3em" }}
                  />
                )}
              </span>
            </div>

            {loginError !== "" && (
              <div className="login-error">
                <span className="login-error-message">{loginError}</span>
              </div>
            )}

            <div className="form-group login">
              <input
                ref={this.btnLogin}
                id="btnLogin"
                type="submit"
                className="btn"
                value={LanguageUtils.getMessageByKey("login.login", lang)}
                onClick={() => this.processLogin(lang)}
              />
            </div>

            <div className="login-options">
              <p>Or Login with:</p>
              <div className="social-buttons">
                <a href={() => false} className="btn google">
                  <i className="fab fa-google-plus-g"></i> Google+
                </a>
                <a href={() => false} className="btn facebook">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (adminInfo) =>
      dispatch(actions.userLoginSuccess(adminInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    getUserInfoSuccess: (userInfo) =>
      dispatch(actions.getUserInfoSuccess(userInfo)),
  };
};

// Functional Component Wrapper
function LoginComponentWrapper(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponentWrapper);
