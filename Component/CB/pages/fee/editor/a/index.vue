<template>
  <ContainerComponent
      page_name="未収・欠損リスト"
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
      tableData:[
        {
          no: "5",
          number: "123456",
          name: "田中太郎",
          status: "未収",
          kaikei: "224,000",
          misyu: "140,000",
          keson: "84,000"
        },
        {
          no: "4",
          number: "123456",
          name: "田中一郎",
          status: "未収",
          kaikei: "60,000",
          misyu: "80,000",
          keson: "0"
        },
        {
          no: "3",
          number: "123456",
          name: "田中二郎",
          status: "未収",
          kaikei: "226,000",
          misyu: "168,000",
          keson: "168,000"
        },
        {
          no: "2",
          number: "123456",
          name: "田中三郎",
          status: "未収",
          kaikei: "84,000",
          misyu: "84,000",
          keson: "0"
        },
        {
          no: "1",
          number: "123456",
          name: "田中四郎",
          status: "未収",
          kaikei: "84,000",
          misyu: "84,000",
          keson: "0"
        },
      ],
      tableColumns: [
        {
          prop: "no",
          label: "No",
          minWidth: 50,
          sortable: true,
        },
        {
          prop: "number",
          label: "会員番号",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "name",
          label: "氏名",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "status",
          label: "状態",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "kaikei",
          label: "会計",
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
          prop: "keson",
          label: "欠損",
          minWidth: 100,
          sortable: true,
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
