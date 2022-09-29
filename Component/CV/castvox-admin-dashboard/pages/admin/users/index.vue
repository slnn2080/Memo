<template>
  <master_list
    page_name="管理ユーザー"
    api_name="users"
    is_hook_delete="true"
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

const update = async (ctx) => {
  const api_url = `${url}/${api_name}?include=roles&filter[roles]=admin`;
  const res = await ctx.$axios.get(api_url);
  return res.data.data.filter(
    (e) => String(e.relationships.roles.data[0].id) === String(1)
  );
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
          sortMethod: (a, b) => {
            if (Number(a.id) > Number(b.id)) {
              return 1;
            } else {
              return -1;
            }
          },
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
      const tableData = await update(ctx);
      return {
        tableData: tableData,
        total: tableData.length,
      };
    } catch (e) {
      console.log(e);
    }
  },
  created() {
    this.$nuxt.$on("delete_item", async (id) => await this.onDelete(id));
  },
  destroyed() {
    this.$nuxt.$off("delete_item");
  },
  methods: {
    async onDelete(id) {
      const body = {
        data: {
          type: "users",
          id: id,
          attributes: {
            deleted_at: new Date().toISOString(),
          },
        },
      };
      await this.$axios
        .$patch(`${url}/${api_name}/${id}`, body)
        .catch((err_response) => {
          const err_info = err_response.response.data.errors.find(
            (err) => err.status === 0
          );

          if (err_info && err_response.response.status === 500) {
            this.$store.$toast.error("ログイン中のユーザは削除できません", {
              dismissible: false,
            });
            console.log(err_info.title);
          }
        });
      const tableData = await update(this);
      this.tableData = tableData;
      this.total = tableData.length;
    },
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
