<template>
  <div>
    <UserDetail :is_edit="is_edit" :submits="submits" />
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
      is_edit: false,
      member_id: 1,
      select_type: 0,
      is_message_box: false,
      submit_buttons: [],
      submits: [],
    };
  },
  created() {
    this.member_id = this.$route.params["member_id"];
    this.submit_buttons = [
      {
        func: () => this._on_edit(),
        text: "編集",
        type: "primary",
      },
      {
        func: () => this._on_register(),
        text: "登録",
        type: "danger",
      },
    ];
    this._set_submits();
  },
  fetch() {
    this._call_get_api();
  },
  methods: {
    _on_edit() {
      this.is_edit = !this.is_edit;
      this._set_submits();
    },
    _set_submits() {
      if (this.is_edit) {
        this.submits = [this.submit_buttons[1]];
      } else {
        this.submits = [this.submit_buttons[0]];
      }
    },
    _on_register() {
      this.$nuxt.$emit("user_detail_callback", (content) =>
        this._register(content)
      );
    },
    _register(content) {
      this._call_post_api(content);
    },
    _call_post_api(content) {
      const api_url = url + "/members";
      this.$axios
        .$post(api_url, {
          data: {
            type: "members",
            attributes: content,
          },
        })
        .then(() => this.$router.push("/users/company"));
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
