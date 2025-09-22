import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomePage.scss";
import HomeHeader from "./HomeHeader/HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalSpecialty from "./Section/MedicalSpecialty";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import Handbook from "./Section/Handbook";
import About from "./Section/About";
import HomeFooter from "./Section/HomeFooter";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    return (
      <>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <MedicalSpecialty settings={settings} />
        <OutStandingDoctor settings={settings} />
        <Handbook settings={settings} />
        <About />
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state, dispatch) => {
  return {
    // lang: state.app.language,
    // contentOfConfirmModal: state.app.contentOfConfirmModal,
    // isLoggedIn: state.user.isLoggedIn,
    // isShowModal: state.modal.isShowModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // modalActionCreators: bindActionCreators(actions, dispatch),
    // setContentOfConfirmModal: (contentOfConfirmModal) =>
    //   dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal)),
  };
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray", right: 0 }}
      onClick={onClick}
    >
      Next
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        left: 0,
        zIndex: 1000,
      }}
      onClick={onClick}
    >
      Prev
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
