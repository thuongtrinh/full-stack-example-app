import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { languages, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  componentDidMount() {
    this.buildMenuFromUserInfo();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userInfo !== this.props.userInfo) {
      this.buildMenuFromUserInfo();
    }
  }

  buildMenuFromUserInfo = () => {
    const { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleKey;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }

      this.setState({
        menuApp: menu,
      });
    }
  };

  changeLanguage = (language) => {
    this.props.changeLanguageRedux(language);
  };

  render() {
    const { processLogout, lang, userInfo } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (userInfo) {
      nameVi = `${userInfo.firstName} ${userInfo.lastName}`;
      nameEn = `${userInfo.lastName} ${userInfo.firstName}`;
    }

    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="header-right">
          <span className="welcome">
            <FormattedMessage id={"homeheader.welcome"} />,{" "}
            {lang === languages.VI ? nameVi : nameEn} !
          </span>
          <div className="content-lang">
            <div
              className={
                lang === languages.VI ? "lang-vi active-vi" : "lang-vi"
              }
              onClick={() => this.changeLanguage(languages.VI)}
            >
              VI
            </div>
            <div
              className={
                lang === languages.EN ? "lang-en active-en" : "lang-en"
              }
              onClick={() => this.changeLanguage(languages.EN)}
            >
              EN
            </div>
          </div>

          <div className="header-logout">
            <div className="btn btn-logout" onClick={processLogout}>
              <i className="fas fa-sign-out-alt"></i>
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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
