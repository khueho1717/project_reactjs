import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers, createNewUserService } from "../../services/userService";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
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

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  addNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      // console.log(response);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        this.getAllUsers();
        this.toggleUserModal();
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
                      <tr key={item.id}>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phonenumber}</td>
                        <td>{item.address}</td>
                        <td className="text-center">
                          <button className="btn-edit">
                            <i className="fas fa-user-edit"></i>
                          </button>
                          <button className="btn-delete">
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
