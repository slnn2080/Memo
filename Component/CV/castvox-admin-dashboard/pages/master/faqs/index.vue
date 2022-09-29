<template>
  <master_list
    page_name="FAQ"
    api_name="faqs"
    :total_data="total"
    :head="tableColumns"
    :data="tableData"
    :select_category="category"
    :default_sort="{ prop: 'attributes.priority' }"
  />
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import Master_list from "../../../components/layouts/custom/master_list";
const url = process.env.apiUrl;
let api_name = "faqs";

export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  components: {
    Master_list,
  },
  computed: {
    categories() {
      return this.category;
    },
  },
  data() {
    return {
      category: [
        {
          text: "不明",
          type: "info",
        },
      ],
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
          prop: "attributes.question_m",
          label: "質問",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.category_id",
          label: "質問種類",
          type: "select_category",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.priority",
          label: "表示優先度",
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
  methods: {
    get_category() {
      return this.category;
    },
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
      let category = [
        {
          text: "不明",
          type: "info",
        },
      ];
      const category_url = `${url}/faq_categories`;
      await ctx.$axios.get(category_url).then((res) => {
        if (res.data.data) {
          res.data.data.forEach((e) => {
            category.push({
              type: "info",
              id: e.id,
              text: e.attributes.name,
            });
          });
        }
      });
      return {
        tableData: tableData,
        total: tableData.length,
        category: category,
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
