<template>
  <ContainerComponent
      page_name="未納会費集計表"
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
      headerSelectData: [
        {
          title: "会",
          prop: "company",
          options: [
            {
              label: "労務士会",
              value: "0",
            },
            // {
            //   label: "政治連盟",
            //   value: "1",
            // },
          ],
        },
      ],
      tableColumns: [
        {
          prop: "item",
          label: "年度",
          minWidth: 90,
        },
        {
          label: "千葉",
          children: [
            {
              prop: "chiba.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "chiba.amount",
              label: "金額",
              minWidth: 110
            },
          ]
        },
        {
          label: "船橋",
          children: [
            {
              prop: "funahashi.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "funahashi.amount",
              label: "金額",
              minWidth: 110
            },
          ]
        },
        {
          label: "東葛",
          children: [
            {
              prop: "higashi.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "higashi.amount",
              label: "金額",
              minWidth: 110
            },
          ]
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
          label: "回収額",
          children: [
            {
              prop: "kaisyu.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "kaisyu.amount",
              label: "金額",
              minWidth: 110
            },
          ]
        },
        {
          label: "免除・放棄",
          children: [
            {
              prop: "menjyo.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "menjyo.amount",
              label: "金額",
              minWidth: 110
            },
          ]
        },
        {
          label: "残額",
          children: [
            {
              prop: "zangaku.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "zangaku.amount",
              label: "金額",
              minWidth: 110
            },
          ]
        },
      ],
      tableData: [
        {
          item: "0",
          chiba: {
            no: "",
            amount: ""
          },
          funahashi: {
            no: "1",
            amount: "84,000"
          },
          higashi: {
            no: "",
            amount: ""
          },
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
          kaisyu: {
            no: "",
            amount: ""
          },
          menjyo: {
            no: "",
            amount: ""
          },
          zangaku: {
            no: "1",
            amount: "84,000"
          },
        },
        {
          item: "0",
          chiba: {
            no: "",
            amount: ""
          },
          funahashi: {
            no: "2",
            amount: "99,000"
          },
          higashi: {
            no: "",
            amount: ""
          },
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
          kaisyu: {
            no: "",
            amount: ""
          },
          menjyo: {
            no: "",
            amount: ""
          },
          zangaku: {
            no: "3",
            amount: "188,000"
          },
        },
        {
          item: "0",
          chiba: {
            no: "",
            amount: ""
          },
          funahashi: {
            no: "2",
            amount: "144,000"
          },
          higashi: {
            no: "1",
            amount: "44,000"
          },
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
            amount: "188,000"
          },
          kaisyu: {
            no: "",
            amount: ""
          },
          menjyo: {
            no: "",
            amount: ""
          },
          zangaku: {
            no: "3",
            amount: "188,000"
          },
        },
        {
          item: "0",
          chiba: {
            no: "2",
            amount: "144,000"
          },
          funahashi: {
            no: "4",
            amount: "312,000"
          },
          higashi: {
            no: "5",
            amount: "324,000"
          },
          moku: {
            no: "",
            amount: ""
          },
          kita: {
            no: "",
            amount: ""
          },
          nedo: {
            no: "11",
            amount: "780,000"
          },
          kaisyu: {
            no: "2",
            amount: "168,000"
          },
          menjyo: {
            no: "",
            amount: ""
          },
          zangaku: {
            no: "9",
            amount: "612,000"
          },
        },
        {
          item: "0",
          chiba: {
            no: "",
            amount: ""
          },
          funahashi: {
            no: "",
            amount: ""
          },
          higashi: {
            no: "",
            amount: ""
          },
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
          kaisyu: {
            no: "",
            amount: ""
          },
          menjyo: {
            no: "",
            amount: ""
          },
          zangaku: {
            no: "",
            amount: ""
          },
        },
        {
          item: "合計",
          chiba: {
            no: "2",
            amount: "144,000"
          },
          funahashi: {
            no: "9",
            amount: "638,000"
          },
          higashi: {
            no: "6",
            amount: "368,000"
          },
          moku: {
            no: "0",
            amount: "0"
          },
          kita: {
            no: "0",
            amount: "0"
          },
          nedo: {
            no: "17",
            amount: "1,151,000"
          },
          kaisyu: {
            no: "2",
            amount: "168,000"
          },
          menjyo: {
            no: "0",
            amount: "0"
          },
          zangaku: {
            no: "15",
            amount: "963,000"
          },
        },
      ],
      subTableData: [
        {
          item: "退会者",
          nedo: {
            no: "10",
            amound: "644,000"
          },
          kaisyu: {
            no: "0",
            amound: "0"
          },
          menjyo: {
            no: "0",
            amound: "0"
          },
          zangaku: {
            no: "10",
            amound: "644,000"
          },
        },
        {
          item: "総計",
          nedo: {
            no: "27",
            amound: "1,795,000"
          },
          kaisyu: {
            no: "2",
            amound: "168,000"
          },
          menjyo: {
            no: "0",
            amound: "0"
          },
          zangaku: {
            no: "25",
            amound: "1,627,000"
          },
        },
      ],
      subTableColumn: [
        {
          prop: "item",
          label: "項目",
          minWidth: 90,
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
              prop: "nedo.amound",
              label: "金額",
              minWidth: 110,
            },
          ],
        },
        {
          label: "回収額",
          children: [
            {
              prop: "kaisyu.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "kaisyu.amound",
              label: "金額",
              minWidth: 110,
            },
          ],
        },
        {
          label: "免除・放棄",
          children: [
            {
              prop: "menjyo.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "menjyo.amound",
              label: "金額",
              minWidth: 110,
            },
          ],
        },
        {
          label: "残額",
          children: [
            {
              prop: "zangaku.no",
              label: "名",
              minWidth: 70,
            },
            {
              prop: "zangaku.amound",
              label: "金額",
              minWidth: 110,
            },
          ],
        },
      ]
    }
  }
};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
