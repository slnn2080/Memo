<template>
  <div>
    <master_detail
      page_name="特集登録"
      api_name="blogs"
      :head="header"
      :form="form"
      :options="{ categories: categories, tags: tags }"
    />
    <div class="p-4 preview">
      <h4>記事プレビュ</h4>
      <h1 class="my-4">{{ form.description }}</h1>
      <img v-if="form.curation_flag != 1" width="100%" :src="form.img_path" />
      <div v-html="form.body_m"></div>
    </div>
  </div>
</template>
<script>
import Master_detail from "../../../../components/layouts/custom/master_detail";
const url = process.env.apiUrl;
let api_name = "blogs";

export default {
  layout: "DashboardLayout",
  components: {
    Master_detail,
  },
  mounted() {
    this.$nuxt.$on("file_register", (e) => {
      let head = this.header.filter((key) => {
        return key.props == e.props;
      });
      this.form[head[0].props] = e.url;
    });
    /*
    if (!this.$route.params.id) {
      let fileObj = {
        name: "アップロード画像",
        type: "file",
        is_show: true,
      };
      let i;
      this.header.forEach((item, index) => {
        if (item.props == "img_path") {
          i = index + 1;
        }
      });
      this.header.splice(i, 0, fileObj);
    }
     */
  },
  data: function () {
    return {
      responseTag: [],
      header: [
        {
          name: "タイトル",
          notice: "ブログのタイトルを設定してください",
          props: "title",
          type: "text",
          is_readonly: false,
        },
        {
          name: "カテゴリ",
          props: "category_id",
          notice: "ブログのカテゴリを設定してください",
          type: "relation_select",
          is_readonly: false,
          options: {
            key: "categories",
            index: "category",
          },
        },
        {
          name: "タグ",
          props: "tag",
          notice: "ブログのタグを設定してください",
          type: "relation_select_array",
          is_readonly: false,
          options: {
            key: "tags",
            index: "name",
            count: 5,
          },
        },
        {
          name: "ヘッド画像",
          props: "img_path",
          type: "image",
          width: "400",
          height: "300",
          is_readonly: false,
        },
        {
          name: "本文",
          props: "body_m",
          type: "html",
          is_readonly: false,
        },
        {
          name: "登録日時",
          props: "createdAt",
          type: "datetime",
          is_readonly: true,
        },
        {
          name: "更新日時",
          props: "updatedAt",
          type: "datetime",
          is_readonly: true,
        },
        /*
        {
          name: "ディスクリプション",
          props: "description",
          type: "text",
          is_readonly: false,
        },
       
               */
      ],
    };
  },
  async asyncData(ctx) {
    try {
      if (ctx.params && ctx.params.id) {
        let res = await ctx.$axios.get(`${url}/${api_name}/${ctx.params.id}`);
        let categories = await ctx.$axios.get(`${url}/blog_categories`);
        let tags = await ctx.$axios.get(`${url}/blog_tags`);
        return {
          form: res.data.data.attributes,
          id: ctx.params.id,
          categories: categories.data.data,
          tags: tags.data.data,
        };
      } else {
        let categories = await ctx.$axios.get(`${url}/blog_categories`);
        let tags = await ctx.$axios.get(`${url}/blog_tags`);
        return {
          form: {
            tag: [0, 0, 0],
            img_path: "",
            curation_flag: 2, //新規作成はコラムだけなので強制的に2
          },
          categories: categories.data.data,
          tags: tags.data.data,
        };
      }
    } catch (e) {
      // todo エラーハンドリング
      console.log(e);
    }
  },
};
</script>

<style scoped>
.card-wrapper {
  position: relative;
  top: 100px;
}

.preview {
  max-width: 780px;
  background-color: white;
  top: 120px;
  margin: 0 auto !important;
  position: relative;
}
</style>
