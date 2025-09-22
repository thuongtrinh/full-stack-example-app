import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../HomePage.scss";

class HomeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="section-share home-footer">
        <p>
          &copy; Author: txt &nbsp;More information, please visit&nbsp;
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            my channel
          </a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state, dispatch) => {
  return {
    lang: state.app.language,
    // contentOfConfirmModal: state.app.contentOfConfirmModal,
    // isLoggedIn: state.user.isLoggedIn,
    // isShowModal: state.modal.isShowModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
    // modalActionCreators: bindActionCreators(actions, dispatch),
    // setContentOfConfirmModal: (contentOfConfirmModal) =>
    //   dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
