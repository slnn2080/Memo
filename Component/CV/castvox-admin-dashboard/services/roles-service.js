import qs from "qs";
import Jsona from "jsona";

const url = process.env.apiUrl;
const jsona = new Jsona();

function list(params, axios) {
  let options = {
    params: params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { encode: false });
    },
  };

  return axios.get(`${url}/roles`, options).then((response) => {
    return {
      list: jsona.deserialize(response.data),
      meta: response.data.meta,
    };
  });
}

function get(id, axios) {
  return axios.get(`${url}/roles/${id}`).then((response) => {
    let role = jsona.deserialize(response.data);
    delete role.links;
    return role;
  });
}

function add(role, axios) {
  const payload = jsona.serialize({
    stuff: role,
    includeNames: null,
  });

  return axios.post(`${url}/roles`, payload).then((response) => {
    return jsona.deserialize(response.data);
  });
}

function update(role, axios) {
  const payload = jsona.serialize({
    stuff: role,
    includeNames: [],
  });

  return axios.patch(`${url}/roles/${role.id}`, payload).then((response) => {
    return jsona.deserialize(response.data);
  });
}

function destroy(id, axios) {
  return axios.delete(`${url}/roles/${id}`);
}

export default {
  list,
  get,
  add,
  update,
  destroy,
};
