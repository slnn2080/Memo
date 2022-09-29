<template>
  <master_detail
    page_name="FAQ登録"
    api_name="faqs"
    :head="header"
    :form="form"
  />
</template>
<script>
import Master_detail from "../../../../../components/layouts/custom/master_detail";
const url = process.env.apiUrl;
let api_name = "faqs";

export default {
  layout: "DashboardLayout",
  components: {
    Master_detail,
  },
  data: function () {
    return {
      header: [
        {
          name: "質問",
          props: "question_m",
          type: "text",
          is_readonly: false,
        },
        {
          name: "質問種類",
          props: "question_type",
          type: "select",
          is_readonly: false,
        },
        {
          name: "表示優先度",
          props: "priority",
          type: "text",
          is_readonly: false,
        },
        {
          name: "回答",
          props: "answer_m",
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
