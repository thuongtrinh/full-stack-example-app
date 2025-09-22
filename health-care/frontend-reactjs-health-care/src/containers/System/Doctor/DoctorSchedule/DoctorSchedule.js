import React, { Component } from "react";
import { connect } from "react-redux";
import { languages } from "../../../../utils";
import * as actions from "../../../../store/actions";
import moment from "moment";
import localization from "moment/locale/vi";
import "./DoctorSchedule.scss";
import { FormattedMessage } from "react-intl";
import BookingModal from "../../Patient/BookingModal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  componentDidMount() {
    let { lang } = this.props;

    // console.log("moment vi:", moment(new Date()).format("ddd - DD/MM"));
    // console.log("moment en:", moment(new Date()).locale("en").format("ddd - DD/MM"));

    this.setState({
      allDays: this.getArrays(lang),
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrays = (lang) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (lang === languages.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      let formatedDate = moment(new Date()).add(i, "days").format("yyyy-MM-DD");
      // object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();  //->  date format: number
      object.value = formatedDate;
      allDays.push(object);
    }
    return allDays;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.lang !== this.props.lang) {
      let allDays = this.getArrays(this.props.lang);
      this.setState({
        allDays: allDays,
      });
    }

    if (prevProps.scheduleTimeDoctor !== this.props.scheduleTimeDoctor) {
      let data = this.props.scheduleTimeDoctor;
      this.setState({
        allAvailableTime: data && data.length > 0 ? data : [],
      });
    }

    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.state.allDays;
      let doctorId = this.props.doctorIdFromParent;
      let date = allDays[0].value;
      const data = {
        doctorId: doctorId,
        date: date,
      };

      this.props.fetchScheduleTimeByDoctor(data);
    }
  }

  handleChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;

      let formatedDate = moment(date).format("yyyy-MM-DD");
      const data = {
        doctorId: doctorId,
        date: formatedDate,
      };
      this.props.fetchScheduleTimeByDoctor(data);
    }
  };

  handleClickScheduleTime = (time) => {
    console.log("handleClickScheduleTime: ", time);
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };

  closeModalBooking = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    let {
      allDays,
      allAvailableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    let { lang } = this.props;

    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="far fa-calendar-alt">
                <span>
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content-btn">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                allAvailableTime.map((item, index) => {
                  let timeDisplay =
                    lang === languages.VI
                      ? item.allCodeTime?.valueVi
                      : item.allCodeTime?.valueEn;
                  return (
                    <button
                      key={index}
                      className={lang === languages.VI ? "btn-vi" : "btn-en"}
                      onClick={() => this.handleClickScheduleTime(item)}
                    >
                      {timeDisplay}
                    </button>
                  );
                })
              ) : (
                <div className="no-schedule">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>

            <div className="book-free">
              <span>
                <FormattedMessage id="patient.detail-doctor.choose" />
                <i className="far fa-hand-point-up"></i>
                <FormattedMessage id="patient.detail-doctor.book-free" />
              </span>
            </div>
          </div>
        </div>

        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeModalBooking={this.closeModalBooking}
          dataTime={dataScheduleTimeModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    scheduleTimeDoctor: state.admin.scheduleTimeDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScheduleTimeByDoctor: (data) =>
      dispatch(actions.fetchScheduleTimeByDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
