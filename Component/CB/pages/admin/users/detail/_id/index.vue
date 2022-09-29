<template>
  <master_detail
    page_name="管理ユーザー登録"
    api_name="users"
    :head="header"
    :form="form"
    emit_submit="regsiter_submit"
  />
</template>
<script>
import Master_detail from "~/components/layouts/custom/master_detail";
const url = process.env.apiUrl;
let api_name = "users";

export default {
  layout: "DashboardLayout",
  components: {
    Master_detail,
  },
  created() {
    this.$nuxt.$on("regsiter_submit", (e) => {
      if (this.validation(e)) {
        this.register(e);
      } else {
        this.$toast.error("全ての入力項目を正しく入れてください");
      }
    });
  },
  methods: {
    validation(e) {
      if (!e.name) {
        return false;
      }
      if (!e.email) return false;
      if (!e.password && !e.password_confirmation) return false;
      if (!(e.password == e.password_confirmation)) return false;
      //todo パスワードチェック
      return true;
    },
    async register(e) {
      try {
        await this.$axios.$post(`${url}/users`, {
          data: {
            type: "users",
            attributes: e,
            /*
            relationships: {
              roles: {
                data: [
                  {
                    type: "roles",
                    id: 1, //adminロール
                  },
                ],
              },
            },
            */
          },
        });
        this.$router.back();
      } catch {
        console.error(e);
      }
    },
  },
  data: function () {
    return {
      header: [
        {
          name: "名前",
          props: "name",
          type: "text",
          is_readonly: false,
        },
        {
          name: "Email",
          props: "email",
          type: "email",
          is_readonly: false,
        },
        {
          name: "パスワード変更",
          notice:
            "パスワードを変更したい場合はパスワードリセットボタンを押してください",
          props: "email",
          type: "password_reset",
          is_readonly: false,
          is_hidden_new: true,
        },
        {
          name: "パスワード登録",
          notice: "パスワードを入力してください。",
          props: ["password", "password_confirmation"],
          type: "password",
          is_readonly: false,
          is_hidden_edit: true,
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
            email: "",
            password: "",
            password_confirmation: "",
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
