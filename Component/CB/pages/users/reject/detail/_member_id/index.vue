<template>
  <div>
    <UserDetail :is_edit="false" :submits="submits" />
  </div>
</template>
<script>
import UserDetail from "@/components/user/detail";
const url = process.env.apiUrl;

export default {
  layout: "DashboardLayout",
  auth: false,
  components: {
    UserDetail,
  },
  data() {
    return {
      member_id: 1,
      select_type: 0,
      is_message_box: false,
      submits: [],
    };
  },
  created() {
    this.member_id = this.$route.params["member_id"];
  },
  fetch() {
    this._call_get_api();
  },
  methods: {
    _call_post_api(content) {
      console.log("post");
      console.log(content);
      // todo POST API call
      const api_url = url + "/members";
      this.$axios
        .$post(api_url, content)
        .then(() => this.$router.push("/users/reject"));
    },
    _call_get_api() {
      const api_url = url + "/members/" + this.member_id;
      this.$axios.$get(api_url).then((response) => {
        const content = response.data.attributes;
        // todo statusサーバからもらう
        content.status = {
          name: "未承認",
          value: 1,
        };

        this.$nuxt.$emit("user_detail_update", content);
      });
    },
  },
};
</script>
