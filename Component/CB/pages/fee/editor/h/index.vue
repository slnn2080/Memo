<template>
  <ContainerComponent
      page_name="各集金データ"
      :header_selector_data="headerSelectData"
      :hide_header_search="false"
      :hide_export="false"
  >
    <InfoTable
        :tableData="tableData"
        :tableColumn="tableColumns"
        :totalTab="true"
        :totalTabData="totalTabData"
        :totalTableColumn="totalTableColumn"
    ></InfoTable>
  </ContainerComponent>

</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import ContainerComponent from "../../../../components/layouts/custom/ContainerComponent";
import InfoTable from "../../../../components/layouts/custom/InfoTable";
import EditorTable from "../../../../components/layouts/custom/EditorTable";

const url = process.env.apiUrl;

export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  components: {
    ContainerComponent,
    InfoTable,
    EditorTable
  },
  data() {
    return {
      tableData: [
        {
          date:"4/19",
          shibu:"東",
          digest:"",
          aites:"132",
          syunyu:"",
          misyu:"5,000",
          kingaku:"805,000"
        },
        {
          date:"4/20",
          shibu:"千",
          digest:"",
          aites:"132",
          syunyu:"",
          misyu:"50,000",
          kingaku:"855,000"
        },
        {
          date:"4/20",
          shibu:"東",
          digest:"",
          aites:"132",
          syunyu:"",
          misyu:"80,000",
          kingaku:"1,105,000"
        },
      ],
      tableColumns: [
        {
          prop: "date",
          label: "日付",
          minWidth: 50,
          sortable: true,
        },
        {
          prop: "shibu",
          label: "支部",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "digest",
          label: "摘要",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "aites",
          label: "相手",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "syunyu",
          label: "収入",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "misyu",
          label: "未収",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "kingaku",
          label: "金額",
          minWidth: 100,
          sortable: true,
        },

      ],
      totalTabData: [
        {
          sum: "今月分振替合計",
          syunyu: "0",
          misyu: "1,105,000",
          kingaku: "1,105,000"
        },
        {
          sum: "前月分までの合計",
          syunyu: "0",
          misyu: "0",
          kingaku: "0"
        },
        {
          sum: "総合計(次月繰返金額)",
          syunyu: "0",
          misyu: "0",
          kingaku: "1,105,000"
        },
      ],
      totalTableColumn: [
        {
          label: "項目",
          prop: "sum",
          minWidth: 150
        },
        {
          label: "収入",
          prop: "syunyu"
        },
        {
          label: "未収",
          prop: "misyu"
        },
        {
          label: "金額",
          prop: "kingaku"
        },
      ],
      headerSelectData: [
        {
          title: "データ",
          prop: "money",
          options: [
            {
              label: "入会金収入",
              value: "0",
            },
            {
              label: "登録手数料収入",
              value: "1",
            },
            {
              label: "会費収入",
              value: "2",
            },
            {
              label: "頒布品収入",
              value: "3",
            },
            {
              label: "未収入金",
              value: "4",
            },
            {
              label: "前受金",
              value: "5",
            },
            {
              label: "政連 会費収入",
              value: "6",
            },
            {
              label: "政連 未収入金",
              value: "7",
            },
            {
              label: "政連 前受金",
              value: "8",
            },
            {
              label: "郵便局（労）",
              value: "9",
            },
            {
              label: "郵便局（政）",
              value: "10",
            },
          ],
        },
      ],
    }
  }
};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
