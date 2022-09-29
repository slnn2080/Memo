<template>
  <master_list
    page_name="公開特集"
    api_name="blogs"
    :total_data="total"
    :head="tableColumns"
    :data="tableData"
    :hide_delete="false"
    :hide_create="false"
    edit_to="/blogs/detail"
  />
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import Master_list from "~/components/layouts/custom/master_list";
const url = process.env.apiUrl;
let api_name = "blogs";

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
          prop: "attributes.img_path",
          label: "ヘッド画像",
          type: "image",
          minWidth: 100,
          sortable: false,
        },
        {
          prop: "attributes.title",
          label: "名前",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.status",
          type: "select",
          label: "公開状態",
          options: [
            {
              type: "info",
              text: "不明",
            },
            {
              type: "info",
              text: "非公開",
            },
            {
              type: "success",
              text: "公開",
            },
          ],
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.createdAt",
          type: "date",
          label: "登録日",
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
          return e.attributes.status == 2;
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
