import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import healthCareService from "../../../../services/healthCareService";
import { languages } from "../../../../utils";
import { NumericFormat } from "react-number-format";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraDoctor: {},
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      healthCareService
        .getDoctorExtra(this.props.doctorIdFromParent)
        .then((res) => {
          if (res && res.data) {
            console.log("getDoctorExtra:", res);
            this.setState({
              extraDoctor: res.data.data,
            });
          }
        });
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({ isShowDetailInfor: status });
  };

  render() {
    let { isShowDetailInfor, extraDoctor } = this.state;
    let { lang } = this.props;
    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-doctor-info.text-address" />
          </div>
          <div className="name-clinic">
            {extraDoctor && extraDoctor.nameClinic
              ? extraDoctor.nameClinic
              : ""}
          </div>
          <div className="detail-clinic">
            {extraDoctor && extraDoctor.addressClinic
              ? extraDoctor.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short-info">
              <FormattedMessage id="patient.extra-doctor-info.price" />
              {extraDoctor && extraDoctor.price && lang === languages.VI && (
                <NumericFormat
                  className="currency"
                  value={extraDoctor.price.valueVi}
                  thousandSeparator=","
                  displayType={"text"}
                  suffix=" VND"
                />
              )}
              {extraDoctor && extraDoctor.price && lang === languages.EN && (
                <NumericFormat
                  className="currency"
                  value={extraDoctor.price.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix=" USD"
                />
              )}
              <span
                onClick={() => this.showHideDetailInfor(true)}
                className="detail"
              >
                <FormattedMessage id="patient.extra-doctor-info.detail" />
              </span>
            </div>
          )}

          {isShowDetailInfor === true && (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.extra-doctor-info.price" />
              </div>
              <div className="detail-info">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="patient.extra-doctor-info.price" />
                  </span>
                  <span className="right">
                    {extraDoctor &&
                      extraDoctor.price &&
                      lang === languages.VI && (
                        <NumericFormat
                          className="currency"
                          value={extraDoctor.price.valueVi}
                          thousandSeparator=","
                          displayType={"text"}
                          suffix=" VND"
                        />
                      )}
                    {extraDoctor &&
                      extraDoctor.price &&
                      lang === languages.EN && (
                        <NumericFormat
                          className="currency"
                          value={extraDoctor.price.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix=" USD"
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  {extraDoctor && extraDoctor.note ? extraDoctor.note : ""}
                </div>
              </div>
              <div className="payment">
                <FormattedMessage id="patient.extra-doctor-info.payment" />
                <i>
                  {" "}
                  {extraDoctor && extraDoctor.payment && lang === languages.VI
                    ? extraDoctor.payment.valueVi
                    : ""}
                  {extraDoctor && extraDoctor.payment && lang === languages.EN
                    ? extraDoctor.payment.valueEn
                    : ""}
                </i>
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  <FormattedMessage id="patient.extra-doctor-info.hide-price" />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, dispatch) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
