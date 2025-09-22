import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import MainLayout from "../../../components/Layout/MainLayout";
import "../HomePage.scss";
import Slider from "react-slick";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const settings = this.props.settings;

    return (
      <MainLayout>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="specialty-title">Chuyên khoa phổ biến</span>
              <button className="btn-show-more">XEM THÊM</button>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                <div className="specialty-content">
                  <div className="img-specialty section-specialty"></div>
                  <div className="specialty-name">Chuyên khoa 1</div>
                </div>
                <div className="specialty-content">
                  <div className="img-specialty section-specialty"></div>
                  <div className="specialty-name">Chuyên khoa 2</div>
                </div>
                <div className="specialty-content">
                  <div className="img-specialty section-specialty"></div>
                  <div className="specialty-name">Chuyên khoa 3</div>
                </div>
                <div className="specialty-content">
                  <div className="img-specialty section-specialty"></div>
                  <div className="specialty-name">Chuyên khoa 4</div>
                </div>
                <div className="specialty-content">
                  <div className="img-specialty section-specialty"></div>
                  <div className="specialty-name">Chuyên khoa 5</div>
                </div>
                <div className="specialty-content">
                  <div className="img-specialty section-specialty"></div>
                  <div className="specialty-name">Chuyên khoa 6</div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </MainLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
