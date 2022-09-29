<template>
  <master_list
    page_name="管理ユーザー"
    api_name="users"
    :total_data="total"
    :head="tableColumns"
    :data="tableData"
  />
</template>
<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import Master_list from "~/components/layouts/custom/master_list";
const url = process.env.apiUrl;
let api_name = "users";

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
          prop: "attributes.name",
          label: "名前",
          type: "text",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.email",
          label: "E-mail",
          type: "email",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.created_at",
          type: "datetime",
          label: "作成日",
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
      const api_url = `${url}/${api_name}?include=roles&filter[roles]=admin`;
      await ctx.$axios.get(api_url).then((res) => {
        tableData = res.data.data
          .filter((e) => {
            return e.relationships.roles.data[0].id == 1;
          })
          .map((data) => {
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
