<template>
  <master_detail
    page_name="プラン登録"
    api_name="plans"
    :head="header"
    :form="form"
  />
</template>
<script>
import Master_detail from "~/components/layouts/custom/master_detail";
const url = process.env.apiUrl;
let api_name = "plans";

export default {
  layout: "DashboardLayout",
  components: {
    Master_detail,
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
