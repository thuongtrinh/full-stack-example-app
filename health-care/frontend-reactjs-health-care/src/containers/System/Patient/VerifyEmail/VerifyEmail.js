import React, { Component } from "react";
import { connect } from "react-redux";
import "./VerifyEmail.scss";
import healthCareService from "../../../../services/healthCareService";
import RequestUtils from "../../../../utils/RequestUtils";
import MainLayout from "../../../../components/Layout/MainLayout";
import HomeHeader from "../../../HomePage/HomeHeader/HomeHeader";
import { FormattedMessage } from "react-intl";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { statusVerify: false, isConfirmed: false };
  }

  async componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    const patientId = queryParams.get("patientId");
    const doctorId = queryParams.get("doctorId");
    const token = queryParams.get("token");

    if (patientId && doctorId && token) {
      let data = {
        patientId,
        doctorId,
        token,
      };
      this.callApiConfirmToken(data);
    }
  }

  callApiConfirmToken = async (data) => {
    try {
      const requestData = RequestUtils.setBodyConfirmTokenBooking(data);
      let res = await healthCareService.confirmTokenBooking(requestData);
      if (res && res.data && res.data.data === true) {
        this.setState({
          statusVerify: true,
          isConfirmed: true,
        });
      } else {
        this.setState({
          statusVerify: true,
        });
      }
    } catch (e) {
      this.setState({
        statusVerify: true,
      });
      console.log("callApiConfirmToken:", e);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { lang } = this.props;
    let { statusVerify, isConfirmed } = this.state;

    return (
      <MainLayout>
        <HomeHeader isShowBanner={false} />
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>Loading data...</div>
          ) : (
            <div>
              {isConfirmed && isConfirmed === true ? (
                <div className="info-booking">
                  <FormattedMessage id="patient.verify-mail.booking-success" />
                </div>
              ) : (
                <div className="info-booking">
                  <FormattedMessage id="patient.verify-mail.booking-failed" />
                </div>
              )}
            </div>
          )}
        </div>
      </MainLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
