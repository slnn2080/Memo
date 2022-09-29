<template>
  <master_list
    page_name="既読お問い合わせ"
    api_name="inquiries"
    :total_data="total"
    :head="tableColumns"
    :data="tableData"
    :hide_delete="true"
    :hide_create="true"
    edit_to="/inquiries/detail"
  />
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import Master_list from "../../../components/layouts/custom/master_list";
const url = process.env.apiUrl;
let api_name = "inquiries";

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
          prop: "attributes.company",
          label: "会社名",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.name",
          label: "お名前",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.status",
          label: "既読",
          type: "select",
          options: [
            {
              type: "danger",
              text: "未読",
            },
            {
              type: "success",
              text: "既読",
            },
          ],
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.createdAt",
          type: "datetime",
          label: "問い合わせ日時",
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
        tableData = res.data.data.filter((e) => {
          return e.attributes.status == 1;
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
