<template>
  <div>
    <master_detail
      page_name="ポリシー登録"
      api_name="policies"
      :head="header"
      :form="form"
      v-on:input="handleData"
    />
  </div>
</template>
<script>
import Master_detail from "../../../../../components/layouts/custom/master_detail";
const url = process.env.apiUrl;
let api_name = "policies";

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
          props: "title",
          type: "text",
          is_readonly: false,
        },
        {
          name: "本文",
          props: "body_m",
          type: "html",
          is_readonly: false,
        },
      ],
      temp: null,
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
