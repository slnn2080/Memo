<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'ダッシュボード',
            path: '/',
            icon: 'ni ni-shop text-primary',
          }"
        ></sidebar-item>

        <sidebar-item
          :link="{
            name: '注目リスト',
            path: '/feature',
            icon: 'ni ni-archive-2 text-green',
          }"
        ></sidebar-item>

        <sidebar-item
          :link="{
            name: menu.blogs.name,
            path: menu.blogs.path,
            icon: 'ni ni-archive-2 text-green',
          }"
        >
          <sidebar-item v-for="n in menu.blogs.lists" :key="n" :link="n" />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: menu.works.name,
            path: menu.works.path,
            icon: 'ni ni-archive-2 text-green',
          }"
        >
          <sidebar-item v-for="n in menu.works.lists" :key="n" :link="n" />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: menu.casts.name,
            path: menu.casts.path,
            icon: 'ni ni-archive-2 text-green',
          }"
        >
          <sidebar-item v-for="n in menu.casts.lists" :key="n" :link="n" />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: menu.account.name,
            path: menu.account.path,
            icon: 'ni ni-archive-2 text-green',
          }"
        >
          <sidebar-item v-for="n in menu.account.lists" :key="n" :link="n" />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: menu.master.name,
            path: menu.master.path,
            icon: 'ni ni-archive-2 text-green',
          }"
        >
          <sidebar-item v-for="n in menu.master.lists" :key="n" :link="n" />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: menu.inquiries.name,
            path: menu.inquiries.path,
            icon: 'ni ni-archive-2 text-green',
          }"
        >
          <sidebar-item v-for="n in menu.inquiries.lists" :key="n" :link="n" />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: menu.admin.name,
            path: menu.admin.path,
            query: menu.admin.query,
            icon: 'ni ni-archive-2 text-green',
          }"
        >
          <sidebar-item v-for="n in menu.admin.lists" :key="n" :link="n" />
        </sidebar-item>
        <a @click="logout()">
          <sidebar-item
            :link="{
              name: 'ログアウト',
              path: '/',
              icon: 'ni ni-archive-2 text-green',
            }"
          ></sidebar-item>
        </a>
      </template>
    </side-bar>
    <div class="main-content">
      <div @click="$sidebar.displaySidebar(false)">
        <nuxt></nuxt>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-candp */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "~/components/layouts/argon/DashboardNavbar.vue";
import ContentFooter from "~/components/layouts/argon/ContentFooter.vue";
import DashboardContent from "~/components/layouts/argon/Content.vue";
import Vuex from "vuex";

export default {
  scrollToTop: true,
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
  },
  data() {
    return {
      roles: [],
      menu: {
        //
        blogs: {
          name: "特集",
          path: "blogs",
          lists: [
            {
              name: "公開特集",
              path: "/blogs/publish",
            },
            {
              name: "コラム",
              path: "/blogs/column",
            },
            {
              name: "キュレーション",
              path: "/blogs/curation",
            },
            {
              name: "ブログタグ管理",
              path: "/master/blog_tags",
            },
            {
              name: "ブログカテゴリ管理",
              path: "/master/blog_categories",
            },
          ],
        },
        account: {
          name: "アカウント",
          path: "/account",
          lists: [
            {
              name: "未承認ユーザー",
              path: "/account/new",
            },
            {
              name: "クライアント",
              path: "/account/corporate",
            },
            {
              name: "キャスト",
              path: "/account/production",
            },
            {
              name: "クライアント / キャスト",
              path: "/account/candp",
            },
            {
              name: "却下済みユーザー",
              path: "/account/reject",
            },
            {
              name: "プラン管理",
              path: "/master/plans",
            },
          ],
        },
        works: {
          name: "お仕事依頼",
          path: "/works",
          lists: [
            {
              name: "一覧",
              path: "/works",
            },
          ],
        },
        casts: {
          name: "キャスト",
          path: "/casts",
          lists: [
            {
              name: "一覧",
              path: "/casts",
            },
            {
              name: "ジョブタイプ管理",
              path: "/master/job_types",
            },
            {
              name: "スペシャリティ管理",
              path: "/master/specialities",
            },
            {
              name: "ジャンル管理",
              path: "/master/genres",
            },
            {
              name: "タグ管理",
              path: "/master/cast_tags",
            },
          ],
        },
        master: {
          name: "その他",
          path: "/master",
          lists: [
            {
              name: "FAQ",
              path: "/master/faqs",
            },
            {
              name: "FAQ見出し編集",
              path: "/master/faq_categories",
            },
            {
              name: "ポリシー",
              path: "/master/policies",
            },
          ],
        },
        inquiries: {
          name: "お問い合わせ",
          path: "/inquiries",
          lists: [
            {
              name: "未読",
              path: "/inquiries/new",
            },
            {
              name: "既読",
              path: "/inquiries/done",
            },
          ],
        },
        admin: {
          name: "管理者メニュー",
          path: "/admin",
          lists: [
            {
              name: "管理ユーザー",
              path: "/admin/users",
              query: {},
            },
            {
              name: "キャスト一覧アップロード",
              path: "/admin/upload/detail",
              query: {},
            },
          ],
        },
      },
    };
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/");
      } catch (error) {
        this.$toast.error(error.response.message);
      }
    },
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("scrollbar-inner");
      }
    },
  },
  mounted() {
    this.initScrollbar(), this.$store.dispatch("profile/me");
  },
  computed: {
    ...Vuex.mapState({
      me: (state) => state.profile.me,
    }),
  },
  watch: {
    // todo 一時的にコメントアウト
    // me: {
    //   handler: function (val) {
    //     this.roles = val.roles.map((r) => r.name);
    //   },
    //   deep: true,
    // },
    sidebarMini() {
      this.minimizeSidebar();
    },
  },
};
</script>
<style lang="scss">
body.g-sidenav-hidden {
  #purchase-button,
  #demo-button,
  #star-button,
  #docs-button {
    margin-left: 8px;
    margin-right: 8px;
    padding: 11px 0px;
  }
}
body.g-sidenav-show {
  #purchase-button,
  #demo-button,
  #star-button,
  #docs-button {
    margin-left: 20px;
    margin-right: 20px;
    padding: 11px 0px;
  }
}
</style>
