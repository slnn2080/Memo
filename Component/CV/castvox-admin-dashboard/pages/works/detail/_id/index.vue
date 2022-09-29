<template>
  <master_detail
    page_name="お仕事依頼詳細"
    api_name="works"
    :head="header"
    :form="form"
    :meta="meta"
  />
</template>
<script>
import Master_detail from "~/components/layouts/custom/master_detail";
const url = process.env.apiUrl;
let api_name = "works";

export default {
  layout: "DashboardLayout",
  components: {
    Master_detail,
  },
  data: function () {
    return {
      header: [
        {
          name: "依頼元ID",
          props: "member_id",
          type: "account_link", // todo account/deital/{member_id} にlink
          is_readonly: true,
        },
        {
          name: "基本情報",
          props: [
            {
              title: "案件名",
              props: "name",
            },
            {
              title: "場所",
              props: "place",
            },
            {
              title: "予算(円)",
              props: "budget",
            },
          ],
          type: "group_text",
          is_readonly: true,
        },
        {
          name: "開始日",
          props: "start_at",
          type: "datetime",
          is_readonly: true,
        },
        {
          name: "終了日",
          props: "end_at",
          type: "datetime",
          is_readonly: true,
        },
        {
          name: "稼働日数",
          props: "working_days",
          type: "text",
          is_readonly: true,
        },
        {
          name: "種別",
          props: "work_type",
          type: "select",
          is_readonly: true,
          options: [
            {
              type: "info",
              text: "不明",
            },
            {
              type: "info",
              text: "TV",
            },
            {
              type: "info",
              text: "ラジオ",
            },
            {
              type: "info",
              text: "イベント",
            },
            {
              type: "info",
              text: "WEB",
            },
            {
              type: "info",
              text: "その他",
            },
          ],
        },
        {
          name: "依頼状況",
          props: "status",
          type: "select",
          is_readonly: false,
          options: [
            {
              type: "info",
              text: "不明",
            },
            {
              type: "info",
              text: "確定",
            },
            {
              type: "info",
              text: "提案",
            },
            {
              type: "info",
              text: "その他",
            },
          ],
        },
        {
          name: "エンドクライアント名",
          props: "client",
          type: "text",
          is_readonly: true,
        },
        {
          name: "使用媒体",
          props: "medium",
          type: "text",
          is_readonly: true,
        },
        {
          name: "オーディションの有無",
          props: "audition",
          type: "select",
          is_readonly: true,
          options: [
            {
              type: "info",
              text: "不明",
            },
            {
              type: "info",
              text: "なし",
            },
            {
              type: "info",
              text: "あり",
            },
          ],
        },
        {
          name: "競合の有無",
          props: "conflict",
          type: "select",
          is_readonly: true,
          options: [
            {
              type: "info",
              text: "不明",
            },
            {
              type: "info",
              text: "なし",
            },
            {
              type: "info",
              text: "あり",
            },
          ],
        },
        {
          name: "参考URL",
          props: "ref_url",
          type: "link",
          is_readonly: true,
        },
        {
          name: "添付ファイル",
          props: "upload_file_name",
          type: "download",
          sub_type: "btn",
          is_readonly: true,
          options: "upload_file",
        },
        {
          name: "依頼キャスト",
          props: "cast_id",
          type: "casts",
          is_readonly: true,
        },
        {
          name: "稼働内容",
          props: "work_description_m",
          type: "multiline",
          is_readonly: true,
        },
        {
          name: "自由入力欄",
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
        return {
          form: res.data.data.attributes,
          id: ctx.params.id,
          meta: res.data.data.meta,
        };
      } else {
        return {
          form: {
            name: "",
            slug: "",
            work_type: 0,
            audition: 0,
            conflict: 0,
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
