<template>
  <master_list
    page_name="クライアント/キャスト"
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
          prop: "attributes.category",
          label: "",
          minWidth: 75,
          sortable: true,
          type: "select",
          options: [
            {
              type: "primary",
              text: "法人",
            },
            {
              type: "info",
              text: "個人",
            },
          ],
        },
        {
          prop: "attributes.company_name",
          label: "企業名",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.first_name",
          label: "契約者名",
          minWidth: 100,
          type: "contractor",
        },
        {
          prop: "relationships.plan",
          label: "プラン",
          minWidth: 100,
          type: "plan",
        },
        {
          prop: "attributes.created_date",
          label: "申請日",
          minWidth: 70,
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
          .filter(
            (e) =>
              e.attributes.status ===
                ctx.$castvox.get_approvals("fix_approval") &&
              e.attributes.role === ctx.$castvox.roles()["both"]
          )
          .map((data) => {
            data.attributes.created_date = ctx.$castvox.get_date(
              data.attributes.createdAt
            );
            return data;
          });
        tableData = tableData.filter((item) => {
          return item.attributes.role == 3;
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
