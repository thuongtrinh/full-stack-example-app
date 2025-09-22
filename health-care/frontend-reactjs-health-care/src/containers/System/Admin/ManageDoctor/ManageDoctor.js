import React, { Component } from "react";
import { connect } from "react-redux";
import MainLayout from "../../../../components/Layout/MainLayout";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import * as actions from "../../../../store/actions";
import { ALL_CODE_TYPE, CODE_COMMON, languages } from "../../../../utils";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save doctor markdown
      selectedDoctor: "",
      description: "",
      contentHtml: "",
      contentMarkdown: "",
      listDoctors: [],
      hasDataOld: false,

      //save doctor-info
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfo();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        if (type === CODE_COMMON.DOCTOR) {
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = this.props.lang === languages.VI ? labelVi : labelEn;
          object.value = item.id;
        } else if (type === ALL_CODE_TYPE.PRICE) {
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = this.props.lang === languages.VI ? labelVi : labelEn;
          object.value = item.key;
        } else {
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataDoctors = this.buildDataInputSelect(
        this.props.allDoctors,
        CODE_COMMON.DOCTOR
      );
      this.setState({
        listDoctors: dataDoctors,
      });
    }

    if (prevProps.lang !== this.props.lang) {
      let dataSelectDoctor = this.buildDataInputSelect(
        this.props.allDoctors,
        CODE_COMMON.DOCTOR
      );

      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfo;

      let dataSelectPrice = this.buildDataInputSelect(
        resPrice,
        ALL_CODE_TYPE.PRICE
      );
      let dataSelectPayment = this.buildDataInputSelect(
        resPayment,
        ALL_CODE_TYPE.PAYMENT
      );
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        ALL_CODE_TYPE.PROVINCE
      );

      this.setState({
        listDoctors: dataSelectDoctor,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }

    if (prevProps.doctorDetail !== this.props.doctorDetail) {
      let doctorDetail = this.props.doctorDetail;
      let description = "",
        contentHtml = "",
        contentMarkdown = "",
        hasDataOld = false,
        selectedPrice = "",
        selectedPayment = "",
        selectedProvince = "",
        nameClinic = "",
        addressClinic = "",
        note = "";

      let { listPrice, listPayment, listProvince } = this.state;

      if (doctorDetail) {
        if (doctorDetail.detail) {
          description = doctorDetail.detail.description;
          contentHtml = doctorDetail.detail.contentHtml;
          contentMarkdown = doctorDetail.detail.contentMarkdown;
          hasDataOld = true;
        }

        if (doctorDetail.doctor) {
          nameClinic = doctorDetail.doctor.nameClinic;
          addressClinic = doctorDetail.doctor.addressClinic;
          note = doctorDetail.doctor.note;
          hasDataOld = true;
          selectedPrice = listPrice.find((item) => {
            return item && item.value === doctorDetail.doctor.priceKey;
          });
          selectedPayment = listPayment.find((item) => {
            return item && item.value === doctorDetail.doctor.paymentKey;
          });
          selectedProvince = listProvince.find((item) => {
            return item && item.value === doctorDetail.doctor.provinceKey;
          });
        }

        this.setState({
          description: description,
          contentHtml: contentHtml,
          contentMarkdown: contentMarkdown,
          hasDataOld: hasDataOld,
          selectedPrice: selectedPrice,
          selectedPayment: selectedPayment,
          selectedProvince: selectedProvince,
          nameClinic: nameClinic,
          addressClinic: addressClinic,
          note: note,
        });
      } else {
        this.setState({
          description: "",
          contentHtml: "",
          contentMarkdown: "",
          hasDataOld: false,
          selectedPrice: "",
          selectedPayment: "",
          selectedProvince: "",
          nameClinic: "",
          addressClinic: "",
          note: "",
        });
      }
    }

    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfo;

      let dataSelectPrice = this.buildDataInputSelect(
        resPrice,
        ALL_CODE_TYPE.PRICE
      );
      let dataSelectPayment = this.buildDataInputSelect(
        resPayment,
        ALL_CODE_TYPE.PAYMENT
      );
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        ALL_CODE_TYPE.PROVINCE
      );

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleChangeSelectedDoctor = (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({ ...stateCopy }, () => {
      if (name.name === "selectedDoctor") {
        let doctorId = this.state.selectedDoctor?.value;
        if (doctorId) {
          this.props.getDoctorInfo(doctorId);
        }
      }
    });
  };

  handleChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  onClickSaveDoctorInfo = () => {
    const {
      contentHtml,
      contentMarkdown,
      description,
      addressClinic,
      nameClinic,
      note,
    } = this.state;

    console.log("onClickSaveDoctorInfo", this.state);
    let doctorId = this.state.selectedDoctor?.value;
    let priceKey = this.state.selectedPrice?.value;
    let paymentKey = this.state.selectedPayment?.value;
    let provinceKey = this.state.selectedProvince?.value;

    if (
      !doctorId ||
      !contentHtml ||
      !contentMarkdown ||
      !description ||
      !priceKey ||
      !paymentKey ||
      !provinceKey
    ) {
      toast.error(<FormattedMessage id="common.invalid-request" />);
      return;
    }

    const data = {
      clinicId: 0,
      specialityId: 0,
      doctorId: doctorId,
      contentMarkdown: contentMarkdown,
      contentHtml: contentHtml,
      description: description,
      priceKey: priceKey,
      paymentKey: paymentKey,
      provinceKey: provinceKey,
      addressClinic: addressClinic,
      nameClinic: nameClinic,
      note: note,
    };

    console.log("onClickSaveDoctorInfo:", data);
    this.props.saveDoctorInfo(data);
  };

  handleOnChangeInputText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    const handleMdEditorChange = (value) => {
      this.setState({
        contentHtml: value.html,
        contentMarkdown: value.text,
      });
    };

    return (
      <MainLayout>
        <div className="manage-doctor-container">
          <h2 className="text-center title">
            <FormattedMessage id="admin.manage-doctor.title" />
          </h2>
          <div className="more-infor">
            <div className="content-left form-group">
              <label>
                <FormattedMessage id="system.doctor-manage.select-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelectedDoctor}
                options={this.state.listDoctors}
                name="selectedDoctor"
              />
            </div>
            <div className="content-right">
              <label>
                <FormattedMessage id="system.doctor-manage.doctor-desc" />
              </label>
              <textarea
                className="form-control"
                rows={4}
                onChange={(event) => this.handleChangeDesc(event)}
                value={this.state.description}
              >
                desc test
              </textarea>
            </div>
          </div>

          <div className="more-doctor-info row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.price" />
              </label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handleChangeSelectedDoctor}
                options={this.state.listPrice}
                name="selectedPrice"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.payment" />
              </label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleChangeSelectedDoctor}
                options={this.state.listPayment}
                name="selectedPayment"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.provice" />
              </label>
              <Select
                value={this.state.selectedProvince}
                onChange={this.handleChangeSelectedDoctor}
                options={this.state.listProvince}
                name="selectedProvince"
              />
            </div>

            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.name-clinic" />
              </label>
              <input
                className="form-control"
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInputText(event, "nameClinic")
                }
                value={this.state.nameClinic}
              />
            </div>

            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.address-clinic" />
              </label>
              <input
                className="form-control"
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInputText(event, "addressClinic")
                }
                value={this.state.addressClinic}
              />
            </div>

            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <input
                className="form-control"
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInputText(event, "note")
                }
                value={this.state.note}
              />
            </div>
          </div>

          <div className="md-manage-doctor">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleMdEditorChange}
              value={this.state.contentMarkdown}
            />

            <button
              type="button"
              className={
                this.state.hasDataOld === true
                  ? "btn btn-warning btn-md-save custom-base"
                  : "btn btn-primary btn-md-save custom-base"
              }
              onClick={() => this.onClickSaveDoctorInfo()}
            >
              {this.state.hasDataOld === true ? "Update" : "Save"}
            </button>
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
    // doctorMarkdown: state.admin.doctorMarkdown,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    doctorDetail: state.admin.doctorDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchTopDoctors()),
    saveDoctorInfo: (data) => dispatch(actions.saveDoctorInfoAction(data)),
    getDoctorInfo: (doctorId) => dispatch(actions.detailDoctorAction(doctorId)),
    getAllRequiredDoctorInfo: () =>
      dispatch(actions.getAllRequiredDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
