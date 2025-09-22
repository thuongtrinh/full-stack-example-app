import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import MainLayout from "../../../../components/Layout/MainLayout";
import userService from "../../../../services/userService";
import { pagingRequestDTO } from "../../../../models/apis/pagingRequestDTO";
import { FaPlus } from "react-icons/fa";
import ModalUser from "../../../../components/Modals/ModalUser/ModalUser";
import authService from "../../../../services/authService";
import { emitter } from "../../../../utils/emitter";
import { bindActionCreators } from "redux";
import * as actions from "../../../../store/actions";
import ConfirmModal from "../../../../components/Modals/ModalConfirm/ConfirmModal";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isOpenModalUser: false,
      records: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.getAllUserList();
  }

  getAllUserList() {
    const requestData = pagingRequestDTO({
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
      pageIndex: 0,
      sizePage: 10,
      sort: "",
      orders: [],
      data: {},
    });
    userService
      .listUserPaging(requestData)
      .then((response) => {
        this.setState({ records: response.data.data.records, loading: false });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }

  // handleToggleModalUser = () => {
  //   this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
  // };

  onClickAddNewUser = () => {
    const { modalActionCreators } = this.props;
    const { changeModalTitle, editingModal, showModal } = modalActionCreators;

    // this.handleToggleModalUser();
    changeModalTitle(<FormattedMessage id={"system.user-manage.add-user"} />);
    editingModal(null);
    showModal();
  };

  createNewUser = async (data) => {
    const { modalActionCreators } = this.props;
    const { hideModal } = modalActionCreators;

    authService
      .register(data)
      .then((response) => {
        this.getAllUserList();
        // this.handleToggleModalUser();
        hideModal();
        emitter.emit("EVENT_CLEAR_MODAL_USER");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.log(error);
      });
  };

  clickDeleteUser = (user) => {
    this.props.setContentOfConfirmModal({
      isOpen: true,
      messageId: "system.user-manage.sure-delete-user",
      handleFunc: this.deleteUser,
      dataFunc: user,
    });
  };

  deleteUser = () => {
    const { dataFunc } = this.props.contentOfConfirmModal;
    const user = dataFunc;
    userService
      .deleteUser(user.id)
      .then((response) => {
        this.getAllUserList();
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  clickUpdateUser = (user) => {
    const { modalActionCreators } = this.props;
    const { showModal, changeModalTitle, editingModal } = modalActionCreators;

    //this.handleToggleModalUser();
    changeModalTitle(<FormattedMessage id={"system.user-manage.edit-user"} />);
    showModal();
    editingModal(user);
  };

  updateUser = async (data) => {
    const { modalActionCreators } = this.props;
    const { hideModal } = modalActionCreators;

    await userService
      .updateUser(data)
      .then((response) => {
        this.getAllUserList();
        hideModal();
        emitter.emit("EVENT_CLEAR_MODAL_USER");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.log(error);
      });
  };

  render() {
    const { records, loading, error } = this.state;
    const { isShowModal } = this.props;

    if (loading) {
      return <div>Loading data...</div>;
    } else if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <MainLayout>
          <ConfirmModal />
          {isShowModal && (
            <ModalUser
              //isOpen={this.state.isOpenModalUser}
              //toggleModalUser={this.handleToggleModalUser}
              createNewUser={this.createNewUser}
              updateUser={this.updateUser}
            />
          )}
          <div className="user-container custom-base">
            <h2>MANAGE USERS</h2>
            <button
              type="button"
              className="btn btn-primary add-user custom-base"
              onClick={() => this.onClickAddNewUser()}
            >
              <FaPlus /> Add new users
            </button>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((data, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{data.email}</td>
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td>{data.address}</td>
                    <td>
                      <span className="action-btn">
                        <MdEdit
                          title="Edit"
                          style={{
                            fontSize: "20px",
                          }}
                          onClick={() => this.clickUpdateUser(data)}
                        />
                      </span>

                      <span className="action-btn">
                        <MdDelete
                          title="Delete"
                          style={{
                            fontSize: "20px",
                          }}
                          onClick={() => this.clickDeleteUser(data)}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MainLayout>
      );
    }
  }
}

const mapStateToProps = (state, dispatch) => {
  return {
    lang: state.app.language,
    contentOfConfirmModal: state.app.contentOfConfirmModal,
    isLoggedIn: state.user.isLoggedIn,
    isShowModal: state.modal.isShowModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modalActionCreators: bindActionCreators(actions, dispatch),
    setContentOfConfirmModal: (contentOfConfirmModal) =>
      dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
