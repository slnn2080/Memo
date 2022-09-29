<template>
  <!--

// ContainerComponentコンポーネント:
    三つ部分を分けてます。
    1 header部分は[ドロップダウンメニュー、検索、編集、メール作成、ラベル印刷、インポート、エクスポート]などのボタンを含めてます
    2 カスタム部分　この部分<slot></slot>があって、他のコンポーネントを挿入してください
        hide_import: Boolean -- excelインポート　ボタン
        hide_search: Boolean -- ドロップダウンメニュー
        hide_mail_label: Boolean -- 編集 メール作成 ラベル印刷　ボタン
        hide_export: Boolean -- Excelエクスポート　ボタン
        hide_save: Boolean -- 保存 ボタン
    3 footer部分は pagination 機能があります

// ContainerComponent　プロパティ
    header_selector_data:
      ドロップダウンメニューのデータ、このデータによってHTML構造を動的に作ります
    ＠categoryChange:
      ContainerComponentコンポーネントの中ドロップダウンメニューを変化すると、選択したデータを今のindex.vueに渡します


// NewRegisterTest:
    registerData: Array -- データ
    hide_reading: Boolean -- 「さらに読み込み　と　閉じる」ボタン
    hide_save: Boolean -- 「保存」ボタン
   -->
  <ContainerComponent
    page_name="会員登録"
    :header_selector_data="headerSelectData"
    @categoryChange="categoryChange"
    :hide_header_search="false"
    :hide_import="false"
    importBtn="success"
  >
    <NewRegisterTest :registerData="registerData"></NewRegisterTest>
  </ContainerComponent>
</template>

<script>
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import ContainerComponent from "../../../components/layouts/custom/ContainerComponent";
import NewRegister from "../../../components/layouts/custom/NewRegister";
import NewRegisterTest from "../../../components/layouts/custom/NewRegister";


// 仮データ
import Mock from "mockjs";
import {nanoid} from "nanoid"

Mock.mock("http://localhost:3200/data", {
  "list|5-10": [
    {
      flag: /[a-z]{3,5}[A-Z]{3,5}[0-9]{3,5}/,
      "title|+1": ["基本情報", "登録情報", "事務所等情報", "連絡先", "資格情報", "政治連盟", "その他", "口座情報", "交通費", "自宅"],
      "options|3-5": [
        {
          id: /[a-z]{3,5}[A-Z]{3,5}[0-9]{3,5}/,
          "subTitle|+1": ["登録番号", "氏名", "フリガナ", "生年月日", "性別", "支部", "種別", "変更年月日", "入会年月日", "登録年月日"],
          type: "input",
          prop: /[\u0041-\u005a]{5}/,
        }
      ],
    }
  ]
})

const url = process.env.apiUrl;

export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  components: {
    ContainerComponent,
    NewRegister,
    NewRegisterTest
  },
  computed: {
    registerData() {
      let {role, category} = this.selectData
      switch (category) {
        case "1":
          return this.registerList
        break
        case "2":
          return this.requestList
        break
        default:
          return this.registerList
      }
    }
  },
  async asyncData(ctx) {
    let {data: res} = await ctx.$axios.get("http://localhost:3200/data")
    return {
      requestList: res.list
    }
  },
  data() {
    return {
      headerSelectData: [
        {
          title: "役割",
          prop: "role",
          options: [
            {
              label: "一般会員",
              value: "0",
            },
          ],
        },
        {
          title: "会員種別",
          prop: "category",
          options: [
            {
              label: "個人",
              value: "1",
            },
            {
              label: "法人",
              value: "2",
            },
          ],
        },
      ],
      registerList: [
        {
          title: "基本情報",
          flag: nanoid(),
          options: [
            {
              id: nanoid(),
              subTitle: "登録番号",
              type: "input",
              prop: "usernameNo",
            },
            {
              id: nanoid(),
              subTitle: "氏名",
              type: "input",
              prop: "username",
            },
            {
              id: nanoid(),
              subTitle: "フリガナ",
              type: "input",
              prop: "usernameKana",
            },
            {
              id: nanoid(),
              subTitle: "生年月日",
              type: "input",
              prop: "birthday",
            },
            {
              id: nanoid(),
              subTitle: "性別",
              type: "input",
              prop: "gender",
            },
          ],
        },
        {
          title: "登録情報",
          flag: nanoid(),
          options: [
            {
              id: nanoid(),
              subTitle: "支部",
              type: "input",
              prop: "shibu",
            },
            {
              id: nanoid(),
              subTitle: "種別",
              type: "input",
              prop: "syubetu",
            },
            {
              id: nanoid(),
              subTitle: "会員番号",
              type: "input",
              prop: "kaiinno",
            },
            {
              id: nanoid(),
              subTitle: "整理番号",
              type: "input",
              prop: "seirino",
            },
            {
              id: nanoid(),
              subTitle: "コード",
              type: "input",
              prop: "code",
            },
            {
              id: nanoid(),
              subTitle: "登録年月日",
              type: "input",
              prop: "registerDate",
            },
            {
              id: nanoid(),
              subTitle: "入会年月日",
              type: "input",
              prop: "nyukaiDate",
            },
            {
              id: nanoid(),
              subTitle: "退会年月日",
              type: "input",
              prop: "taikaiDate",
            },
            {
              id: nanoid(),
              subTitle: "変更年月日",
              type: "input",
              prop: "henkouDate",
            },
          ],
        },
        {
          title: "事務所等情報",
          flag: nanoid(),
          children: [
            {
              title: "事務所",
              flag: nanoid(),
              options: [
                {
                  id: nanoid(),
                  subTitle: "名称",
                  type: "input",
                  prop: "companyName",
                },
                {
                  id: nanoid(),
                  subTitle: "郵便番号",
                  type: "input",
                  prop: "zipcode",
                  flag: "code"
                },
                {
                  id: nanoid(),
                  subTitle: "所在地",
                  type: "input",
                  prop: "address",
                },
                {
                  id: nanoid(),
                  subTitle: "電話",
                  type: "input",
                  prop: "tel",
                },
                {
                  id: nanoid(),
                  subTitle: "FAX",
                  type: "input",
                  prop: "fax",
                },
              ]
            },
            {
              title: "連絡先",
              flag: nanoid(),
              options: [
                {
                  id: nanoid(),
                  subTitle: "名称",
                  type: "input",
                  prop: "companyName",
                },
                {
                  id: nanoid(),
                  subTitle: "所在地",
                  type: "input",
                  prop: "address",
                },
                {
                  id: nanoid(),
                  subTitle: "電話",
                  type: "input",
                  prop: "tel",
                },
                {
                  id: nanoid(),
                  subTitle: "FAX",
                  type: "input",
                  prop: "fax",
                },
              ]
            }
          ]
        },
        {
          title: "自宅",
          flag: nanoid(),
          options: [
            {
              id: nanoid(),
              subTitle: "住所1",
              type: "input",
              prop: "address1",
            },
            {
              id: nanoid(),
              subTitle: "住所2",
              type: "input",
              prop: "address2",
            },
            {
              id: nanoid(),
              subTitle: "電話番号",
              type: "input",
              prop: "tel",
            },
            {
              id: nanoid(),
              subTitle: "FAX",
              type: "input",
              prop: "fax",
            },
            {
              id: nanoid(),
              subTitle: "携帯番号",
              type: "input",
              prop: "phone",
            },
          ],
        },
        {
          title: "連絡先",
          flag: nanoid(),
          options: [
            {
              id: nanoid(),
              subTitle: "連絡先（諸通知送付先、自宅または事務所、その他指定住所）",
              type: "input",
              prop: "rerakusaki",
            },
            {
              id: nanoid(),
              subTitle: "メールアドレス",
              type: "input",
              prop: "mailaddress",
            },
          ],
        },
        {
          title: "資格情報",
          flag: nanoid(),
          options: [
            {
              id: nanoid(),
              subTitle: "特定付記（付記年月日）",
              type: "input",
              prop: "tokutei",
            },
            {
              id: nanoid(),
              subTitle: "会員資格（会員権停止）",
              type: "input",
              prop: "shikaku",
            },
            {
              id: nanoid(),
              subTitle: "会費減免（免除期間）",
              type: "input",
              prop: "genmen",
            },
          ],
        },
        {
          title: "政治連盟",
          flag: nanoid(),
          options: [
            {
              id: nanoid(),
              subTitle: "政治連盟入会区分(入会年月日) ",
              type: "input",
              prop: "seiji",
            },
            {
              id: nanoid(),
              subTitle: "選挙区",
              type: "input",
              prop: "senkyo",
            },
          ],
        },
        {
          title: "その他",
          flag: nanoid(),
          options: [
            {
              id: nanoid(),
              subTitle: "ホームページ掲載の可否",
              type: "input",
              prop: "hpkeisai",
            },
            {
              id: nanoid(),
              subTitle: "ホームページ用名簿 氏名・事務所名称 ※外字の場合",
              type: "input",
              prop: "hpmeibo",
            },
            {
              id: nanoid(),
              subTitle: "備考欄1(事務局のみ)変更内容、懲戒、表彰、注意事項等)",
              type: "input",
              prop: "bikou1",
            },
            {
              id: nanoid(),
              subTitle: "備考欄2(支部等共有) ",
              type: "input",
              prop: "bikou2",
            },
            {
              id: nanoid(),
              subTitle: "ラベル出力(送付先を自宅・事務所・その他の選択可) ",
              type: "input",
              prop: "label",
            },
            {
              id: nanoid(),
              subTitle: "メール送信",
              type: "input",
              prop: "send",
            },
          ],
        },
        {
          title: "口座情報",
          flag: nanoid(),
          options: [
            {
              id: nanoid(),
              subTitle: "口座自動引き落とし",
              type: "input",
              prop: "furikoumi",
            },
            {
              id: nanoid(),
              subTitle: "銀行コード",
              type: "input",
              prop: "ginkoucode",
            },
            {
              id: nanoid(),
              subTitle: "支店コード",
              type: "input",
              prop: "shitencode",
            },
            {
              id: nanoid(),
              subTitle: "口座種別",
              type: "input",
              prop: "kouzasyubetu",
            },
            {
              id: nanoid(),
              subTitle: "口座番号",
              type: "input",
              prop: "kouzano",
            },
            {
              id: nanoid(),
              subTitle: "口座名義人カナ",
              type: "input",
              prop: "kouzakana",
            },
            {
              id: nanoid(),
              subTitle: "口座名義人漢字",
              type: "input",
              prop: "kouzakanji",
            },
          ],
        },
        {
          title: "汎用区分",
          flag: nanoid(),
          options: [
            {
              id: nanoid(),
              subTitle: "汎用区分1",
              type: "input",
              prop: "hanyou1",
            },
            {
              id: nanoid(),
              subTitle: "汎用区分2",
              type: "input",
              prop: "hanyou2",
            },
            {
              id: nanoid(),
              subTitle: "汎用区分3",
              type: "input",
              prop: "hanyou3",
            },
          ],
        },
        {
          title: "メール・ホームページ情報",
          flag: nanoid(),
          options: [
            {
              id: nanoid(),
              subTitle: "メールアドレス",
              type: "input",
              prop: "hpmail",
            },
            {
              id: nanoid(),
              subTitle: "URL",
              type: "input",
              prop: "url",
            },
            {
              id: nanoid(),
              subTitle: "メール配信",
              type: "input",
              prop: "mailhaishin",
            },
            {
              id: nanoid(),
              subTitle: "HP特定付記表示",
              type: "input",
              prop: "hphyouji",
            },
            {
              id: nanoid(),
              subTitle: "HP用名簿氏名",
              type: "input",
              prop: "hpmei",
            },
            {
              id: nanoid(),
              subTitle: "HP用名簿名称",
              type: "input",
              prop: "hpsyou",
            },
          ],
        },
        {
          title: "交通費",
          flag: nanoid(),
          options: [
            {
              id: nanoid(),
              subTitle: "変更年月日",
              type: "input",
              prop: "henkoubi",
            },
            {
              id: nanoid(),
              subTitle: "駅名",
              type: "input",
              prop: "eki",
            },
            {
              id: nanoid(),
              subTitle: "バス",
              type: "input",
              prop: "bus",
            },
            {
              id: nanoid(),
              subTitle: "電車",
              type: "input",
              prop: "densya",
            },
          ],
        },
        {
          title: "備考",
          flag: nanoid(),
          options: [
            {
              id: nanoid(),
              subTitle: "備考",
              type: "input",
              prop: "henkoubi",
            }
          ],
        },
      ],
      selectData: {}
    }
  },
  methods: {
    categoryChange(selectObj) {
      console.log(selectObj)
      this.selectData = selectObj
    }
  },

};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
