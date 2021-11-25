import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
    console.log("data from nodejs ", response);
  }

  render() {
    let arrUsers = this.state.arrUsers;
    console.log(arrUsers, "from render");
    return (
      <div className="users-container">
        <div className="title text-center">Manage user with Khue</div>
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
                          <i class="fas fa-user-edit"></i>
                        </button>
                        <button className="btn-delete">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
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
