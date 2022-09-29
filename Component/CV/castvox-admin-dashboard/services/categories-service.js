import qs from "qs";
import Jsona from "jsona";

const url = process.env.apiUrl;
const jsona = new Jsona();

function list(params, axios) {
  const options = {
    params: params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { encode: false });
    },
  };
  return axios.get(`${url}/categories`, options).then((response) => {
    return {
      list: jsona.deserialize(response.data),
      meta: response.data.meta,
    };
  });
}

function get(id, axios) {
  return axios.get(`${url}/categories/${id}`).then((response) => {
    let category = jsona.deserialize(response.data);
    delete category.links;
    return category;
  });
}

function add(category, axios) {
  const payload = jsona.serialize({
    stuff: category,
    includeNames: null,
  });

  return axios.post(`${url}/categories`, payload).then((response) => {
    return jsona.deserialize(response.data);
  });
}

function update(category, axios) {
  const payload = jsona.serialize({
    stuff: category,
    includeNames: [],
  });

  return axios
    .patch(`${url}/categories/${category.id}`, payload)
    .then((response) => {
      return jsona.deserialize(response.data);
    });
}

function destroy(id, axios) {
  return axios.delete(`${url}/categories/${id}`);
}

export default {
  list,
  get,
  add,
  update,
  destroy,
};
