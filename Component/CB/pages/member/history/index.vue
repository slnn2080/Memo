<template>
  <ContainerComponent
    page_name="履歴"
  >

<!--
  searchColumn:
    一行24に分けて、1つ「input」がいくつか占める
    6でしたら、１行に4つ input　があります
 -->
    <Search
        :searchData="searchData"
        :btn_type_search="true"
        :searchColumn="6"
    >
    </Search>
    <InfoTable
        :tableData="tableData"
        :tableColumn="tableColumns"
        :hasCheck="true"
    ></InfoTable>
  </ContainerComponent>
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import ContainerComponent from "../../../components/layouts/custom/ContainerComponent";
import InfoTable from "../../../components/layouts/custom/InfoTable";
import Search from "../../../components/layouts/custom/Search";
import Mock from "mockjs";

Mock.mock("http://localhost:3200/user_list", {
  "list|7-10": [
    {
      name: '田中太郎',
      date: "@date('yyyy-MM-dd')",
      point: '〇〇が〇〇に〇〇を変更',
    }
  ]
})

const url = process.env.apiUrl;

export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  components: {
    ContainerComponent,
    InfoTable,
    Search
  },
  data() {
    return {
      tableColumns:[
        {
          prop: "name",
          label: "年度",
          minWidth: 100,
          sortable: true,
          type: "link"
        },
        {
          prop: "date",
          label: "変更日",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "point",
          label: "変更点",
          minWidth: 100,
          sortable: true,
        },
      ],
      searchData: [
        {
          title: "会員名漢字",
          type: "input",
          flag: "1",
          prop: "usernameKanji",
        },
        {
          title: "登録番号",
          type: "input",
          flag: "3",
          prop: "registerNo",
        },
        {
          title: "支部コード",
          type: "input",
          flag: "4",
          prop: "shibuCode",
        },
        {
          title: "日付",
          type: "date",
          flag: "8",
          prop: "date",
        },
      ],
    }
  },
  async asyncData(ctx) {
    let {data: ret} = await ctx.$axios.get("http://localhost:3200/user_list")

    return {
      tableData: ret.list
    }
  },
};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}

</style>
