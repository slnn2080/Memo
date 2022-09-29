<template>
  <master_detail
    :page_name="updateBtn ? '管理ユーザー登録' : '管理ユーザー確認'"
    api_name="users"
    :head="header"
    :form="form"
    emit_submit="regsiter_submit"
    :updateBtn="updateBtn"
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
  computed: {
    updateBtn() {
      if (this.$route.params && this.$route.params.id) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    this.checkIsReadonly();
    this.$nuxt.$once("regsiter_submit", (e) => {
      this.onceRegsiterSubmit(e);
    });
  },
  destroyed() {
    this.$nuxt.$off("regsiter_submit");
  },
  methods: {
    checkIsReadonly() {
      if (this.$route.params && this.$route.params.id) {
        return true;
      } else {
        return false;
      }
    },
    onceRegsiterSubmit(e) {
      try {
        const valid = this.validation(e);
        if (!valid) {
          this.register(e);
        } else {
          this.$toast.error(valid);
          throw valid;
        }
      } catch (err) {
        console.log(err);
        this.$nuxt.$once("regsiter_submit", (e) => {
          this.onceRegsiterSubmit(e);
        });
      }
    },
    validation(e) {
      if (!e.name) return "名前の項目を正しく入れてください";
      if (!e.email) return "メールアドレスの項目を正しく入れてください";
      if (!e.password && !e.password_confirmation)
        return "パスワードの項目を正しく入れてください";
      if (!(e.password === e.password_confirmation))
        return "パスワードとパスワード(確認用)が違います";

      const regex = /^(?=.*?[a-z])(?=.*?\d)(?=.*?[\/\*\+\.,!\?#$%&~\|\^@;:\(\)\[\]\{\}\-_])[!-~]{7,63}[0-9a-zA-Z\/\*\+\.,!\?#$%&~\|\^@;:\(\)\[\]\{\}\-_]$/i; // eslint-disable-line
      if (!e.password.match(regex)) {
        return "パスワードのフォーマットが違います。パスワードルールをご確認ください。";
      }

      return null;
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
          is_readonly: this.checkIsReadonly(),
        },
        {
          name: "Email",
          props: "email",
          type: "email",
          is_readonly: this.checkIsReadonly(),
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
