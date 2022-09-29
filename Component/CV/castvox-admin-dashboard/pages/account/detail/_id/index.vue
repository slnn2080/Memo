<template>
  <master_detail
    page_name="アカウント確認"
    api_name="register"
    emit_submit="on_account_new_submit"
    :head_button="head_button"
    :head="header"
    :form="form"
    :options="{ plans: plans }"
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
      head_button: [
        {
          type: "primary",
          emit: "show_account",
          title: "連絡先アカウント確認",
        },
      ],
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
          name: "現在の契約属性",
          props: "role",
          type: "select",
          is_readonly: true,
          options: [
            {
              type: "info",
              text: "不明",
            },
            {
              type: "info",
              text: "クライアント",
            },
            {
              type: "info",
              text: "プロダクション",
            },
            {
              type: "success",
              text: "プロダクション+クライアント",
            },
          ],
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
          props: "plan_id",
          type: "relation_select",
          is_readonly: true,
          options: {
            key: "plans",
            index: "name",
          },
        },
      ],
    };
  },
  created() {
    this.$nuxt.$once("on_account_new_submit", (form) => {
      this.on_account_new_submit(form);
    });
    this.$nuxt.$once("show_account", () => {
      this.$router.push({ path: `/account/list_account/${this.id}` });
    });
  },
  destroyed() {
    this.$nuxt.$off("on_account_new_submit");
    this.$nuxt.$off("show_account");
  },
  async asyncData(ctx) {
    try {
      if (ctx.params && ctx.params.id) {
        let res = await ctx.$axios.get(`${url}/${api_name}/${ctx.params.id}`);
        let plans = await ctx.$axios.get(`${url}/plans`);

        return {
          form: res.data.data.attributes,
          id: ctx.params.id,
          plans: plans.data.data,
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
  methods: {
    async on_account_new_submit(form) {
      //      console.log(form);
      try {
        await this.$axios.$post(`${url}/register`, {
          data: {
            type: "users",
            attributes: {
              name: form.last_name + form.first_name,
              email: form.email,
              member_id: this.id,
              status: form.status,
            },
          },
        });

        this.$nuxt.$off("on_account_new_submit");
        await this.$router.back();
      } catch (e) {
        console.log(e);
        //エラー時はもう一度
        this.$nuxt.$once("on_account_new_submit", (form) =>
          this.on_account_new_submit(form)
        );
      }
    },
  },
};
</script>

<style>
.card-wrapper {
  position: relative;
  top: 100px;
}
</style>
