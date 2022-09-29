// thanks to https://github.com/mrichar1/jsonapi-vuex/issues/13
export default function ({ $axios, store }) {
  $axios.setHeader("Content-Type", "application/json");
  $axios.setHeader("Accept", "application/json");
}
