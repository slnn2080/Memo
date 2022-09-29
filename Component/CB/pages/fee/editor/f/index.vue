<template>
  <ContainerComponent
      page_name="未納会費財務欠損分 状況表(支部ごと)"
      :header_selector_data="headerSelectData"
      :hide_header_search="false"
      :hide_export="false"
  >
    <InfoTable
        :tableData="tableData"
        :tableColumn="tableColumns"
        :MerageCellRow="MerageCell"
    >
  </ContainerComponent>
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import ContainerComponent from "../../../../components/layouts/custom/ContainerComponent";
import InfoTable from "../../../../components/layouts/custom/InfoTable";

const url = process.env.apiUrl;

export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  components: {
    ContainerComponent,
    InfoTable
  },
  data() {
    return {
      MerageCell: [
        {
          columnLabel: "整理番号",
          rowIndex: 2,
          merage: [1, 2]
        },
        {
          columnLabel: "整理番号",
          rowIndex: 3,
          merage: [1, 2]
        }
      ],
      tableColumns: [
        {
          prop: "id",
          label: "整理番号",
          minWidth: 100,
        },
        {
          prop: "name",
          label: "氏名",
          minWidth: 100,
        },
        {
          prop: "ichi",
          label: "令和元年度",
          minWidth: 100,
        },
        {
          prop: "ni",
          label: "令和2年度",
          minWidth: 100,
        },
        {
          prop: "san",
          label: "令和3年度",
          minWidth: 100,
        },
        {
          prop: "shi",
          label: "令和4年度",
          minWidth: 100,
        },
        {
          prop: "go",
          label: "令和5年度",
          minWidth: 100,
        },
        {
          prop: "roku",
          label: "令和6年度",
          minWidth: 100,
        },
        {
          prop: "nana",
          label: "令和7年度",
          minWidth: 100,
        },
      ],
      tableData: [
        {
          id: "0",
          name: "0",
          ichi: "0",
          ni: "0",
          san: "0",
          shi: "0",
          go: "0",
          roku: "0",
          nana: "0"
        },
        {
          id: "0",
          name: "0",
          ichi: "0",
          ni: "0",
          san: "0",
          shi: "0",
          go: "0",
          roku: "0",
          nana: "0"
        },
        {
          id: "合計(人数)",
          name: "",
          ichi: "0名",
          ni: "0名",
          san: "0名",
          shi: "0名",
          go: "0名",
          roku: "0名",
          nana: "0名"
        },
        {
          id: "合計(金額)",
          name: "",
          ichi: "",
          ni: "",
          san: "",
          shi: "",
          go: "",
          roku: "",
          nana: ""
        },
      ],
      headerSelectData: [
        {
          title: "支部",
          prop: "shibu",
          options: [
            {
              label: "千葉",
              value: "0",
            },
          ],
        },
      ],
    }
  },
};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
