import service from "../services/categories-service";

export const state = () => ({
  list: {},
  category: {},
  meta: {},
});

export const mutations = {
  SET_LIST: (state, list) => {
    state.list = list;
  },
  SET_RESOURCE: (state, category) => {
    state.category = category;
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
    return service.get(params, this.$axios).then((category) => {
      commit("SET_RESOURCE", category);
    });
  },

  add({ commit, dispatch }, params) {
    return service.add(params, this.$axios).then((category) => {
      commit("SET_RESOURCE", category);
    });
  },

  update({ commit, dispatch }, params) {
    return service.update(params, this.$axios).then((category) => {
      commit("SET_RESOURCE", category);
    });
  },

  destroy({ commit, dispatch }, params) {
    return service.destroy(params, this.$axios);
  },
};

export const getters = {
  list: (state) => state.list,
  listTotal: (state) => state.meta.page.total,
  category: (state) => state.category,
  dropdown: (state) => {
    return state.list.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  },
};
