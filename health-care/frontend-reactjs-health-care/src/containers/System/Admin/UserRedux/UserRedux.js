import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import MainLayout from "../../../../components/Layout/MainLayout";
import { apiRequestDTO } from "../../../../models/apis/apiRequestDTO";
import { ALL_CODE_TYPE, CRUD_ACTIONS, languages } from "../../../../utils";
import _ from "lodash";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import * as actions from "../../../../store/actions";
import TableUserManage from "./TableUserManage";
import healthCareService from "../../../../services/healthCareService";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      arrGender: [],
      arrPosition: [],
      arrRole: [],
      previewImageURL: "",
      isOpenPreviewImage: false,
      action: CRUD_ACTIONS.CREATE,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      userIdEdit: "",
    };
  }

  componentDidMount() {
    this.getAllCode();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        position: "",
        role: "",
        avatar: "",
        userIdEdit: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  getAllCode() {
    const requestData = apiRequestDTO({
      data: {
        types: [
          ALL_CODE_TYPE.POSITION,
          ALL_CODE_TYPE.GENDER,
          ALL_CODE_TYPE.ROLE,
        ],
      },
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });

    healthCareService
      .getAllcodeByList(requestData)
      .then((response) => {
        const responseObject = response.data;

        const genders = responseObject.data.filter(
          (dto) => dto.type === ALL_CODE_TYPE.GENDER
        );
        const positions = responseObject.data.filter(
          (dto) => dto.type === ALL_CODE_TYPE.POSITION
        );
        const roles = responseObject.data.filter(
          (dto) => dto.type === ALL_CODE_TYPE.ROLE
        );

        this.setState({
          arrGender: genders,
          arrPosition: positions,
          arrRole: roles,
        });
      })
      .catch((error) => {
        // this.setState({ error, loading: false });
        console.log(error);
      });
  }

  handleOnchangeImage = (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImageURL: objectUrl,
        avatar: file,
      });
    }
  };

  openPreviewImage = () => {
    if (_.isEmpty(this.state.previewImageURL)) return;
    this.setState({
      isOpenPreviewImage: true,
    });
  };

  checkValidateInput = (action) => {
    let isValid = true;
    let arrCheck;
    if (CRUD_ACTIONS.CREATE === this.state.action) {
      arrCheck = [
        "email",
        "password",
        "firstName",
        "lastName",
        "phoneNumber",
        "address",
        "gender",
        "position",
        "role",
      ];
    } else if (CRUD_ACTIONS.UPDATE === this.state.action) {
      arrCheck = [
        "firstName",
        "lastName",
        "phoneNumber",
        "address",
        "gender",
        "position",
        "role",
        "userIdEdit",
      ];
    }

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Missing input: " + arrCheck[i]);
        break;
      }
    }

    return isValid;
  };

  onClickSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (!isValid) return;
    const action = this.state.action;

    if (CRUD_ACTIONS.CREATE === action) {
      const {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        address,
        gender,
        position,
        role,
      } = this.state;

      const data = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: address,
        gender: gender,
        position: position,
        role: role,
        // avatar: this.state.avatar,
      };
      this.props.createNewUser(data);
    } else if (CRUD_ACTIONS.UPDATE === action) {
      const {
        firstName,
        lastName,
        phoneNumber,
        address,
        gender,
        position,
        role,
        userIdEdit,
      } = this.state;

      const data = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: address,
        gender: gender,
        position: position,
        role: role,
        id: userIdEdit,
      };
      this.props.adminUpdateUser(data);
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleUpdateUserFromParent = (user) => {
    this.setState({
      email: user.email,
      password: "",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber === null ? "" : user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionKey,
      role: user.roleKey,
      // avatar: user.avatar,
      userIdEdit: user.id,
      action: CRUD_ACTIONS.UPDATE,
    });
  };

  onClickResetUser = () => {
    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      userIdEdit: "",
      action: CRUD_ACTIONS.CREATE,
    });
  };

  render() {
    const { lang } = this.props;
    const {
      arrGender,
      arrPosition,
      arrRole,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
    } = this.state;

    return (
      <div>
        <MainLayout>
          <div className="user-redux-container">
            <h2>MANAGE USERS REDUX</h2>

            <form>
              <div className="row">
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="system.user-manage.email" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(event) => this.onChangeInput(event, "email")}
                    disabled={
                      this.state.action === CRUD_ACTIONS.UPDATE ? true : false
                    }
                  />
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="system.user-manage.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) => this.onChangeInput(event, "password")}
                    disabled={
                      this.state.action === CRUD_ACTIONS.UPDATE ? true : false
                    }
                  />
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="system.user-manage.firstname" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(event) => this.onChangeInput(event, "firstName")}
                  />
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="system.user-manage.lastname" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(event) => this.onChangeInput(event, "lastName")}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="system.user-manage.phone" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(event) =>
                      this.onChangeInput(event, "phoneNumber")
                    }
                  />
                </div>
                <div className="form-group col-9">
                  <label>
                    <FormattedMessage id="system.user-manage.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(event) => this.onChangeInput(event, "address")}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="system.user-manage.gender" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) => this.onChangeInput(event, "gender")}
                    value={gender}
                  >
                    <option value="">---</option>
                    {arrGender.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {lang === languages.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="system.user-manage.position" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) => this.onChangeInput(event, "position")}
                    value={position}
                  >
                    <option value="">---</option>
                    {arrPosition.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {lang === languages.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="system.user-manage.role" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) => this.onChangeInput(event, "role")}
                    value={role}
                  >
                    <option value="">---</option>
                    {arrRole.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {lang === languages.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="system.user-manage.image" />
                  </label>

                  <div className="preview-img-container">
                    <input
                      id="previewImg"
                      onChange={(event) => this.handleOnchangeImage(event)}
                      type="file"
                      hidden
                      className="form-control"
                    />
                    <label className="label-upload " htmlFor="previewImg">
                      Tải ảnh <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewImageURL})`,
                      }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
                </div>

                <div className="form-group col-3">
                  <button
                    type="button"
                    className={
                      this.state.action === CRUD_ACTIONS.CREATE
                        ? "btn btn-primary custom-base btn-save"
                        : "btn btn-warning custom-base btn-save"
                    }
                    onClick={() => this.onClickSaveUser()}
                  >
                    {this.state.action === CRUD_ACTIONS.CREATE ? (
                      <FormattedMessage id="common.save" />
                    ) : (
                      <FormattedMessage id="common.edit" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary custom-base btn-reset"
                    onClick={() => this.onClickResetUser()}
                  >
                    <FormattedMessage id="common.reset" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </MainLayout>

        {this.state.isOpenPreviewImage === true && (
          <Lightbox
            mainSrc={this.state.previewImageURL}
            onCloseRequest={() => this.setState({ isOpenPreviewImage: false })}
          />
        )}

        <TableUserManage
          handleUpdateUserFromParent={this.handleUpdateUserFromParent}
        />
        <div style={{ marginBottom: "200px" }}></div>
      </div>
    );
  }
}

const mapStateToProps = (state, dispatch) => {
  return {
    lang: state.app.language,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewUser: (data) => dispatch(actions.adminCreateNewUser(data)),
    adminUpdateUser: (data) => dispatch(actions.adminUpdateUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
