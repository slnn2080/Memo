<template>
  <master_detail
    page_name="キャスト詳細"
    api_name="casts"
    :head="header"
    :form="form"
    :edit_btn="true"
    @editPush="handlePush"
  />
</template>
<script>
import Master_detail from "~/components/layouts/custom/master_detail";
const url = process.env.apiUrl;
let api_name = "casts";

export default {
  layout: "DashboardLayout",
  scrollToTop: true,

  components: {
    Master_detail,
  },
  methods: {
    handlePush(id) {
      this.$router.push(`/casts/detail_editor/${id}`);
    },
  },
  data: function () {
    return {
      /*
        {
  "sns": [
    "SNS1",
    "SNS２",
    "SNS3",
    "SNS4"
  ],
  "catch_copy": "キャッチコピー9",
  "profile_m": "17才の時に日本からサンディエゴに渡り、カリフォルニアステートL.A校に通う。帰国後、FMのDJを始める。ラジオ、TVナレーション、イベントMC、 CMナレーションなどで活動。",
  "career_m": "■BAYFM 78［COUNT DOWN RADIO］(89/10〜)",
  "regular_m": "■BAYFM 78［COUNT DOWN RADIO］(89/10〜)",
  "advertising_contract_m": null,
  "url": null,
  "comment_m": "ご依頼内容（拘束時間、露出具合、業務分量等）によって異なります。",
  "createdAt": "2021-09-03T01:04:06.000000Z",
  "updatedAt": "2021-09-03T01:04:06.000000Z"
}
         */
      header: [
        {
          name: "おすすめキャスト",
          props: "recommend_flag",
          type: "select",
          is_readonly: true,
          options: [
            {
              type: "disable",
              text: "不明",
            },
            {
              type: "info",
              text: "未設定",
            },
            {
              type: "success",
              text: "設定",
            },
          ],
        },
        {
          name: "名前",
          props: [
            {
              props: "name",
              title: "名前",
            },
            {
              props: "name_kana",
              title: "カナ",
            },
            {
              props: "title",
              title: "肩書き",
            },
          ],
          type: "group_text",
          is_readonly: true,
        },
        {
          name: "登録画像",
          props: "img_path",
          type: "image_array",
          is_readonly: true,
        },
        {
          name: "性別",
          props: "gender",
          type: "select",
          is_readonly: true,
          options: [
            {
              type: "info",
              text: "その他",
            },
            {
              type: "success",
              text: "男性",
            },
            {
              type: "danger",
              text: "女性",
            },
          ],
        },
        {
          name: "基本情報",
          props: [
            {
              props: "birthday",
              title: "誕生日",
            },
            {
              props: "from",
              title: "出身地",
            },
            {
              props: "residence",
              title: "居住地",
            },
            {
              props: "height",
              title: "身長",
            },
            {
              props: "bust",
              title: "バスト",
            },
            {
              props: "waist",
              title: "ウェスト",
            },
            {
              props: "hip",
              title: "ヒップ",
            },
            {
              props: "shoe_size",
              title: "靴サイズ",
            },
          ],
          type: "group_text",
          is_readonly: true,
        },
        {
          name: "最終学歴",
          props: "education",
          type: "text",
          is_readonly: true,
        },
        {
          name: "趣味・特技",
          props: "skill",
          type: "text",
          is_readonly: true,
        },
        {
          name: "語学",
          props: "language",
          type: "language_text",
          is_readonly: true,
        },
        {
          name: "レベル",
          props: "language",
          type: "level_text",
          is_readonly: true,
        },
        {
          name: "資格",
          props: "license",
          type: "text",
          is_readonly: true,
        },
        {
          name: "趣味・特技に関するエピソード",
          props: "skill_episode_m",
          type: "multiline",
          is_readonly: true,
        },
        {
          name: "キャッチコピー",
          props: "catch_copy",
          type: "multiline",
          is_readonly: true,
        },
        {
          name: "プロフィール",
          props: "profile_m",
          type: "multiline",
          is_readonly: true,
        },
        {
          name: "キャリア",
          props: "career_m",
          type: "multiline",
          is_readonly: true,
        },
        {
          name: "レギュラー番組",
          props: "career_m",
          type: "multiline",
          is_readonly: true,
        },
        {
          name: "広告契約",
          props: "advertising_contract_m",
          type: "multiline",
          is_readonly: true,
        },
        {
          name: "参考URL",
          props: "url",
          type: "multiline",
          is_readonly: true,
        },
        {
          name: "自由入力",
          props: "comment_m",
          type: "multiline",
          is_readonly: true,
        },
      ],
    };
  },
  async asyncData(ctx) {
    try {
      if (ctx.params && ctx.params.id) {
        let res = await ctx.$axios.get(`${url}/${api_name}/${ctx.params.id}`);
        let ret = res.data.data.attributes;
        for (let key in ret) {
          if (key == "license" && Array.isArray(ret[key])) {
            ret[key] = ret[key].join(",");
          }

          if (key == "skill" && Array.isArray(ret[key])) {
            ret[key] = ret[key].join(",");
          }

          if (
            key == "language" &&
            Object.prototype.toString.call(ret[key]) == "[object Object]"
          ) {
            if (
              Array.isArray(ret[key].language) &&
              Array.isArray(ret[key].level)
            ) {
              ret[key].language = ret[key].language.join(",");
              ret[key].level = ret[key].level.join(",");
            }
          }
        }
        return {
          form: ret,
          id: ctx.params.id,
        };
      } else {
        return {
          form: {
            name: "",
            slug: "",
            gender: 0,
          },
        };
      }
    } catch (e) {
      // todo エラーハンドリング
      console.log(e);
    }
  },
};
</script>

<style>
.card-wrapper {
  position: relative;
  top: 100px;
}
</style>
