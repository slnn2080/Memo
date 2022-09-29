<template>
  <ContainerComponent
    page_name="元帳一覧"
    :header_selector_data="headerSelectData"
    @categoryChange="categoryChange"
    :hide_header_search="false"
    :hide_import="false"
    :hide_export="false"
    :hide_save="false"
  >
    <Search :searchData="searchData" :searchColumn="6" :btn_type_reset="true"></Search>
    <InfoTable :tableData="tableData" :tableColumn="tableColumns">
  </ContainerComponent>
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import ContainerComponent from "../../../components/layouts/custom/ContainerComponent";
import Search from "../../../components/layouts/custom/Search";
import InfoTable from "../../../components/layouts/custom/InfoTable";

const url = process.env.apiUrl;

export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  components: {
    ContainerComponent,
    Search,
    InfoTable
  },
  data() {
    return {
      selectedData: {},
      tableData: [
        {
          date:"2021.04.01",
          shibu:"",
          code:"16",
          digest:"手数料",
          aite:"123",
          karikatakamoku:"手数料",
          karikatakinkaku:"103",
          kashikatakamoku:"",
          kashikatakingaku:"",
          jiyou:"",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"",
          code:"16",
          digest:"手数料",
          aite:"132",
          karikatakamoku:"手数料",
          karikatakinkaku:"103",
          kashikatakamoku:"",
          kashikatakingaku:"",
          jiyou:"",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"千",
          code:"",
          digest:"",
          aite:"132",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"未収入金",
          kashikatakingaku:"84,000",
          jiyou:"R02",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"千",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"登録手数料収入",
          kashikatakingaku:"5,000",
          jiyou:"特定証票交付",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"千",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"登録手数料収入",
          kashikatakingaku:"5,000",
          jiyou:"特定証票交付",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"船",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"入会金収入",
          kashikatakingaku:"30,000",
          jiyou:"R34、東京会より移入会　入会",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"船",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"会費収入",
          kashikatakingaku:"84,000",
          jiyou:"4月　入会　会費",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"船",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"政会費収入",
          kashikatakingaku:"9,600",
          jiyou:"4月　入会　改会費",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"千",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"登録手数料収入",
          kashikatakingaku:"5,000",
          jiyou:"特定証票交付",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"千",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"登録手数料収入",
          kashikatakingaku:"5,000",
          jiyou:"特定証票交付",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"千",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"登録手数料収入",
          kashikatakingaku:"5,000",
          jiyou:"特定証票交付",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"千",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"登録手数料収入",
          kashikatakingaku:"30,000",
          jiyou:"4月　入会　登録手数料",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"千",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"入会金収入",
          kashikatakingaku:"80,000",
          jiyou:"4月　入会　入会金",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"千",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"会費収入",
          kashikatakingaku:"60,000",
          jiyou:"4月　入会　会費",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"千",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"入会金収入",
          kashikatakingaku:"50,000",
          jiyou:"R34、東京会より移入会　入会",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"千",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"会費収入",
          kashikatakingaku:"60,000",
          jiyou:"4月　入会　会費",
          bikou:"",
          tennki:"",
        },
        {
          date:"2021.04.01",
          shibu:"千",
          code:"",
          digest:"",
          aite:"324",
          karikatakamoku:"",
          karikatakinkaku:"",
          kashikatakamoku:"入会金収入",
          kashikatakingaku:"80,000",
          jiyou:"5月　入会　入会金",
          bikou:"",
          tennki:"",
        },
      ],
      tableColumns: [
        {
          prop: "date",
          label: "日付",
          sortable: true,
          minWidth: 130,
        },
        {
          prop: "shibu",
          label: "支部",
          sortable: true,
          minWidth: 100,
        },
        {
          prop: "code",
          label: "コード",
          sortable: true,
          minWidth: 130,
        },
        {
          prop: "digest",
          label: "摘要",
          sortable: true,
          minWidth: 100,
        },
        {
          prop: "aite",
          label: "相手",
          sortable: true,
          minWidth: 100,
        },
        {
          prop: "karikatakamoku",
          label: "借方科目",
          sortable: true,
          minWidth: 130,
        },
        {
          prop: "karikatakinkaku",
          label: "借方金額",
          sortable: true,
          minWidth: 130,
        },
        {
          prop: "kashikatakamoku",
          label: "貸方科目",
          sortable: true,
          minWidth: 130,
        },
        {
          prop: "kashikatakingaku",
          label: "貸方金額",
          sortable: true,
          minWidth: 130,
        },
        {
          label: "入金事由",
          prop: "jiyou",
          sortable: true,
          minWidth: 130,
        },
        {
          label: "備考",
          prop: "bikou",
          sortable: true,
          minWidth: 100,
        },
        {
          label: "台帳転記",
          prop: "tennki",
          sortable: true,
          minWidth: 130,
        },
      ],
      searchData: [
        {
          title: "日付",
          type: "date",
          flag: "1",
          prop: "date",
        },
        {
          title: "支部",
          type: "input",
          flag: "2",
          prop: "shibu",
        },
        {
          title: "コード",
          type: "input",
          flag: "3",
          prop: "code",
        },
        {
          title: "摘要",
          type: "input",
          flag: "4",
          prop: "digest",
        },
        {
          title: "相手科目",
          type: "input",
          flag: "5",
          prop: "aitekamoku",
        },
        {
          title: "借方科目",
          type: "input",
          flag: "6",
          prop: "karikatakamoku",
        },

        {
          title: "借方金額",
          type: "input",
          flag: "7",
          prop: "karikatakinkaku",
        },
        {
          title: "貸方科目",
          type: "input",
          flag: "8",
          prop: "kashikatakamoku",
        },
        {
          title: "貸方金額",
          type: "input",
          flag: "9",
          prop: "kashikatakingaku",
        },
        {
          title: "入金事由",
          type: "input",
          flag: "10",
          prop: "jiyou",
        },
        {
          title: "備考",
          type: "input",
          flag: "11",
          prop: "bikou",
        },
        {
          title: "台帳転記",
          type: "input",
          flag: "12",
          prop: "tennki",
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
  },
  methods: {
    categoryChange(selectedObj) {
      this.selectedData = selectedObj
    }
  },
};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
