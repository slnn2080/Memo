import service from "../services/roles-service";
import Jsona from "jsona";

const jsona = new Jsona();

export const state = () => ({
  list: {},
  role: {},
  meta: {},
});

export const mutations = {
  SET_LIST: (state, list) => {
    state.list = list;
  },
  SET_RESOURCE: (state, role) => {
    state.role = role;
  },
  SET_META: (state, meta) => {
    state.meta = meta;
  },
};

export const actions = {
  list({ commit, dispatch }, params = {}) {
    return service.list(params, this.$axios).then(({ list, meta }) => {
      commit("SET_LIST", list);
      commit("SET_META", meta);
    });
  },

  get({ commit, dispatch }, params) {
    return service.get(params, this.$axios).then((role) => {
      commit("SET_RESOURCE", role);
    });
  },

  add({ commit, dispatch }, params) {
    return service.add(params, this.$axios).then((role) => {
      commit("SET_RESOURCE", role);
    });
  },

  update({ commit, dispatch }, params) {
    return service.update(params, this.$axios).then((role) => {
      commit("SET_RESOURCE", role);
    });
  },

  destroy({ commit, dispatch }, params) {
    return service.destroy(params, this.$axios);
  },
};

export const getters = {
  list: (state) => state.list,
  listTotal: (state) => state.meta.page.total,
  role: (state) => state.role,
  dropdown: (state) => {
    return state.list.map((role) => ({
      id: role.id,
      name: role.name,
    }));
  },
};
