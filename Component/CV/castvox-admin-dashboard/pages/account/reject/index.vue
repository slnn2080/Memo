<template>
  <master_list
    page_name="却下済みユーザー"
    api_name="members"
    :total_data="total"
    :head="tableColumns"
    :data="tableData"
    :hide_delete="true"
    :hide_create="true"
    edit_to="/account/detail"
  />
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import Master_list from "../../../components/layouts/custom/master_list";
const url = process.env.apiUrl;
let api_name = "members";

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
          sortMethod: (a, b) => {
            if (Number(a.id) > Number(b.id)) {
              return 1;
            } else {
              return -1;
            }
          },
        },
        {
          prop: "attributes.company_name",
          label: "企業名",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.status",
          label: "承認状況",
          type: "select",
          minWidth: 100,
          sortable: true,
          options: this.$castvox.approvals(),
        },
        {
          prop: "attributes.category",
          label: "種別",
          type: "select",
          options: [
            {
              type: "light",
              text: "プロダクション",
            },
            {
              type: "light",
              text: "クライアント",
            },
          ],
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.created_date",
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
      const api_url = `${url}/${api_name}`;
      await ctx.$axios.get(api_url).then((res) => {
        tableData = res.data.data
          .filter((e) => {
            return e.attributes.status === ctx.$castvox.get_approvals("reject");
          })
          .map((data) => {
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
