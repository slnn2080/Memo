<template>
  <ContainerComponent
      page_name="月分計表"
      :header_selector_data="headerSelectData"
      :hide_header_search="false"
      :hide_export="false"
  >
    <InfoTable :tableData="tableData" :tableColumn="tableColumns">
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
          prop: "year",
          label: "科目",
          minWidth: 150,
        },
        {
          label: "132 ゆうちょ銀行",
          children: [
            {
              prop: "youcyo.in",
              label: "支出",
              minWidth: 110,
            },
            {
              prop: "youcyo.out",
              label: "収入",
              minWidth: 110
            },
          ]
        },
        {
          label: "131 千葉銀行",
          children: [
            {
              prop: "chiba.in",
              label: "支出",
              minWidth: 110,
            },
            {
              prop: "chiba.out",
              label: "収入",
              minWidth: 110
            },
          ]
        },
        {
          label: "134 京葉銀行",
          children: [
            {
              prop: "kyou.in",
              label: "支出",
              minWidth: 110,
            },
            {
              prop: "kyou.out",
              label: "収入",
              minWidth: 110
            },
          ]
        },
        {
          label: "133 千葉興業銀行",
          children: [
            {
              prop: "chibamaru.in",
              label: "支出",
              minWidth: 110,
            },
            {
              prop: "chibamaru.out",
              label: "収入",
              minWidth: 110
            },
          ]
        },
        {
          label: "133 現金",
          children: [
            {
              prop: "genkin.in",
              label: "支出",
              minWidth: 110,
            },
            {
              prop: "genkin.out",
              label: "収入",
              minWidth: 110
            },
          ]
        },
        {
          label: "135 千葉銀行",
          children: [
            {
              prop: "chiba2.in",
              label: "支出",
              minWidth: 110,
            },
            {
              prop: "chiba2.out",
              label: "収入",
              minWidth: 110
            },
          ]
        },
      ],

      tableData: [
        {
          year: "入会金収入",
          youcyo: {
            in: "",
            out: "330,000"
          },
          chiba: {
            in: "",
            out: "550,000"
          },
          kyou: {
            in: "",
            out: "0"
          },
          chibamaru: {
            in: "",
            out: "0"
          },
          genkin: {
            in: "",
            out: "80,000"
          },
          chiba2: {
            in: "",
            out: "0"
          },
        },
        {
          year: "会費収入",
          youcyo: {
            in: "",
            out: "11,331,000"
          },
          chiba: {
            in: "",
            out: "3,006,000"
          },
          kyou: {
            in: "",
            out: "672,000"
          },
          chibamaru: {
            in: "",
            out: "402,000"
          },
          genkin: {
            in: "",
            out: "77,000"
          },
          chiba2: {
            in: "",
            out: "0"
          },
        },
        {
          year: "講習会収入",
          youcyo: {
            in: "",
            out: "0"
          },
          chiba: {
            in: "",
            out: "0"
          },
          kyou: {
            in: "",
            out: "0"
          },
          chibamaru: {
            in: "",
            out: "0"
          },
          genkin: {
            in: "",
            out: "0"
          },
          chiba2: {
            in: "",
            out: "0"
          },
        },
        {
          year: "雑収入",
          youcyo: {
            in: "",
            out: "0"
          },
          chiba: {
            in: "",
            out: "0"
          },
          kyou: {
            in: "",
            out: "0"
          },
          chibamaru: {
            in: "",
            out: "0"
          },
          genkin: {
            in: "",
            out: "0"
          },
          chiba2: {
            in: "",
            out: "0"
          },
        },
        {
          year: "頒布品収入",
          youcyo: {
            in: "",
            out: "0"
          },
          chiba: {
            in: "",
            out: "0"
          },
          kyou: {
            in: "",
            out: "0"
          },
          chibamaru: {
            in: "",
            out: "0"
          },
          genkin: {
            in: "",
            out: "15,610"
          },
          chiba2: {
            in: "",
            out: "40,890"
          },
        },
        {
          year: "登録手数料収入",
          youcyo: {
            in: "",
            out: "99,000"
          },
          chiba: {
            in: "",
            out: "1,000"
          },
          kyou: {
            in: "",
            out: "0"
          },
          chibamaru: {
            in: "",
            out: "0"
          },
          genkin: {
            in: "",
            out: "34,000"
          },
          chiba2: {
            in: "",
            out: "0"
          },
        },

      ],
      headerSelectData: [
        {
          title: "会",
          prop: "company",
          options: [
            {
              label: "労務士会",
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
