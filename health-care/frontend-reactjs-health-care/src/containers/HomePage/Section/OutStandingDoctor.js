import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import MainLayout from "../../../components/Layout/MainLayout";
import "../HomePage.scss";
import Slider from "react-slick";
import * as actions from "./../../../store/actions";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    const redirectPath = `/health-care/detail-doctor/${doctor.id}`;
    this.props.navigate(`${redirectPath}`);
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    const { settings, lang } = this.props;

    return (
      <MainLayout>
        <div className="section-share section-outstanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="specialty-title">
                <FormattedMessage id="homepage.outstanding-doctor" />
              </span>
              <button className="btn-show-more">
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    let nameVi = `${item.position?.valueVi}, ${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.position?.valueEn}, ${item.lastName} ${item.firstName}`;
                    return (
                      <div
                        className="specialty-content"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <div className="out-bg">
                          <div className="bg-image-doctor section-outstanding-doctor"></div>
                        </div>
                        <div className="position">
                          <div>{lang === languages.VI ? nameVi : nameEn}</div>
                          <div className="position-detail">Cơ xương khớp</div>
                        </div>
                      </div>
                    );
                  })}
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
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
  };
};

function OutStandingDoctorComponentWrapper(props) {
  const navigate = useNavigate();
  return <OutStandingDoctor {...props} navigate={navigate} />;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutStandingDoctorComponentWrapper);
