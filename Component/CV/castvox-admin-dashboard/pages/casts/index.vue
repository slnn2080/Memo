<template>
  <form @submit="console.log('test')">
    <master_list
      :page_name="`キャスト一覧 ${
        mode.select_mode == 1 ? '(注目キャスト選択)' : ''
      }`"
      api_name="casts"
      :total_data="total"
      :head="tableColumns"
      :data="tableData"
      :hide_delete="true"
      :hide_create="true"
      :is_show_submit="mode.select_mode == 1"
      :enterDetailPage="true"
    />
  </form>
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import Master_list from "../../components/layouts/custom/master_list";
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
          prop: "selected",
          label: "選択",
          type: "check",
          is_hidden: true,
          minWidth: 50,
        },
        {
          prop: "id",
          label: "ID",
          minWidth: 50,
          sortable: true,
          sortMethod: (a, b) => {
            if (Number(a.id) > Number(b.id)) {
              return 1;
            } else {
              return -1;
            }
          },
        },
        {
          prop: "attributes.img_path.0",
          label: "画像",
          type: "image",
          minWidth: 150,
          sortable: false,
        },
        {
          prop: "attributes.name",
          label: "名前",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "relationships.member.meta.company_name.0",
          label: "所属プロダクション",
          minWidth: 150,
          sortable: true,
        },
        {
          prop: "attributes.createdAt",
          label: "登録日",
          type: "date",
          minWidth: 100,
          sortable: true,
        },
      ],
      selectedRows: [],
      pagination: { perPage: 10, currentPage: 1 },
    };
  },
  async asyncData(ctx) {
    try {
      let tableData = {};
      let mode = {};
      const api_url = `${url}/${api_name}`;
      await ctx.$axios.get(api_url).then((res) => {
        tableData = res.data.data.map((data) => {
          data.attributes.created_date = ctx.$castvox.get_date(
            data.attributes.createdAt
          );
          return data;
        });
      });
      if (ctx.query && ctx.query.select_mode) {
        mode = ctx.query;
        tableData = tableData.filter((e) => {
          if (mode.top_ids.includes(String(e.id))) {
            //選択キャストのデータは非表示に
            return false;
          } else {
            e.selected = false;
            return true;
          }
        });
      }
      return {
        mode: mode,
        tableData: tableData,
        total: tableData.length,
      };
    } catch (e) {
      console.log(e);
    }
  },
  destroyed() {
    this.$nuxt.$off("submit");
  },
  methods: {
    onceCastsSubmit() {
      try {
        let id = 0;
        let selected = this.tableData.filter((e) => {
          return e.selected;
        });
        if (selected == null || selected.length == 0) {
          this.$toast.error("キャストを選択してください");
          throw "キャストを選択してください";
        }
        if (selected.length != 1) {
          this.$toast.error("キャストが複数選択されています");
          throw "キャストが複数選択されています";
        }
        let idx = this.mode.top_ids.indexOf(this.mode.edit_cast_id);
        this.mode.top_ids[idx] = selected[0].id;
        this.$router.push({
          path: "/casts/feature",
          query: {
            top_ids: this.mode.top_ids,
          },
        });
      } catch (err) {
        console.log(err);
        this.$nuxt.$once("submit", () => {
          this.onceCastsSubmit();
        });
      }
    },
  },
  created() {
    if (this.$route.query && this.$route.query.select_mode) {
      //注目キャスト処理
      this.tableColumns[0].is_hidden = false;
      this.$nuxt.$once("submit", () => {
        this.onceCastsSubmit();
      });
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
