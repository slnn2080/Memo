<template>
  <div>
    <Card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
      <template slot="header">
        <h3 class="mb-0">新規アカウント</h3>
        <p class="text-sm mb-0"></p>
      </template>
      <div>
        <div
          class="
            col-12
            d-flex
            justify-content-center justify-content-sm-between
            flex-wrap
          "
        >
          <UserList />
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { Card } from "element-ui";
import UserList from "@/components/user/list";
const url = process.env.apiUrl;

export default {
  layout: "DashboardLayout",
  auth: false,
  components: {
    Card,
    UserList,
  },
  data() {
    return {
      statuses: [],
    };
  },
  created() {
    this.$nuxt.$on("user_list_select_record", this._on_user_list_select_record);

    this._call_api();
  },
  fetch() {
    console.log("fetch");
  },
  methods: {
    _call_api() {
      // todo API 呼び出し方
      // todo API 直接MEMBERSではなく、USERSから取得するべきでは(?) -> Yesならリレーション修正してもらう
      const api_url = url + "/members";
      this.$axios.$get(api_url).then((response) => {
        const content = response.data.map((data) => {
          const result = data.attributes;
          result["id"] = data.id;
          // todo status入れてもらう
          result.status = {
            name: this.$castvox.approval_name(result.status),
            value: result.status,
          };
          return result;
        });

        // UserListコンポーネントに通知
        this.$nuxt.$emit("user_list_update", content);
      });
    },
    _on_user_list_select_record(member_id) {
      this.$router.push("/users/new/detail/" + member_id);
    },
  },
};
</script>
