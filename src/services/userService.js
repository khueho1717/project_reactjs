import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (id) => {
  return axios.get("/api/get-all-users?id=" + id);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const updateUserService = (data) => {
  return axios.put("/api/edit-user", data);
};

const deleteUserService = (id) => {
  // return axios.delete("/api/delete-user", { id: id });
  return axios.delete("/api/delete-user", {
    // headers: {
    //   Authorization: authorizationToken
    // },
    data: {
      id: id,
    },
  });
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  updateUserService,
};
