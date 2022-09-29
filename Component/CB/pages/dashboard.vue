<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">ダッシュボード</h6>
        </div>
      </div>
    </base-header>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/argon-core/Charts/config";
import LineChart from "@/components/argon-core/Charts/LineChart";
import BarChart from "@/components/argon-core/Charts/BarChart";

// Components
import BaseProgress from "@/components/argon-core/BaseProgress";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/argon-core/Cards/StatsCard";

// Lists
import ActivityFeed from "@/components/pages/dashboard/ActivityFeed.vue";
import TaskList from "@/components/pages/dashboard/TaskList.vue";
import UserList from "@/components/pages/dashboard/UserList.vue";
import ProgressTrackList from "@/components/pages/dashboard/ProgressTrackList.vue";

// Tables
import { Table, TableColumn, Select, Option, Input, Button } from "element-ui";
import LightTable from "@/components/pages/dashboard/LightTable.vue";
import SocialTrafficTable from "@/components/pages/dashboard/SocialTrafficTable.vue";
import PageVisitsTable from "@/components/pages/dashboard/PageVisitsTable.vue";
const url = process.env.apiUrl;
let api_name = "dashboard";

export default {
  // middleware({ store, redirect }) {
    // If the user is not authenticated
  //   if (!store.$auth.loggedIn) {
  //     return redirect("/login");
  //   }
  // },
  layout: "DashboardLayout",
  components: {
    ActivityFeed,
    LineChart,
    BarChart,
    BaseProgress,
    RouteBreadCrumb,
    StatsCard,
    TaskList,
    PageVisitsTable,
    SocialTrafficTable,
    LightTable,
    UserList,
    ProgressTrackList,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Input.name]: Input,
  },
  async asyncData(ctx) {
    /*
    try {
      let res = await ctx.$axios.get(`${url}/${api_name}`);
      return {
        form: {
          corps: res.data.contract_members_number,
          members: res.data.new_requested_members,
          productions: res.data.productions_number,
          works: res.data.works_number,
        },
      };
    } catch (e) {
      // todo エラーハンドリング
      console.log(e);
    }
     */
  },

  data() {
    return {
      table: {},
      head: [
        {
          prop: "id",
          label: "ID",
          minWidth: 50,
          sortable: true,
        },
        {
          prop: "company_name",
          label: "企業名",
          minWidth: 50,
          sortable: true,
        },
        {
          prop: "status",
          label: "登録状態",
          minWidth: 50,
          sortable: true,
          type: "select",
          options: [
            {
              type: "info",
              text: "不明",
            },
            {
              type: "info",
              text: "未承認",
            },
            {
              type: "success",
              text: "公開",
            },
            {
              type: "danger",
              text: "却下",
            },
          ],
        },
        {
          prop: "created_at",
          label: "登録日",
          type: "datetime",
          minWidth: 50,
          sortable: true,
        },
      ],
      status: [
        {
          title: "契約企業",
          count: "corps.today",
          last_count: "corps.yesterday",
          to: {
            path: "/account/corporate",
          },
        },
        {
          title: "プロダクション",
          count: "productions.today",
          last_count: "productions.yesterday",
          rate: 0,
          to: {
            path: "/account/production",
          },
        },
        {
          title: "依頼数",
          count: "works.today",
          last_count: "works.yesterday",
          rate: 0,
          to: {
            path: "/works",
          },
        },
      ],
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: "Performance",
              data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            },
          ],
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      redBarChart: {
        chartData: {
          labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Sales",
              data: [25, 20, 30, 22, 17, 29],
            },
          ],
        },
      },
    };
  },
  methods: {
    getPageData() {
      console.log(this.form.members);
      return this.form.members;
    },
    getRate(today, yesterday) {
      let ret = "";
      console.log(today, yesterday);
      if (today > yesterday) {
        if (yesterday == 0) yesterday = 1;
        ret += `+${(today / yesterday) * 100}%`;
      } else {
        if (today == 0) today = 1;
        ret += `-${(yesterday / today) * 100}%`;
      }
      return ret;
    },

    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            label: "Performance",
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
  },
  mounted() {
    this.initBigChart(0);
  },
};
</script>
<style></style>
