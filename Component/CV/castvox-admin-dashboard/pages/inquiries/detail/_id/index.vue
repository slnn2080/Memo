<template>
  <master_detail
    page_name="お問い合わせ編集"
    api_name="inquiries"
    :head="header"
    :form="form"
  />
</template>
<script>
import Master_detail from "~/components/layouts/custom/master_detail";
const url = process.env.apiUrl;
let api_name = "inquiries";

export default {
  layout: "DashboardLayout",
  components: {
    Master_detail,
  },
  data: function () {
    return {
      header: [
        {
          name: "問い合わせ種別",
          props: "inquiry_type",
          type: "select",
          is_readonly: true,
          options: [
            {
              type: "info",
              text: "不明",
            },
            {
              type: "info",
              text: "キャスティングについて",
            },
            {
              type: "info",
              text: "登録について",
            },
            {
              type: "info",
              text: "その他",
            },
          ],
        },
        {
          name: "添付ファイル",
          props: "upload_file_name",
          type: "download",
          is_readonly: true,
          options: "upload_file",
        },
        {
          name: "お問い合わせ内容",
          props: "body_m",
          type: "multiline",
          is_readonly: true,
        },
        {
          name: "お客さまの情報",
          props: [
            {
              title: "名前",
              props: "name",
            },
            {
              title: "会社名",
              props: "company",
            },
          ],
          type: "group_text",
          is_readonly: true,
        },
        {
          name: "メールアドレス",
          props: "mail_address",
          type: "email",
          is_readonly: true,
        },
        {
          name: "電話番号",
          props: "phone_number",
          type: "tel",
          is_readonly: true,
        },
        {
          name: "既読チェック",
          props: "status",
          type: "select",
          notice: "既読にしたい場合は「既読」を選択して更新してください",
          is_readonly: false,
          options: [
            {
              type: "danger",
              text: "未読  ",
            },
            {
              type: "success",
              text: "既読  ",
            },
          ],
        },
        {
          name: "登録日時",
          props: "createdAt",
          type: "datetime",
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
        };
      } else {
        return {
          form: {
            name: "",
            slug: "",
            inquiry_type: 3,
            status: 0,
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
