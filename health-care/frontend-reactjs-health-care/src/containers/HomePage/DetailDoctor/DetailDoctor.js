import React, { Component } from "react";
import { connect } from "react-redux";
import MainLayout from "../../../components/Layout/MainLayout";
import * as actions from "../../../store/actions";
import { useParams } from "react-router-dom";
import "./DetailDoctor.scss";
import { languages } from "../../../utils";
import HomeHeader from "../HomeHeader/HomeHeader";
import DoctorSchedule from "../../System/Doctor/DoctorSchedule/DoctorSchedule";
import DoctorExtraInfo from "../../System/Doctor/DoctorExtraInfo/DoctorExtraInfo";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorInfo: {},
    };
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.props.getDoctorInfo(id);
      if (this.props.doctorDetail) {
        this.setState({
          doctorInfo: this.props.doctorDetail,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorDetail !== this.props.doctorDetail) {
      this.setState({
        doctorInfo: this.props.doctorDetail,
      });
    }
  }

  render() {
    let { lang } = this.props;
    let { doctorInfo } = this.state;
    let nameVi = "";
    let nameEn = "";

    let description = "";
    let introDoctor;
    if (doctorInfo && doctorInfo.intro) {
      let intro = doctorInfo.intro;
      nameVi = `${intro.role.valueVi}, ${intro.lastName} ${intro.firstName}`;
      nameEn = `${intro.role.valueEn}, ${intro.firstName} ${intro.lastName}`;
      introDoctor = intro;
    }

    if (doctorInfo && doctorInfo.detail) {
      description = doctorInfo.detail.description;
    }

    return (
      <MainLayout>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container custom-base">
          <div className="intro-doctor">
            <div className="content-left">
              <div className="bg-doctor-detail section-doctor-detail"></div>
            </div>
            <div className="content-right">
              <div className="up">
                {lang === languages.VI ? nameVi : nameEn}
              </div>
              <div className="down">{description}</div>
            </div>
          </div>

          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule
                doctorIdFromParent={
                  introDoctor && introDoctor.id ? introDoctor.id : -1
                }
              />
            </div>
            <div className="content-right">
              <DoctorExtraInfo
                doctorIdFromParent={
                  introDoctor && introDoctor.id ? introDoctor.id : -1
                }
              />
            </div>
          </div>

          <div className="detail-infor-doctor">
            {doctorInfo &&
              doctorInfo.detail &&
              doctorInfo.detail.contentHtml && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: doctorInfo.detail.contentHtml,
                  }}
                />
              )}
          </div>
          <div className="comment-doctor"></div>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state, dispatch) => {
  return {
    lang: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    doctorDetail: state.admin.doctorDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorInfo: (id) => dispatch(actions.detailDoctorAction(id)),
  };
};

function DetailDoctorWrapper(props) {
  const { id } = useParams();
  return <DetailDoctor id={id} {...props} />;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailDoctorWrapper);
