/* mixin to return custom name in header on page visit  */
import Vue from "vue";

export const paginationMixin = {
  data() {
    return {
      pageSizes: [5, 10, 25, 50],
      pagination: {},
      api_options: {
        options: {
          "page[size]": 5,
          "page[number]": 1,
          sort: "created_at",
        },
      },
    };
  },

  computed: {
    singlePagePagination() {
      return Boolean(Number(this.pagination["last-page"]) === 1);
    },
  },

  methods: {
    sortChange({ prop, order }) {
      const name = prop.substring(11, prop.length);
      if (order === "descending") {
        Vue.set(this.api_options.options, "sort", `-${name}`);
      } else {
        Vue.set(this.api_options.options, "sort", `${name}`);
      }
      this.$fetch();
    },
    /* trigger method @changePage page event */
    handleChangePage(item) {
      Vue.set(this.api_options.options, "page[number]", item["current-page"]);
      if (this.api_options.options["page[size]"] != item["per-page"]) {
        Vue.set(this.api_options.options, "page[number]", 1);
      }
      Vue.set(this.api_options.options, "page[size]", item["per-page"]);

      this.$fetch();
    },

    /* trigger method @change page event */
    handleSizePageChange(item) {
      // Vue.set(this.api_options.options, 'page[size]', item['per-page'])
      // Vue.set(this.api_options.options, 'page[number]', 1)

      this.$fetch();
    },
  },
};
