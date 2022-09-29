import service from "../services/items-service";

export const state = {
  list: {},
  item: {},
  meta: {},
  url: null,
};

export const mutations = {
  SET_LIST: (state, list) => {
    state.list = list;
  },
  SET_RESOURCE: (state, item) => {
    state.item = item;
  },
  SET_META: (state, meta) => {
    state.meta = meta;
  },
  SET_URL: (state, url) => {
    state.url = url;
  },
};

export const actions = {
  list({ commit, dispatch }, params) {
    return service.list(params, this.$axios).then(({ list, meta }) => {
      commit("SET_LIST", list);
      commit("SET_META", meta);
    });
  },

  get({ commit, dispatch }, params) {
    return service.get(params, this.$axios).then((item) => {
      commit("SET_RESOURCE", item);
    });
  },

  add({ commit, dispatch }, params) {
    return service.add(params, this.$axios).then((item) => {
      commit("SET_RESOURCE", item);
    });
  },

  update({ commit, dispatch }, params) {
    return service.update(params, this.$axios).then((item) => {
      commit("SET_RESOURCE", item);
    });
  },

  destroy({ commit, dispatch }, params) {
    return service.destroy(params, this.$axios);
  },

  upload({ commit, dispatch }, { item, image }) {
    return service.upload(item, image, this.$axios).then((url) => {
      commit("SET_URL", url);
    });
  },
};

export const getters = {
  list: (state) => state.list,
  listTotal: (state) => state.meta.page.total,
  item: (state) => state.item,
  url: (state) => state.url,
};
