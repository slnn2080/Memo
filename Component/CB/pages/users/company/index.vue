<template>
  <Card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
    <template slot="header">
      <h3 class="mb-0">契約企業</h3>
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
      content: [],
      statuses: [],
    };
  },
  created() {
    this.$nuxt.$on("user_list_select_record", this._on_user_list_select_record);

    this._call_api({});
  },
  fetch() {
    console.log("fetch");
  },
  methods: {
    _call_api(options) {
      // todo API 呼び出し方
      // todo API 直接MEMBERSではなく、USERSから取得するべきでは(?) -> Yesならリレーション修正してもらう

      const api_url = url + "/members";
      this.$axios.$get(api_url).then((response) => {
        const content = response.data.map((data) => {
          const result = data.attributes;
          result["id"] = data.id;
          // todo status入れてもらう
          result["status"] = {
            name: "未承認",
            value: 1,
          };
          return result;
        });

        // UserListコンポーネントに通知
        this.$nuxt.$emit("user_list_update", content);
      });
    },
    _on_user_list_select_record(member_id) {
      this.$router.push("/users/company/detail/" + member_id);
    },
  },
};
</script>
