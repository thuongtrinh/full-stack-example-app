import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { languages } from "../../../../utils";
import healthCareService from "../../../../services/healthCareService";
import { NumericFormat } from "react-number-format";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import moment from "moment";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getDataDoctorProfile(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getDataDoctorProfile = async (doctorId) => {
    let result = {};
    if (doctorId) {
      await healthCareService
        .getDoctorProfile(this.props.doctorId)
        .then((res) => {
          if (res && res.data) {
            result = res.data.data;
          }
        });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  renderTimeBooking = (dataTime) => {
    let { lang } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        lang === languages.VI
          ? dataTime.allCodeTime.valueVi
          : dataTime.allCodeTime.valueEn;

      //moment.unix(+dataTime.date/1000).format("dddd - DD/MM/YYYY")
      let date =
        lang === languages.VI
          ? moment(dataTime.date).format("dddd - DD/MM/YYYY")
          : moment(dataTime.date).locale("en").format("ddd - DD/MM/YYYY");

      return (
        <>
          <div className="down">
            {time} - {date}
          </div>
          <div>Miễn phí đặt lịch</div>
        </>
      );
    }
  };

  render() {
    let { lang, isShowDescription, dataTime } = this.props;
    let { dataProfile } = this.state;

    let nameEn = "",
      nameVi = "";
    if (dataProfile) {
      nameVi = `${dataProfile.role?.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.role?.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div className="content-left">
            <div className="bg-doctor-detail section-doctor-detail"></div>
          </div>
          <div className="content-right">
            <div className="up">{lang === languages.VI ? nameVi : nameEn}</div>
            {isShowDescription === true ? (
              <div className="down">{dataProfile?.description}</div>
            ) : (
              this.renderTimeBooking(dataTime)
            )}
          </div>
        </div>
        <div className="price">
          <FormattedMessage id="patient.extra-doctor-info.price" />{" "}
          {dataProfile && dataProfile.price && lang === languages.VI && (
            <NumericFormat
              className="currency"
              value={dataProfile.price.valueVi}
              thousandSeparator=","
              displayType={"text"}
              suffix=" VND"
            />
          )}
          {dataProfile && dataProfile.price && lang === languages.EN && (
            <NumericFormat
              className="currency"
              value={dataProfile.price.valueEn}
              displayType={"text"}
              thousandSeparator={true}
              suffix=" USD"
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
