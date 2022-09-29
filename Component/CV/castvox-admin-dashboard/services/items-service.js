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

  return axios.get(`${url}/items`, options).then((response) => {
    return {
      list: jsona.deserialize(response.data),
      meta: response.data.meta,
    };
  });
}

function get(id, axios) {
  return axios
    .get(`${url}/items/${id}?include=category,tags`)
    .then((response) => {
      let item = jsona.deserialize(response.data);
      delete item.links;
      return item;
    });
}

function add(item, axios) {
  const payload = jsona.serialize({
    stuff: item,
    includeNames: ["categories"],
  });

  return axios
    .post(`${url}/items?include=category,tags`, payload)
    .then((response) => {
      return jsona.deserialize(response.data);
    });
}

function update(item, axios) {
  const payload = jsona.serialize({
    stuff: item,
    includeNames: [],
  });

  return axios
    .patch(`${url}/items/${item.id}?include=category,tags`, payload)
    .then((response) => {
      return jsona.deserialize(response.data);
    });
}

function destroy(id, axios) {
  return axios.delete(`${url}/items/${id}`);
}

function upload(item, image, nuxt_axios) {
  const payload = new FormData();
  payload.append("attachment", image);

  let axios = nuxt_axios.create();
  delete axios.defaults.headers.common["content-type"];
  delete axios.defaults.headers.post["content-type"];

  return axios({
    method: "POST",
    url: `/uploads/items/${item.id}/image`,
    data: payload,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
  }).then((response) => {
    return response.data.url;
  });
}

export default {
  list,
  get,
  add,
  update,
  destroy,
  upload,
};
