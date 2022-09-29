<template>
  <ContainerComponent
      page_name="会費未納状況表(支部ごと)"
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
      tableColumns: [
        {
          prop: "id",
          label: "整理番号",
          minWidth: 50,
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
          prop: "goukei",
          label: "合計",
          minWidth: 100,
        },
      ],
      tableData: [
        {
          id: "",
          name: "",
          ichi: "84，000",
          ni: "84, 000",
          san: "",
          goukei: "168, 000"
        },
        {
          id: "",
          name: "",
          ichi: "",
          ni: "84, 000",
          san: "",
          goukei: "84, 000"
        },
        {
          id: "",
          name: "",
          ichi: "",
          ni: "84, 000",
          san: "",
          goukei: "84, 000"
        },
        {
          id: "",
          name: "",
          ichi: "60，000",
          ni: "60, 000",
          san: "",
          goukei: "120, 000"
        },
      ],
      totalTabData: [
        {
          item: "合計",
          ichi: {
            no: "2名",
            amound: "144,000",
          },
          ni: {
            no: "4名",
            amound: "312,000",
          },
          san: {
            no: "0名",
            amound: "",
          },
          goukei: {
            no: "0名",
            amound: "456,000",
          }
        }
      ],
      totalTableColumn: [
        {
          label: "項目",
          prop: "item",
        },
        {
          label: "令和元年度",
          children: [
            {
              prop: "ichi.no",
              label: "名"
            },
            {
              prop: "ichi.amound",
              label: "金額"
            },
          ],
        },
        {
          label: "令和2年度",
          children: [
            {
              prop: "ni.no",
              label: "名"
            },
            {
              prop: "ni.amound",
              label: "金額"
            },
          ],
        },
        {
          label: "令和3年度",
          children: [
            {
              prop: "san.no",
              label: "名"
            },
            {
              prop: "san.amound",
              label: "金額"
            },
          ],
        },
        {
          label: "合計",
          children: [
            {
              prop: "goukei.no",
              label: "名"
            },
            {
              prop: "goukei.amound",
              label: "金額"
            },
          ],
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
  }
};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
