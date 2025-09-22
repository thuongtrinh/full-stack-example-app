import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import { path, USER_ROLE } from "../../utils";

class Home extends Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    if (isLoggedIn) {
      let userInfo = this.props.userInfo;

      console.log("userInfo exist:", userInfo);
      let linkToRedirect = path.HOME_PAGE;
      if (userInfo) {
        let role = userInfo.roleKey;
        if (role === USER_ROLE.ADMIN) {
          linkToRedirect = path.SYSTEM_USER_REDUX;
        } else if (role === USER_ROLE.DOCTOR) {
          linkToRedirect = path.DOCTOR_MANAGE_SCHEDULE;
        }
      }
      return <Navigate to={linkToRedirect} replace />;
    } else {
      return <Navigate to={path.HOME_PAGE} />;
    }
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
