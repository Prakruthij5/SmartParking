import http from "../http-common";
const getAll = () => {
  return http.get(`/userDetails/userList`);
};
const get = userId => {
  return http.get(`/userDetails/getUserById/${userId}`);
};
const create = data => {
  return http.post("/userDetails/saveUser", data);
};
const update = (userId, data) => {
  return http.put(`/userDetails/updateUser/${userId}`, data);
};
const remove = userId => {
  return http.delete(`/userDetails/deleteUser/${userId}`);
};

const UserService = {
  getAll,
  get,
  create,
  update,
  remove,

};
export default UserService;