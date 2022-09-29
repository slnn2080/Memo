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

  return axios.get(`${url}/tags`, options).then((response) => {
    return {
      list: jsona.deserialize(response.data),
      meta: response.data.meta,
    };
  });
}

function get(id, axios) {
  return axios.get(`${url}/tags/${id}`).then((response) => {
    let tag = jsona.deserialize(response.data);
    delete tag.links;
    return tag;
  });
}

function add(tag, axios) {
  const payload = jsona.serialize({
    stuff: tag,
    includeNames: null,
  });

  return axios.post(`${url}/tags`, payload).then((response) => {
    return jsona.deserialize(response.data);
  });
}

function update(tag, axios) {
  const payload = jsona.serialize({
    stuff: tag,
    includeNames: [],
  });

  return axios.patch(`${url}/tags/${tag.id}`, payload).then((response) => {
    return jsona.deserialize(response.data);
  });
}

function destroy(id, axios) {
  return axios.delete(`${url}/tags/${id}`);
}

export default {
  list,
  get,
  add,
  update,
  destroy,
};
