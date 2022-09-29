<template>
  <master_detail
    page_name="キャスト一覧アップロード"
    :head="header"
    :hide_btnArea="false"
  />
</template>
<script>
import Master_detail from "~/components/layouts/custom/master_detail";
const url = process.env.apiUrl;

export default {
  layout: "DashboardLayout",
  components: {
    Master_detail,
  },
  data: function () {
    return {
      header: [
        {
          name: "",
          props: [],
          type: "upload",
          is_readonly: false,
        },
      ],
    };
  },
};
</script>

<style>
.card-wrapper {
  position: relative;
  top: 100px;
}
</style>
