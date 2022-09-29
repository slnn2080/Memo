<template>
  <master_detail
    :page_name="
      pageTitle ? `連絡先アカウント編集(id=${this.id})` : `連絡先アカウント登録`
    "
    api_name="members"
    :head="header"
    :form="data.data.attributes"
    :emit_submit="`submit`"
    :controlShow="true"
  />
</template>
<script>
import Master_detail from "~/components/layouts/custom/master_detail";
const url = process.env.apiUrl;
const api_name = "members";
const group_api_name = "group_infos";

const call_get_api = async (ctx) => {
  const is_edit = !!(ctx.query && ctx.query.edit_id);

  let group_info_task = new Promise((resolve) => {
    // 新規追加時のパラメータ
    resolve({
      data: {
        data: {
          type: "group_infos",
          attributes: {
            member_id: ctx.params.id, // 胴元のアカウントのmember_id
            email: "", // 追加するメールアドレス(要unique)(現在members.accountsの情報)
            name: "", // 追加する名前(現在members.accountsの情報)
            phone_number: "", // 追加する電話番号(現在members.accountsの情報)
            plan_id: 0, // 胴元アカウントのプラン(利用中のプランでアカウント追加可能かチェックする)
          },
        },
      },
    });
  });

  if (is_edit) {
    // 編集ならgroupのAPIコールする
    group_info_task = ctx.$axios.get(
      `${url}/${group_api_name}/${ctx.query.edit_id}`
    );
  }

  const responses = await Promise.all([
    group_info_task,
    ctx.$axios.get(`${url}/${api_name}/${ctx.params.id}`),
  ]);
  responses[0].data.data.attributes.plan_id =
    responses[1].data.data.attributes.plan_id;

  return {
    geroup_info: responses[0],
    member: responses[1],
    is_edit: is_edit,
  };
};

export default {
  layout: "DashboardLayout",
  components: {
    Master_detail,
  },
  data: function () {
    return {
      form: {},
      data: {},
      is_edit: false,
      header: [
        {
          name: "名前",
          props: "name",
          type: "text",
          is_readonly: false,
        },
        {
          name: "電話番号",
          props: "phone_number",
          type: "text",
          is_readonly: false,
        },
        {
          name: "メールアドレス",
          props: "email",
          type: "text",
          is_readonly: false,
        },
      ],
    };
  },
  computed: {
    pageTitle() {
      if (this.$route.query && this.$route.query.edit_id) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async onceSubmit() {
      try {
        if (this.is_edit) {
          await this.$axios.patch(
            `${url}/${group_api_name}/${this.data.data.id}`,
            this.data
          );
        } else {
          await this.$axios.post(`${url}/${group_api_name}`, this.data);
        }
        this.$toast.success(`更新が完了しました`);
        this.$router.back();
      } catch (e) {
        console.error(e);
        this.$nuxt.$once("submit", () => {
          this.onceSubmit();
        });
      }
    },
  },
  created() {
    this.$nuxt.$once("submit", () => {
      this.onceSubmit();
    });
  },
  destroyed() {
    this.$nuxt.$off("submit");
  },
  async asyncData(ctx) {
    try {
      if (ctx.params && ctx.params.id) {
        const response = await call_get_api(ctx);
        return {
          data: response.geroup_info.data,
          id: ctx.params.id,
          is_edit: response.is_edit,
        };
      } else {
        //idなしは認めないので戻す
        ctx.$toast.error("不正なアクセス");
        ctx.router.back();
        return {
          form: {
            name: "",
            email: "",
            tel: "",
          },
          data: null,
          id: ctx.params.id,
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
