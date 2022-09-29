<template>
  <master_detail
    page_name="FAQ見出し編集"
    api_name="faq_categories"
    :head="header"
    :form="form"
  />
</template>
<script>
import Master_detail from "~/components/layouts/custom/master_detail";
const url = process.env.apiUrl;
let api_name = "faq_categories";

export default {
  layout: "DashboardLayout",
  components: {
    Master_detail,
  },
  data: function () {
    return {
      header: [
        {
          name: "見出し",
          props: "name",
          type: "text",
          is_readonly: false,
        },
        {
          name: "表示優先順度",
          props: "priority",
          type: "number",
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
            priority: 1,
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
