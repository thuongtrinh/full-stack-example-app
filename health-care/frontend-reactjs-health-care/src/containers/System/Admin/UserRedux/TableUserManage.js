import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import MainLayout from "../../../../components/Layout/MainLayout";
import * as actions from "../../../../store/actions";
import { MdDelete, MdEdit } from "react-icons/md";
import _ from "lodash";

class TableUserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllUsersRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({ usersRedux: this.props.listUsers });
    }
  }

  clickDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };

  clickUpdateUser = (user) => {
    this.props.handleUpdateUserFromParent(user);
  };

  render() {
    const records = this.state.usersRedux;
    return (
      <MainLayout>
        <div className="user-container custom-base">
          <table className="user-table">
            <thead>
              <tr>
                <th>
                  <FormattedMessage id="system.user-manage.email" />
                </th>
                <th>
                  <FormattedMessage id="system.user-manage.firstname" />
                </th>
                <th>
                  <FormattedMessage id="system.user-manage.lastname" />
                </th>
                <th>
                  <FormattedMessage id="system.user-manage.address" />
                </th>
                <th>
                  <FormattedMessage id="system.user-manage.action" />
                </th>
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

const mapStateToProps = (state, dispatch) => {
  return {
    lang: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUserRedux(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
