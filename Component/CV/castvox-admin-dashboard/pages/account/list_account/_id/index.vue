<template>
  <master_list
    :page_name="`アカウント一覧(id=${this.id})`"
    api_name="members"
    :total_data="total"
    :head="tableColumns"
    :data="tableData"
    :hide_delete="false"
    :hide_edit="false"
    :hide_create="false"
    :is_show_change="false"
    :is_show_submit="false"
    :is_hook_select="true"
    :is_hook_delete="true"
    :edit_to="`/account/edit_account/${this.id}`"
  />
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import Master_list from "~/components/layouts/custom/master_list";
const url = process.env.apiUrl;
const api_name = "members";
const group_api_name = "group_infos";

const get_table_data = async (ctx, member_id) => {
  const api_url = `${url}/${group_api_name}`;
  const response = await ctx.$axios.get(api_url);
  return response.data.data
    .map((record) => {
      record.attributes.id = record.id;
      return record.attributes;
    })
    .filter((dt) => String(dt.member_id) === String(member_id));
};

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
          minWidth: 50,
          sortable: true,
        },
        {
          prop: "name",
          label: "名前",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "email",
          label: "メールアドレス",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "phone_number",
          label: "電話番号",
          minWidth: 100,
          sortable: true,
        },
      ],
      tableData: [],
      selectedRows: [],
      pagination: { perPage: 10, currentPage: 1 },
    };
  },
  methods: {
    onceSelectItem(e) {
      try {
        this.$router.push({
          path: `/account/edit_account/${this.id}`,
          query: {
            edit_id: e.row.id,
          },
        });
      } catch (err) {
        console.log(err);
        this.$nuxt.$once("select_item", (e) => {
          this.onceSelectItem(e);
        });
      }
    },
    async onceDeleteItem(e) {
      try {
        console.log("delete_item", e);
        const api_url = `${url}/${group_api_name}/${e}`;
        await this.$axios.delete(api_url);

        //画面読み込み直し
        this.tableData = await get_table_data(this, this.$route.params.id);
      } catch (err) {
        console.log(err);
        this.$nuxt.$once("delete_item", (e) => {
          this.onceDeleteItem(e);
        });
      }
    },
  },
  created() {
    this.$nuxt.$once("select_item", (e) => {
      this.onceSelectItem(e);
    });
    this.$nuxt.$once("delete_item", (e) => {
      this.onceDeleteItem(e);
    });
  },
  destroyed() {
    this.$nuxt.$off("select_item");
    this.$nuxt.$off("delete_item");
  },
  async asyncData(ctx) {
    try {
      if (!ctx.params && !ctx.params.id) return {};

      const tableData = await get_table_data(ctx, ctx.params.id);

      return {
        tableData: tableData,
        id: ctx.params.id,
        total: tableData.length,
      };
    } catch (e) {
      console.log(e);
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
