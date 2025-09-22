import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor/ProfileDoctor";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { ALL_CODE_TYPE, languages } from "../../../../utils";
import { toast } from "react-toastify";
import DatePicker from "../../../../components/Input/DatePicker";
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listGender: [],
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      gender: "",
      doctorId: "",
      timeType: "",
      isRemindVerifyMail: true,
    };
  }

  componentDidMount() {
    this.props.getGenders();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.lang !== this.props.lang) {
      this.updateSelectGender();
    }

    if (prevProps.allCodeGender !== this.props.allCodeGender) {
      this.updateSelectGender();
    }

    if (prevProps.actionSuccess !== this.props.actionSuccess) {
      if (this.props.actionSuccess === true) {
        this.clearState();
        this.props.closeModalBooking();

        if (this.state.isRemindVerifyMail === true) {
          toast.success("Check your email to verify booking!");
        }
      }
    }
  }

  updateSelectGender = () => {
    let { allCodeGender } = this.props;
    let dataSelectGender = this.buildDataInputSelect(
      allCodeGender,
      ALL_CODE_TYPE.GENDER
    );

    this.setState({
      gender: "",
      listGender: dataSelectGender,
    });
  };

  clearState = () => {
    let stateCopy = { ...this.state };
    stateCopy["fullName"] = "";
    stateCopy["phoneNumber"] = "";
    stateCopy["email"] = "";
    stateCopy["address"] = "";
    stateCopy["reason"] = "";
    stateCopy["birthday"] = "";
    stateCopy["gender"] = "";
    stateCopy["doctorId"] = "";
    stateCopy["timeType"] = "";
    this.setState({ ...stateCopy });
    this.props.clearBookingInfo(false);
  };

  handleChangeSelected = (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({ ...stateCopy }, () => {});
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        if (type === ALL_CODE_TYPE.GENDER) {
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = this.props.lang === languages.VI ? labelVi : labelEn;
          object.value = item.key;
        }
        result.push(object);
      });
    }
    return result;
  };

  handleOnChangeInputText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  onClickSaveBookingInfo = () => {
    const { fullName, phoneNumber, email, address, reason, birthday, gender } =
      this.state;

    let { doctorId, timeKey, date } = this.props.dataTime;
    let genderKey = gender?.value;

    if (
      !doctorId ||
      !fullName ||
      !phoneNumber ||
      !email ||
      !address ||
      !reason ||
      !birthday ||
      !genderKey ||
      !timeKey ||
      !date
    ) {
      toast.error(<FormattedMessage id="common.invalid-request" />);
      return;
    }

    let formatedBirthday = moment(birthday).format("yyyy-MM-DD");
    const data = {
      doctorId: doctorId,
      email: email,
      fullName: fullName,
      phoneNumber: phoneNumber,
      address: address,
      reason: reason,
      birthday: formatedBirthday,
      timeKey: timeKey,
      gender: genderKey,
      date: date,
      language: this.props.lang,
    };

    this.props.saveBookingInfo(data).then(() => {
      this.setState({ isRemindVerifyMail: true });
    });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({ birthday: date[0] });
  };

  onClickCloseModalBooking = () => {
    this.setState({ isRemindVerifyMail: false });
    this.props.closeModalBooking();
    this.props.clearBookingInfo(true);
  };

  render() {
    let { isOpenModal, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }

    return (
      <>
        <Modal
          isOpen={isOpenModal}
          className="booking-modal-container"
          centered
          size="lg"
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="booking-title title">
                <FormattedMessage id="patient.booking-modal.title" />
              </span>
              <span
                className="booking-close"
                onClick={this.onClickCloseModalBooking}
              >
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescription={false}
                dataTime={dataTime}
              />
              <div className="row">
                <div className="col-6 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.fullname" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.fullName}
                    onChange={(event) =>
                      this.handleOnChangeInputText(event, "fullName")
                    }
                  />
                </div>
                <div className="col-6 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleOnChangeInputText(event, "phoneNumber")
                    }
                  />
                </div>
                <div className="col-6 form-group mt-3">
                  <label>
                    <FormattedMessage
                      id="patient.booking-modal.email"
                      value={this.state.description}
                    />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.description}
                    onChange={(event) =>
                      this.handleOnChangeInputText(event, "email")
                    }
                  />
                </div>
                <div className="col-6 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.address" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnChangeInputText(event, "address")
                    }
                  />
                </div>
                <div className="col-12 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.reason" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.reason}
                    onChange={(event) =>
                      this.handleOnChangeInputText(event, "reason")
                    }
                  />
                </div>
                <div className="col-6 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.birthday" />
                  </label>
                  <DatePicker
                    className="form-control pick-date"
                    value={this.state.birthday}
                    onChange={this.handleOnchangeDatePicker}
                  />
                </div>
                <div className="col-6 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.gender" />
                  </label>
                  <Select
                    value={this.state.gender}
                    onChange={this.handleChangeSelected}
                    options={this.state.listGender}
                    name="gender"
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn-booking-confirm"
                onClick={() => this.onClickSaveBookingInfo()}
              >
                <FormattedMessage id="patient.booking-modal.btnConfirm" />
              </button>
              <button
                className="btn-booking-cancel"
                onClick={this.onClickCloseModalBooking}
              >
                <FormattedMessage id="patient.booking-modal.btnCancel" />
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    allCodeGender: state.admin.allCodeGender,
    actionSuccess: state.admin.actionSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenders()),
    saveBookingInfo: (data) => dispatch(actions.saveBookingInfo(data)),
    clearBookingInfo: (isData) => dispatch(actions.clearBookingInfo(isData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
