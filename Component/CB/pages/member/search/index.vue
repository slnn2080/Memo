<template>
<!--
// Search
    searchData: データ
    btn_type_read: Boolean -- 「さらに読み込み　閉じる」　ボタン
    btn_type_search: Boolean -- 「検索」　ボタン
    btn_type_reset: Boolean -- 「リセット　検索」ボタン


// UploadComponent
    アップロードコンポーネント


// InfoTable
    テーブルコンポーネント
    1級テーブル
      tableData
      tableColumn
      hasCheck -- checkbox列が表示する

    2級テーブル
      showSubTab: Boolean -- 2級テーブルの表示を制御
      subTableData
      subTableColumn

    3級テーブル
      totalTab: Boolean -- 3級テーブルの表示を制御
      totalTabData
      totalTableColumn
-->
  <ContainerComponent
    page_name="会員検索"
    :hide_header_search="true"
    :hide_search="false"
    :total_data="total"
    :hide_pagination="true"
  >
    <Search :searchData="searchData" :btn_type_read="true"></Search>
    <UploadComponent></UploadComponent>
    <div class="search-group">
      <h3 class="mb-0">検索結果</h3>
      <div>
        <el-button type="primary" size="small">メールを発送</el-button>
        <el-button type="primary" size="small">検索条件を保存</el-button>
        <el-button type="primary" size="small">Excel出力</el-button>
      </div>
    </div>
    <InfoTable :tableData="tableData" :tableColumn="tableColumns" :hasCheck="true">
    </InfoTable>
  </ContainerComponent>
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import ContainerComponent from "../../../components/layouts/custom/ContainerComponent";
import InfoTable from "../../../components/layouts/custom/InfoTable";
import Search from "../../../components/layouts/custom/Search";
import UploadComponent from "../../../components/layouts/custom/UploadComponent";
const url = process.env.apiUrl;

export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  components: {
    Search,
    ContainerComponent,
    UploadComponent,
    InfoTable,
  },
  data() {
    return {
      searchData: [
        {
          title: "会員名漢字",
          type: "input",
          flag: "1",
          prop: "usernameKanji",
        },
        {
          title: "会員名かな",
          type: "input",
          flag: "2",
          prop: "usernameKana",
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
          title: "電話番号",
          type: "input",
          flag: "5",
          prop: "telNo",
        },
        {
          title: "FAX",
          type: "input",
          flag: "6",
          prop: "fax",
        },
        {
          title: "メールアドレス",
          type: "input",
          flag: "7",
          prop: "mail",
        },
        {
          title: "日付",
          type: "date",
          flag: "8",
          prop: "date",
        },
        {
          title: "会員種別（1）",
          type: "select",
          flag: "9",
          prop: "category1",
          option: [
            {
              title: "全会員",
              value: "1",
            },
            {
              title: "開業（個人）",
              value: "2",
            },
            {
              title: "開業（法人）",
              value: "3",
            },
            {
              title: "非開業（勤務）",
              value: "4",
            },
            {
              title: "非開業（その他）",
              value: "5",
            },
            {
              title: "退会",
              value: "6",
            },
            {
              title: "死亡退会",
              value: "7",
            },
            {
              title: "登録抹消",
              value: "8",
            },
          ],
        },
        {
          title: "会員種別（2）",
          type: "select",
          flag: "10",
          prop: "category2",
          option: [
            {
              title: "全会員",
              value: "1",
            },
            {
              title: "現会員",
              value: "2",
            },
            {
              title: "新規会員",
              value: "3",
            },
          ],
        },
      ],
      tableColumns: [
        {
          prop: "id",
          label: "ID",
          minWidth: 50,
          sortable: true,
        },
        {
          prop: "attributes.company",
          label: "会社名",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.name",
          label: "お名前",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.status",
          label: "既読",
          type: "select",
          options: [
            {
              type: "danger",
              text: "未読",
            },
            {
              type: "success",
              text: "既読",
            },
          ],
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "attributes.createdAt",
          type: "datetime",
          label: "問い合わせ日時",
          minWidth: 100,
          sortable: true,
        },
      ],
      tableData: []
    }
  },
  computed: {
    total() {
      return this.tableData.length
    }
  },
};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}

.search-group {
  padding: 1.25rem 1.5rem;
  display: flex;
  margin:24px 0px;
  justify-content: space-between;
  align-items: center;
}
</style>
