import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import MainLayout from "../../../components/Layout/MainLayout";
import "./HomeHeader.scss";
import {
  FaBars,
  FaHospital,
  FaHospitalUser,
  FaMicroscope,
  FaMobile,
  FaQuestionCircle,
  FaSearch,
  FaTooth,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { languages, LanguageUtils, path } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { useNavigate } from "react-router-dom";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  changeLanguage = (language) => {
    this.props.changeLanguageRedux(language);
  };

  handleClickLogo = () => {
    const redirectPath = path.HOME_PAGE;
    this.props.navigate(`${redirectPath}`);
  };

  render() {
    const { lang } = this.props;

    return (
      <MainLayout>
        <div className="home-header-container">
          <div className="left-content" onClick={() => this.handleClickLogo()}>
            <FaBars size={30} className="menu-icon" />
            <div className="header-logo"></div>
          </div>
          <div className="center-content">
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id={"homeheader.speciality"} />
                </b>
              </div>
              <div className="sub-title">
                <FormattedMessage id={"homeheader.searchdoctor"} />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id={"homeheader.health-facility"} />
                </b>
              </div>
              <div className="sub-title">
                <FormattedMessage id={"homeheader.select-room"} />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id={"homeheader.doctor"} />
                </b>
              </div>
              <div className="sub-title">
                <FormattedMessage id={"homeheader.select-doctor"} />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id={"homeheader.fee"} />
                </b>
              </div>
              <div className="sub-title">
                <FormattedMessage id={"homeheader.check-health"} />
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="content-support">
              <FaQuestionCircle size={30} />
              <span>
                <FormattedMessage id={"homeheader.support"} />
              </span>
            </div>
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
          </div>
        </div>

        {this.props.isShowBanner && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id={"banner.title1"} />
              </div>
              <div className="title2">
                <FormattedMessage id={"banner.title2"} />
              </div>
              <div className="search">
                <FaSearch size={20} className="search-icon" color="gray" />
                <input
                  type="text"
                  className="search-input"
                  placeholder={LanguageUtils.getMessageByKey(
                    "homeheader.searchdoctor",
                    lang
                  )}
                />
              </div>
            </div>
            <div className="content-down">
              <div className="app_store">
                <div
                  className="google"
                  onClick={() =>
                    window.open("https://play.google.com/store/apps", "_blank")
                  }
                ></div>
                <div
                  className="apple"
                  onClick={() =>
                    window.open("https://www.apple.com/vn/app-store", "_blank")
                  }
                ></div>
              </div>

              <div className="options">
                <div className="child-option">
                  <div className="icon-child">
                    <FaHospital size={30} color="#07eaf1ff" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id={"banner.child1"} />
                  </div>
                </div>
                <div className="child-option">
                  <div className="icon-child">
                    <FaMobile size={30} color="#07eaf1ff" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id={"banner.child2"} />
                  </div>
                </div>
                <div className="child-option">
                  <div className="icon-child">
                    <FaHospitalUser size={30} color="#07eaf1ff" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id={"banner.child3"} />
                  </div>
                </div>
                <div className="child-option">
                  <div className="icon-child">
                    <FaMicroscope size={30} color="#07eaf1ff" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id={"banner.child4"} />
                  </div>
                </div>
                <div className="child-option">
                  <div className="icon-child">
                    <FaUserDoctor size={30} color="#07eaf1ff" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id={"banner.child5"} />
                  </div>
                </div>
                <div className="child-option">
                  <div className="icon-child">
                    <FaTooth size={30} color="#07eaf1ff" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id={"banner.child6"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    );
  }
}

const mapStateToProps = (state, dispatch) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

function HomeHeaderWrapper(props) {
  const navigate = useNavigate();
  return <HomeHeader {...props} navigate={navigate} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeaderWrapper);
