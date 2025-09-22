import React, { Component } from "react";
import { connect } from "react-redux";
import MainLayout from "../../../../components/Layout/MainLayout";
import * as actions from "../../../../store/actions";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import Select from "react-select";
import { languages } from "../../../../utils";
import DatePicker from "../../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import moment from "moment";
import _ from "lodash";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
      minDate: moment().subtract(1, "days"),
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllCodeTime();
  }

  buildDoctorInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = this.props.lang === languages.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  buildRangeTimeSelect = (scheduleTime) => {
    let { rangeTime } = this.state;
    if (scheduleTime && scheduleTime.length > 0) {
      const timeKeys = scheduleTime.map((schedule) => schedule.timeKey);
      rangeTime = rangeTime.map((item) => {
        if (timeKeys.includes(item.key)) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
        return item;
      });
      this.setState({ rangeTime: rangeTime });
    } else {
      rangeTime = rangeTime.map((item) => {
        item.isSelected = false;
        return item;
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.lang !== this.props.lang) {
      let dataSelect = this.buildDoctorInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDoctorInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allCodeTime !== this.props.allCodeTime) {
      let data = this.props.allCodeTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }

    if (prevProps.scheduleTimeDoctor !== this.props.scheduleTimeDoctor) {
      let data = this.props.scheduleTimeDoctor;
      this.buildRangeTimeSelect(data);
    }
  }

  updateScheduleTime = () => {
    console.log("updateScheduleTime", this.state);

    let { selectedDoctor, currentDate, rangeTime } = this.state;
    if (
      selectedDoctor === undefined ||
      selectedDoctor.value === "" ||
      selectedDoctor.value === null ||
      currentDate === "" ||
      currentDate === null
    ) {
      if (rangeTime && rangeTime.length > 0) {
        rangeTime = rangeTime.map((item) => {
          item.isSelected = false;
          return item;
        });
        this.setState({ rangeTime: rangeTime });
      }
      return;
    }

    let formatedDate = moment(currentDate).format("yyyy-MM-DD");
    let doctorId = selectedDoctor.value;
    const data = {
      doctorId: doctorId,
      date: formatedDate,
    };
    this.props.clearScheduleRangeTime();
    this.props.fetchScheduleTimeByDoctor(data);
  };

  handleChangeSelectedDoctor = async (selectedOption) => {
    // this.setState({ selectedDoctor: selectedOption });
    this.setState({ selectedDoctor: selectedOption }, () => {
      this.updateScheduleTime();
    });
  };

  handleOnchangeDatePicker = (date) => {
    // this.setState({ currentDate: date[0] });
    this.setState({ currentDate: date[0] }, () => {
      this.updateScheduleTime();
    });
  };

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    // console.log(time);
    // console.log(rangeTime);

    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.key === time.key) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({ rangeTime: rangeTime });
    }
  };

  handleSaveSchedule = () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];

    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected doctor!");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }

    let formatedDate = moment(currentDate).format("yyyy-MM-DD");
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length === 0) {
        toast.error("Invalid selected time!");
        return;
      }

      selectedTime.map((schedule, index) => {
        // let object = {};
        // object.doctorId = selectedDoctor.value;
        // object.date = formatedDate;
        // object.timeKey = schedule.key;
        result.push(schedule.key);
      });
    }

    let doctorId = selectedDoctor.value;
    const data = {
      doctorId: doctorId,
      date: formatedDate,
      timeKeys: result,
    };

    this.props.saveScheduleDoctor(data);
  };

  render() {
    let { rangeTime } = this.state;
    let { lang } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <MainLayout>
        <div className="manage-schedule-container">
          <div className="manage-schedule-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label className="col-form-label label-schedule">
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  defaultValue=""
                  value={this.state.selectedDoctor}
                  onChange={this.handleChangeSelectedDoctor}
                  options={this.state.listDoctors}
                />
              </div>
              <div className="col-6 form-group">
                <label className="col-form-label label-schedule">
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  className="form-control pick-date"
                  value={this.state.currentDate}
                  onChange={this.handleOnchangeDatePicker}
                  minDate={yesterday}
                />
              </div>
              <div className="col-12 form-group pick-hour">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        className={
                          item.isSelected === true
                            ? "btn btn-schedule active"
                            : "btn btn-schedule"
                        }
                        key={index}
                        onClick={() => this.handleClickBtnTime(item)}
                      >
                        {lang === languages.VI ? item.valueVi : item.valueEn}
                      </button>
                    );
                  })}
              </div>
              <div className="col-12">
                <button
                  className="btn btn-primary btn-save-schedule"
                  onClick={() => this.handleSaveSchedule()}
                >
                  <FormattedMessage id="manage-schedule.save-schedule" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    allDoctors: state.admin.topDoctors,
    allCodeTime: state.admin.allCodeTime,
    scheduleTimeDoctor: state.admin.scheduleTimeDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchTopDoctors()),
    fetchAllCodeTime: () => dispatch(actions.fetchAllCodeTime()),
    saveScheduleDoctor: (data) => dispatch(actions.saveScheduleAction(data)),
    fetchScheduleTimeByDoctor: (data) =>
      dispatch(actions.fetchScheduleTimeByDoctor(data)),
    clearScheduleRangeTime: () => dispatch(actions.clearScheduleRangeTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
