import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      gender: "0",
      roleId: "1",
    };
  }

  componentDidMount() {
    let user = this.props.userParent;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phonenumber: user.phonenumber,
        gender: user.gender,
        roleId: user.roleId,
      });
    }
  }

  toggle = () => {
    this.props.toggleUserEditModal();
  };

  handleOnChangeInput = (event, input) => {
    let copyState = { ...this.state };
    copyState[input] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let check = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phonenumber",
    ];
    let userPost = this.state;
    for (let i = 0; i < arrInput.length; i++) {
      if (!userPost[arrInput[i]]) {
        check = false;
        alert(arrInput[i] + " input not null");
        break;
      }
    }
    return check;
  };

  handleSaveUser = () => {
    let inValid = this.checkValidateInput();
    if (inValid === true) {
      // call api edit user
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
        <ModalBody>
          {/* <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input type="text" />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input type="password" />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input type="text" />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input type="text" />
            </div>
            <div className="input-container address">
              <label>Address</label>
              <input type="text" />
            </div>
          </div> */}
          <form className="row g-3 ">
            <div className="col-md-6">
              <label for="inputEmail4">Email</label>
              <input
                readOnly
                type="email"
                className="form-control"
                name="email"
                id="inputEmail4"
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                value={this.state.email}
              />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4">Password</label>
              <input
                readOnly
                type="password"
                className="form-control"
                name="password"
                id="inputPassword4"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "password")
                }
                value={this.state.password}
              />
            </div>
            <div className="col-md-6">
              <label for="inputEmail5">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="inputEmail5"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
                value={this.state.firstName}
              />
            </div>
            <div className="col-md-6">
              <label for="inputPassword6">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                id="inputPassword6"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
                value={this.state.lastName}
              />
            </div>
            <div className="col-md-12">
              <label for="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                name="address"
                placeholder="1234 Main St"
                onChange={(event) => this.handleOnChangeInput(event, "address")}
                value={this.state.address}
              />
            </div>
            <div className="col-md-6">
              <label for="inputCity">Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phonenumber"
                id="inputCity"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "phonenumber")
                }
                value={this.state.phonenumber}
              />
            </div>
            <div className="col-md-3">
              <label for="inputState">Gender</label>
              <select
                readOnly
                id="inputState"
                name="gender"
                className="form-control"
                onClick={(event) => this.handleOnChangeInput(event, "gender")}
                value={this.state.gender}
              >
                <option selected value="0" selected>
                  Male
                </option>
                <option value="1">Female</option>
              </select>
            </div>
            <div className="col-md-3">
              <label for="inputZip">Role</label>
              <select
                readOnly
                id="inputZip"
                name="roleId"
                className="form-control"
                onClick={(event) => this.handleOnChangeInput(event, "roleId")}
                value={this.state.roleId}
              >
                <option selected value="1">
                  Admin
                </option>
                <option value="2">Doctor</option>
                <option value="3">Patient</option>
              </select>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveUser()}
          >
            Save Change
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
