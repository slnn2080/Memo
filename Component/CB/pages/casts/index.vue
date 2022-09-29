<template>
  <master_list
    page_name="キャスト一覧"
    api_name="casts"
    :total_data="total"
    :head="tableColumns"
    :data="tableData"
    :hide_delete="true"
    :hide_create="true"
  />
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
          prop: "id",
          label: "ID",
          minWidth: 50,
          sortable: true,
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
          prop: "relationships.member.meta.company_name",
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
      const api_url = `${url}/${api_name}`;
      await ctx.$axios.get(api_url).then((res) => {
        tableData = res.data.data.map((data) => {
          data.attributes.created_date = ctx.$castvox.get_date(
            data.attributes.createdAt
          );
          return data;
        });
      });
      return {
        tableData: tableData,
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
