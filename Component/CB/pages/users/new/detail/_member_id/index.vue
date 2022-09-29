<template>
  <div>
    <UserDetail :is_edit="false" :submits="submits" />
    <Modal :show="is_message_box">
      <div>この申請を却下しますか？</div>
      <base-button
        type="button"
        class="btn btn-secondary"
        native-type="submit"
        :disabled="false"
        @click="on_cancel"
      >
        キャンセル
      </base-button>
      <base-button
        type="button"
        class="btn btn-danger"
        native-type="submit"
        :disabled="false"
        @click="on_reject"
      >
        却下
      </base-button>
    </Modal>
  </div>
</template>
<script>
import { BaseButton, Modal } from "@/components/argon-core";
import UserDetail from "@/components/user/detail";
const url = process.env.apiUrl;

export default {
  layout: "DashboardLayout",
  auth: false,
  components: {
    BaseButton,
    UserDetail,
    Modal,
  },
  data() {
    return {
      member_id: 1,
      select_type: 0,
      is_message_box: false,
      reject_content: [],
    };
  },
  created() {
    this.member_id = this.$route.params["member_id"];
    this.submits = [
      {
        func: () => this._on_approval(),
        text: "承認",
        type: "primary",
      },
      {
        func: () => this._on_reject(),
        text: "却下",
        type: "danger",
      },
      {
        func: () => this._on_hold(),
        text: "保留",
        type: "secondary",
      },
    ];

    this.post;
  },
  fetch() {
    this._call_get_api();
  },
  methods: {
    _on_approval() {
      this.$nuxt.$emit("user_detail_callback", (content) =>
        this._approval(content)
      );
    },
    _on_reject() {
      this.$nuxt.$emit("user_detail_callback", (content) =>
        this._reject(content)
      );
    },
    _on_hold() {
      this.$router.push("/users/new");
    },
    _approval(content) {
      this._call_register_api(content);
    },
    _reject(content) {
      this.is_message_box = true;
      this.reject_content = content;
    },
    // pooup キャンセル選択
    on_cancel() {
      this.is_message_box = false;
      this.reject_content = {};
    },
    // pooup 却下選択
    on_reject() {
      this.reject_content.status = 2; // 2: 非承認 todo 直値やめる
      this._call_post_api(this.reject_content);
    },
    _call_post_api(content) {
      const api_url = url + "/members/" + this.member_id;
      this.$axios
        .$patch(api_url, {
          data: {
            type: "members",
            id: "" + this.member_id,
            attributes: content,
          },
        })
        .then(() => this.$router.push("/users/new"));
    },
    _call_register_api(content) {
      const api_url = url + "/register";
      this.$axios
        .$post(api_url, {
          data: {
            type: "users",
            attributes: {
              name: content.first_name + content.last_name,
              email: content.email[0],
              // emailのユニークキー制約外せない場合のテスト用
              // email: content.email[0] + new Date(),
              member_id: this.member_id,
              status: 3, // todo 直値 3:承認済
            },
          },
        })
        .then(() => this.$router.push("/users/new"));
    },
    _call_get_api() {
      const api_url = url + "/members/" + this.member_id;
      this.$axios.$get(api_url).then((response) => {
        const content = response.data.attributes;
        content.status = {
          name: this.$castvox.approval_name(content.status),
          value: content.status,
        };

        this.$nuxt.$emit("user_detail_update", content);
      });
    },
  },
};
</script>
