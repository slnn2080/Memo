<template>
  <master_detail
    page_name="アカウント確認"
    api_name="members"
    :head="header"
    :form="form"
  />
</template>
<script>
import Master_detail from "~/components/layouts/custom/master_detail";
const url = process.env.apiUrl;
let api_name = "members";

export default {
  layout: "DashboardLayout",
  components: {
    Master_detail,
  },
  data: function () {
    return {
      header: [
        {
          name: "企業情報",
          props: [
            {
              title: "企業名",
              props: "company_name",
            },
          ],
          type: "group_text",
          is_readonly: true,
        },
        {
          name: "名前",
          props: [
            {
              props: "last_name",
              title: "性",
            },
            {
              props: "first_name",
              title: "名",
            },
          ],
          type: "group_text",
          is_readonly: true,
        },
        {
          name: "住所",
          props: [
            {
              props: "zip_code",
              title: "郵便番号",
            },
            {
              props: "prefecture",
              title: "都道府県",
            },
            {
              title: "市区町村",
              props: "city",
            },
            {
              title: "番地",
              props: "address",
            },
            {
              title: "建物名",
              props: "building_name",
            },
          ],
          type: "group_text",
          is_readonly: true,
        },
        {
          name: "連絡先",
          props: [
            {
              title: "電話番号",
              props: "phone_number",
            },
            {
              title: "メールアドレス",
              props: "email",
            },
          ],
          type: "group_text",
          is_readonly: true,
        },
        {
          name: "承認状況",
          props: "status",
          type: "select",
          is_readonly: false,
          options: [
            {
              type: "info",
              text: "承認前",
            },
            {
              type: "info",
              text: "未承認",
            },
            {
              type: "danger",
              text: "却下",
            },
            {
              type: "success",
              text: "承認",
            },
          ],
        },
        {
          name: "契約種別",
          props: "category",
          type: "select",
          is_readonly: true,
          options: [
            {
              type: "info",
              text: "法人",
            },
            {
              type: "info",
              text: "個人",
            },
          ],
        },
        {
          name: "プラン",
          props: "plan",
          type: "text",
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
            category: 1,
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
