<template>
  <ContainerComponent
      page_name="未納会費財務欠損分 状況表(会全体)"
      :header_selector_data="headerSelectData"
      :hide_header_search="false"
      :hide_export="false"
  >
    <InfoTable
        :tableData="tableData"
        :tableColumn="tableColumns"
        :subTableData="subTableData"
        :subTableColumn="subTableColumn"
        :showSubTab="true"
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
      // MerageCell: [
      //   {
      //     columnLabel: "年度",
      //     rowIndex: 2,
      //     merage: [1, 2]
      //   },
      //   {
      //     columnLabel: "年度",
      //     rowIndex: 3,
      //     merage: [1, 2]
      //   }
      // ],
      tableColumns: [
        {
          prop: "year",
          label: "年度",
          minWidth: 150,
        },
        {
          label: "木更津",
          children: [
            {
              prop: "moku.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "moku.amount",
              label: "金額",
              minWidth: 110
            },
          ]
        },
        {
          label: "北総",
          children: [
            {
              prop: "kita.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "kita.amount",
              label: "金額",
              minWidth: 110
            },
          ]
        },
        {
          label: "年度別計",
          children: [
            {
              prop: "nedo.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "nedo.amount",
              label: "金額",
              minWidth: 110
            },
          ]
        },
        {
          label: "退会者",
          children: [
            {
              prop: "taikai.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "taikai.amount",
              label: "金額",
              minWidth: 110
            },
          ]
        }
      ],
      tableData: [
        {
          year: "26年度",
          moku: {
            no: "",
            amount: ""
          },
          kita: {
            no: "",
            amount: ""
          },
          nedo: {
            no: "",
            amount: ""
          },
          taikai: {
            no: "1",
            amount: "60,000"
          }
        },
        {
          year: "27年度",
          moku: {
            no: "",
            amount: ""
          },
          kita: {
            no: "",
            amount: ""
          },
          nedo: {
            no: "",
            amount: ""
          },
          taikai: {
            no: "1",
            amount: "60,000"
          }
        },
        {
          year: "28年度",
          moku: {
            no: "",
            amount: ""
          },
          kita: {
            no: "",
            amount: ""
          },
          nedo: {
            no: "",
            amount: ""
          },
          taikai: {
            no: "1",
            amount: "60,000"
          }
        },
        {
          year: "29年度",
          moku: {
            no: "",
            amount: ""
          },
          kita: {
            no: "",
            amount: ""
          },
          nedo: {
            no: "1",
            amount: "84,000"
          },
          taikai: {
            no: "1",
            amount: "60,000"
          }
        },
        {
          year: "30年度",
          moku: {
            no: "",
            amount: ""
          },
          kita: {
            no: "",
            amount: ""
          },
          nedo: {
            no: "2",
            amount: "99,000"
          },
          taikai: {
            no: "2",
            amount: "144,000"
          }
        },
        {
          year: "令和元年度",
          moku: {
            no: "",
            amount: ""
          },
          kita: {
            no: "",
            amount: ""
          },
          nedo: {
            no: "",
            amount: ""
          },
          taikai: {
            no: "2",
            amount: "144,000"
          }
        },
        {
          year: "令和2年度",
          moku: {
            no: "",
            amount: ""
          },
          kita: {
            no: "",
            amount: ""
          },
          nedo: {
            no: "",
            amount: ""
          },
          taikai: {
            no: "2",
            amount: "116,000"
          }
        },
        {
          year: "令和3年度",
          moku: {
            no: "",
            amount: ""
          },
          kita: {
            no: "",
            amount: ""
          },
          nedo: {
            no: "",
            amount: ""
          },
          taikai: {
            no: "",
            amount: ""
          }
        },
        {
          type: 1,
          year: "合計",
          moku: {
            no: "",
            amount: ""
          },
          kita: {
            no: "",
            amount: ""
          },
          nedo: {
            no: "3",
            amount: "183,000"
          },
          taikai: {
            no: "10",
            amount: "644,000"
          }
        },
        {
          type: 1,
          year: "合計",
          moku: {
            no: "",
            amount: ""
          },
          kita: {
            no: "",
            amount: ""
          },
          nedo: {
            no: "2",
            amount: "183,000"
          },
          taikai: {
            no: "2",
            amount: "644,000"
          }
        },
      ],
      subTableData: [
        {
          item: "現存・退会者 総合計",
          nedo: {
            no: "4名",
            amound: "827,000"
          }
        },
      ],
      subTableColumn: [
        {
          prop: "item",
          label: "項目",
          minWidth: 90,
        },
        {
          label: "退会者",
          children: [
            {
              prop: "nedo.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "nedo.amound",
              label: "金額",
              minWidth: 110,
            },
          ],
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
