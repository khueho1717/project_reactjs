import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  updateUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsers();
  }

  getAllUsers = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  checkValidateInput = () => {};

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  handleEditUser = (user) => {
    // console.log("id user: ", user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  handleDeleteUser = async (id) => {
    // alert("delete user " + id);
    try {
      let res = await deleteUserService(id);
      // this.getAllUsers();
      if (res && res.errCode === 2) {
        await this.getAllUsers();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  addNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      // console.log(response);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUsers();
        this.toggleUserModal();
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your Id" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  editUser = async (data) => {
    try {
      let res = await updateUserService(data);
      if (res && res.errCode !== 0) {
        alert(res.message);
      } else {
        await this.getAllUsers();
        this.toggleUserEditModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleUserModal={this.toggleUserModal}
          addNewUser={this.addNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleUserEditModal={this.toggleUserEditModal}
            userParent={this.state.userEdit}
            // addNewUser={this.addNewUser}
            editUser={this.editUser}
          />
        )}

        <div className="title text-center">Manage user with Khue</div>
        <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewUser()}
          >
            <i class="fas fa-plus"></i>Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Number Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phonenumber}</td>
                        <td>{item.address}</td>
                        <td className="text-center">
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className="fas fa-user-edit"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteUser(item.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
