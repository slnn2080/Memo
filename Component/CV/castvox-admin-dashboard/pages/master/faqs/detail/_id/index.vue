<template>
  <master_detail
    page_name="FAQ登録"
    api_name="faqs"
    :head="header"
    :form="form"
    :options="{ categories: categories }"
  />
</template>
<script>
import Master_detail from "~/components/layouts/custom/master_detail";
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
          props: "category_id",
          notice: "質問種類を選択してください",
          type: "relation_select",
          is_readonly: false,
          options: {
            key: "categories",
            index: "name",
          },
        },
        {
          name: "表示優先度",
          props: "priority",
          type: "number",
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
      let categories = await ctx.$axios.get(`${url}/faq_categories`);
      if (ctx.params && ctx.params.id) {
        let res = await ctx.$axios.get(`${url}/${api_name}/${ctx.params.id}`);
        return {
          form: res.data.data.attributes,
          id: ctx.params.id,
          categories: categories.data.data,
        };
      } else {
        return {
          form: {
            question_m: "",
            answer_m: "",
            category_id: 1,
            priority: 1,
            question_type: 0,
          },
          categories: categories.data.data,
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
