import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import "./ModalUser.scss";
import { emitter } from "../../../utils/emitter";
import { bindActionCreators } from "redux";
import * as modalActions from "./../../../store/actions/modalActions";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }

  componentDidMount() {
    const { dataEditing } = this.props;
    if (dataEditing && dataEditing.id) {
      this.setState({
        id: dataEditing.id,
        email: dataEditing.email,
        firstName: dataEditing.firstName,
        lastName: dataEditing.lastName,
        address: dataEditing.address,
      });
    }
  }

  toggle = () => {
    const { modalActionCreators } = this.props;
    const { hideModal } = modalActionCreators;
    // this.props.toggleModalUser();
    hideModal();
  };

  handleOnChangeInput = (event, field) => {
    let copyState = { ...this.state };
    copyState[field] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = (isEdit) => {
    let isValid = true;
    let arrInput = ["email", "firstName", "lastName", "address", "password"];
    if (isEdit) {
      arrInput = ["id", "firstName", "lastName", "address"];
    }
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput(false);
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };

  onClickUpdateUser = () => {
    let isValid = this.checkValidateInput(true);
    if (isValid) {
      this.props.updateUser(this.state);
    }
  };

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_USER", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  };

  render() {
    const { title, isShowModal, dataEditing } = this.props;
    let isEditing = false;
    if (dataEditing && dataEditing.id) {
      isEditing = true;
    }

    return (
      <Modal
        // isOpen={this.props.isOpen}
        isOpen={isShowModal}
        toggle={() => this.toggle()}
        className="user-modal custom-base"
      >
        <ModalHeader toggle={() => this.toggle()}>{title}</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label className="col-form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email-name"
              disabled={isEditing}
              onChange={(event) => this.handleOnChangeInput(event, "email")}
              value={this.state.email}
            />
          </div>
          <>
            {isEditing ? (
              ""
            ) : (
              <div className="form-group">
                <label className="col-form-label">Password:</label>
                <input
                  type="text"
                  className="form-control"
                  id="password-name"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                  value={this.state.password}
                />
              </div>
            )}
          </>
          <div className="form-group">
            <label className="col-form-label">First name:</label>
            <input
              type="text"
              className="form-control"
              id="first-name"
              onChange={(event) => this.handleOnChangeInput(event, "firstName")}
              value={this.state.firstName}
            />
          </div>
          <div className="form-group">
            <label className="col-form-label">Last name:</label>
            <input
              type="text"
              className="form-control"
              id="last-name"
              onChange={(event) => this.handleOnChangeInput(event, "lastName")}
              value={this.state.lastName}
            />
          </div>
          <div className="form-group">
            <label className="col-form-label">Address:</label>
            <input
              type="text"
              className="form-control"
              id="address-name"
              onChange={(event) => this.handleOnChangeInput(event, "address")}
              value={this.state.address}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              isEditing ? this.onClickUpdateUser() : this.handleAddNewUser();
            }}
            className="btn-modal"
          >
            {isEditing ? (
              <FormattedMessage id={"common.edit"} />
            ) : (
              <FormattedMessage id={"common.add"} />
            )}
          </Button>
          <Button
            color="secondary"
            onClick={() => this.toggle()}
            className="btn-modal"
          >
            <FormattedMessage id={"common.close"} />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    title: state.modal.title,
    isShowModal: state.modal.isShowModal,
    dataEditing: state.modal.dataEditing,
    // contentOfConfirmModal: state.app.contentOfConfirmModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setContentOfConfirmModal: (contentOfConfirmModal) =>
    //   dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal)),
    modalActionCreators: bindActionCreators(modalActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
