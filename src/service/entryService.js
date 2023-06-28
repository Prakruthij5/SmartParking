import http from "../http-common";
const getAll = () => {
  return http.get(`entryInfo/entryInfoList`);
};
const get = parkId => {
  return http.get(`entryInfo/getEntryInfoById/${parkId}`);
};
const create = data => {
  return http.post(`entryInfo/saveEntryInfo`, data);
};
const update = (parkId, data) => {
  return http.put(`entryInfo/updateEntryInfo/${parkId}`, data);
};
const remove = parkId => {
  return http.delete(`entryInfo/deleteEntryInfo/${parkId}`);
};

const UserService = {
  getAll,
  get,
  create,
  update,
  remove,

};
export default UserService;