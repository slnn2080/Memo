<template>
  <div>
    <master_list
      page_name="注目リスト管理"
      api_name="casts"
      :total_data="total"
      :head="tableColumns"
      :data="tableData"
      :hide_delete="true"
      :hide_create="true"
      :is_show_prio="true"
      :is_show_submit="true"
      :is_show_feature="true"
      :is_show_change="true"
      :default_sort="{ prop: 'priority', order: 'descending' }"
      edit_to="/casts/detail"
    />
  </div>
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import Master_list from "~/components/layouts/custom/master_list";
const url = process.env.apiUrl;
let api_name = "casts";

export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  components: {
    Master_list,
  },
  data() {
    return {
      tableColumns: [
        {
          prop: "id",
          label: "ID",
          minWidth: 64,
          sortable: false,
        },
        {
          prop: "priority",
          minWidth: 20,
          is_hidden: true,
          type: "hidden",
          sortable: false,
        },
        {
          prop: "attributes.img_path.0",
          label: "写真",
          type: "image",
          minWidth: 128,
          sortable: false,
          index: 0,
        },
        {
          prop: "attributes.name",
          label: "名前",
          minWidth: 128,
          sortable: false,
        },
        {
          prop: "attributes.title",
          label: "肩書き",
          minWidth: 100,
          sortable: false,
        },
      ],
      selectedRows: [],
      pagination: { perPage: 10, currentPage: 1 },
    };
  },
  destroyed() {
    this.$nuxt.$off("update-feature");
    this.$nuxt.$off("update-list");
    this.$nuxt.$off("change-item");
    this.$nuxt.$off("priority");
    this.$nuxt.$off("submit");
  },
  methods: {
    async onceUpdateFeature() {
      try {
        let ids = [];
        await this.$axios.get(`${url}/top_10_cast`).then((res) => {
          if (res.data.length == 0) {
            this.$toast.error(`データが取得できません`);
          }
          ids = res.data.id;
        });
        this.$toast.success(`注目キャストを取得しました`);
        this.$nuxt.$emit("update-list", ids);
      } catch (err) {
        console.log(err);
        this.$nuxt.$once("update-feature", () => {
          this.onceUpdateFeature();
        });
      }
    },
    async onceUpdateList(ids) {
      try {
        await this.$axios
          .get(`${url}/casts?filter[id]=${ids.join(",")}`)
          .then((res) => {
            if (res.data.length == 0) {
              this.$toast.error(`データが取得できません`);
            }
            res.data.data.forEach((e) => {
              e.priority = ids.indexOf(String(e.id));
            });
            res.data.data.sort((a, b) => {
              return a.priority - b.priority;
            });

            this.tableData = res.data.data;
          });
      } catch (err) {
        console.log(err);
        this.$nuxt.$once("update-list", (ids) => {
          this.onceUpdateList(ids);
        });
      }
    },
    onceChangeItem(e) {
      try {
        let ids = [];
        this.tableData.forEach((e) => {
          ids.push(e.id);
        });
        this.$router.push({
          path: "/casts",
          query: {
            edit_cast_id: e.id,
            top_ids: ids,
            select_mode: 1,
          },
        });
      } catch (err) {
        console.log(err);
        this.$nuxt.$once("change-item", (e) => {
          this.onceChangeItem(e);
        });
      }
    },
    oncePriority(e, or) {
      try {
        let target = 0;

        if (or) {
          // 優先順位上
          if (e.priority > 0) {
            target = this.tableData[e.priority - 1].priority;
          } else return;
        } else {
          // 優先順位下
          if (e.priority < 9) {
            target = this.tableData[e.priority + 1].priority;
          } else return;
        }

        this.tableData[target].priority = e.priority;
        e.priority = target;
        this.tableData.sort((a, b) => {
          return a.priority - b.priority;
        });
      } catch (err) {
        console.log(err);
        this.$nuxt.$once("priority", (e, or) => {
          this.oncePriority(e, or);
        });
      }
    },
    async onceFeatureSubmit() {
      try {
        try {
          let ids = [];
          this.tableData.forEach((e) => {
            ids.push(e.id);
          });
          await this.$axios.patch(`${url}/tops/1`, {
            data: {
              type: "tops",
              id: "1",
              attributes: {
                cast_ids: ids,
              },
            },
          });
          this.$toast.success(`更新が完了しました`);
        } catch (e) {
          console.error(e);
        }
      } catch (err) {
        console.log(err);
        this.$nuxt.$once("submit", () => {
          this.onceFeatureSubmit();
        });
      }
    },
    debounce(fn, delay) {
      let timer = null;
      return function (args) {
        let that = this;
        args = arguments;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(that, args);
        }, delay);
      };
    },
  },
  created() {
    this.$nuxt.$on("update-feature", () => {
      this.onceUpdateFeature();
    });
    this.$nuxt.$on("update-list", (ids) => {
      this.onceUpdateList(ids);
    });

    this.$nuxt.$once("change-item", (e) => {
      this.onceChangeItem(e);
    });
    this.$nuxt.$on("priority", (e, or) => {
      this.oncePriority(e, or);
    });
    let debounceSubmit = this.debounce(this.onceFeatureSubmit, 500);
    this.$nuxt.$on("submit", () => {
      debounceSubmit();
    });
  },
  async asyncData(ctx) {
    try {
      let tableData = {};
      let ids = {};
      //キャストリスト取得
      if (ctx.query && ctx.query.top_ids) {
        //編集中はクエリから
        ids = ctx.query.top_ids;
      } else {
        //初期表示はtopsから
        await ctx.$axios.get(`${url}/tops/1`).then((res) => {
          if (res.data.length == 0) {
            ctx.$toast.error(`データが取得できません`);
          }
          ids = res.data.data.attributes.cast_ids;
        });
      }
      await ctx.$axios
        .get(`${url}/casts?filter[id]=${ids.join(",")}`)
        .then((res) => {
          if (res.data.length == 0) {
            ctx.$toast.error(`データが取得できません`);
          }
          res.data.data.forEach((e) => {
            e.priority = ids.indexOf(String(e.id));
          });
          res.data.data.sort((a, b) => {
            return a.priority - b.priority;
          });

          tableData = res.data.data;
        });
      return {
        tableData: tableData,
        total: tableData.length,
      };
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}

.job-header {
  display: flex;
  justify-content: space-between;
  padding-right: 36px;
}
</style>
