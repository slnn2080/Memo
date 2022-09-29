import Jsona from "jsona";

const url = process.env.apiUrl;
const jsona = new Jsona();

function get(params, axios) {
  return axios.get(`${url}/me?include=roles`).then((response) => {
    return {
      list: jsona.deserialize(response.data),
      meta: response.data.meta,
    };
  });
}

function update(profile, axios) {
  const payload = jsona.serialize({
    stuff: profile,
    includeNames: [],
  });

  return axios.patch(`${url}/me?include=roles`, payload).then((response) => {
    return jsona.deserialize(response.data);
  });
}

export default {
  get,
  update,
};
