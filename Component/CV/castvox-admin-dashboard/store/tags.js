import service from "../services/tags-service";

export const state = () => ({
  list: {},
  tag: {},
  meta: {},
});

export const mutations = {
  SET_LIST: (state, list) => {
    state.list = list;
  },
  SET_RESOURCE: (state, tag) => {
    state.tag = tag;
  },
  SET_META: (state, meta) => {
    state.meta = meta;
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
    return service.get(params, this.$axios).then((tag) => {
      commit("SET_RESOURCE", tag);
    });
  },

  add({ commit, dispatch }, params) {
    return service.add(params, this.$axios).then((tag) => {
      commit("SET_RESOURCE", tag);
    });
  },

  update({ commit, dispatch }, params) {
    return service.update(params, this.$axios).then((tag) => {
      commit("SET_RESOURCE", tag);
    });
  },

  destroy({ commit, dispatch }, params) {
    return service.destroy(params, this.$axios);
  },
};

export const getters = {
  list: (state) => state.list,
  listTotal: (state) => state.meta.page.total,
  tag: (state) => state.tag,
  dropdown: (state) => {
    return state.list.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));
  },
};
