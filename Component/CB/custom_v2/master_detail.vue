<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0"></h6>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-lg-12">
          <div class="card-wrapper">
            <form ref="register_form" @submit.prevent="onSubmit">
              <div class="card">
                <div class="card-header">
                  <h3 class="mb-0">{{ page_name }}</h3>
                </div>
                <div class="card-body">
                  <div>
                    <div class="my-4" v-for="n in head" :key="n">
                      <div class="my-4" v-if="is_show(n)">
                        <h3>{{ n.name }}</h3>
                        <span color="red">{{ n.notice }}</span>
                      </div>
                      <div class="m-4" v-if="is_show(n)">
                        <div v-if="n.type == 'html'">
                          <html-editor
                            v-if="!n.is_readonly"
                            v-model="form[n.props]"
                          />
                          <div v-else>{{ form[n.props] }}</div>
                        </div>
                        <div v-else-if="n.type == 'image_array'">
                          <img
                            width="128"
                            height="128"
                            class="img_fit m-1"
                            v-for="n in form[n.props]"
                            :key="n"
                            :src="n"
                          />
                        </div>
                        <div
                          class="
                            flex-column
                            justify-content-center
                            align-content-center
                          "
                          v-else-if="n.type == 'image'"
                        >
                          <img
                            v-if="form[n.props] != '' && form[n.props] != null"
                            :width="n.width"
                            :height="n.height"
                            :src="form[n.props]"
                          />
                          <div class="m-2">
                            画像URL
                            <input
                              v-if="
                                form[n.props] != '' && form[n.props] != null
                              "
                              type="text"
                              class="input_style"
                              v-model="form[n.props]"
                              ref="inp"
                            />
                            <input
                              v-else
                              type="file"
                              name="attachment"
                              :accept="picType"
                              @change="fileChange"
                            />
                          </div>
                        </div>
                        <template v-else-if="n.type == 'password_reset'">
                          <base-button
                            type="secondary"
                            class="btn btn-danger"
                            @click="onReset(form[n.props])"
                          >
                            パスワードリセット
                          </base-button>
                        </template>
                        <template v-else-if="n.type == 'password'">
                          <strong>パスワード</strong>
                          <base-input
                            prepend-icon="ni ni-lock-circle-open"
                            v-if="!n.is_readonly"
                            :readonly="n.is_readonly"
                            :name="`register_${n.props[0]}`"
                            type="password"
                            v-model="form[n.props[0]]"
                          />
                          <strong>パスワード(確認用)</strong>
                          <base-input
                            prepend-icon="ni ni-lock-circle-open"
                            v-if="!n.is_readonly"
                            :readonly="n.is_readonly"
                            :name="`register_${n.props[1]}`"
                            type="password"
                            v-model="form[n.props[1]]"
                          />
                          <strong>パスワードルール</strong>
                          <div class="text-danger">
                            <span>・8文字以上 64文字を最大長とすると</span
                            ><br />
                            <span
                              >・英数記号はそれぞれ１文字以上使用すること</span
                            ><br />
                            <span>
                              ・使える文字は<br /><br />
                              半角英数<br />ハイフン<br />アンダーバー<br />
                              /*+.,!?#$%&~|^@ ; : ( ) [] { }
                            </span>
                            <br />
                          </div>
                        </template>
                        <template v-else-if="n.type == 'group_text'">
                          <div class="d-flex flex-wrap">
                            <div
                              v-for="p in n.props"
                              :key="p"
                              class="text-nowrap mr-4 my-2"
                            >
                              <h5>{{ p.title }}</h5>
                              <base-input
                                v-if="!n.is_readonly"
                                :readonly="n.is_readonly"
                                :name="`register_${p.props}`"
                                type="text"
                                v-model="form[p.props]"
                              />
                              <strong v-else>{{ form[p.props] }}</strong>
                            </div>
                          </div>
                        </template>
                        <template v-else-if="n.type == 'casts'">
                          <div class="d-flex justify-content-start">
                            <nuxt-link
                              class="mr-1"
                              v-for="(c, idx) in form[n.props]"
                              :key="idx"
                              :to="{ path: `/casts/detail/${c}` }"
                            >
                              <div class="flex-column align-content-center">
                                <img
                                  width="128"
                                  height="128"
                                  contain
                                  :src="JSON.parse(meta.casts[idx].img_path)[0]"
                                />
                                <div>{{ meta.casts[idx].name }}</div>
                              </div>
                            </nuxt-link>
                          </div>
                        </template>

                        <template v-else-if="n.type == 'title_only'">
                        </template>
                        <template v-else-if="n.type == 'download'">
                          <a :href="form[n.options]">{{ form[n.props] }}</a>
                        </template>
                        <template v-else-if="n.type == 'upload'">
                          <input
                            type="file"
                            id="fileExport"
                            @change="handleFileChange"
                            ref="fileExport"
                          />
                        </template>
                        <template v-else-if="n.type == 'link'">
                          <a :href="form[n.props]">{{ form[n.props] }}</a>
                        </template>
                        <template v-else-if="n.type == 'email'">
                          <base-input
                            v-if="!n.is_readonly"
                            :readonly="n.is_readonly"
                            :name="`register_${n.props}`"
                            :type="n.type"
                            v-model="form[n.props]"
                          />
                          <strong v-else> {{ form[n.props] }}</strong>
                        </template>
                        <template v-else-if="n.type == 'tel'">
                          <base-input
                            v-if="!n.is_readonly"
                            :readonly="n.is_readonly"
                            :name="`register_${n.props}`"
                            :type="n.type"
                            v-model="form[n.props]"
                          />
                          <strong v-else> {{ form[n.props] }}</strong>
                        </template>
                        <template v-else-if="n.type == 'datetime'">
                          <strong>{{
                            form[n.props]
                              ? $castvox.get_datetime(form[n.props])
                              : ""
                          }}</strong>
                        </template>
                        <template v-else-if="n.type == 'date'">
                          <strong>
                            {{
                              form[n.props]
                                ? $castvox.get_date(form[n.props])
                                : ""
                            }}
                          </strong>
                        </template>
                        <template v-else-if="n.type == 'checkbox'">
                          <input
                            type="checkbox"
                            :name="`register_${n.props}`"
                            :value="form[n.props]"
                            v-model="n.props"
                          />
                        </template>
                        <template v-else-if="n.type == 'relation_select_array'">
                          <select
                            v-for="l of n.options.count"
                            :key="l"
                            :readonly="n.is_readonly"
                            :name="`register_${n.props}[${l - 1}]`"
                            :type="n.type"
                            v-model="form[n.props][l - 1]"
                          >
                            <option
                              v-for="(ct, idx) in options[n.options.key]"
                              :key="idx"
                              :value="Number(ct.id)"
                            >
                              {{ ct.attributes[n.options.index] }}
                            </option>
                          </select>
                        </template>
                        <template v-else-if="n.type == 'relation_select'">
                          <select
                            :readonly="n.is_readonly"
                            :name="`register_${n.props}`"
                            :type="n.type"
                            v-model="form[n.props]"
                          >
                            <option
                              v-for="(ct, idx) in options[n.options.key]"
                              :key="idx"
                              :value="ct.id"
                            >
                              {{ ct.attributes[n.options.index] }}
                            </option>
                          </select>
                        </template>
                        <select
                          v-else-if="n.type == 'select' && !n.is_readonly"
                          :readonly="n.is_readonly"
                          :name="`register_${n.props}`"
                          :type="n.type"
                          :title="test"
                          v-model="form[n.props]"
                        >
                          <option
                            v-for="(ct, idx) in n.options"
                            :key="idx"
                            :value="idx"
                          >
                            {{ ct.text }}
                          </option>
                        </select>
                        <badge
                          v-else-if="n.type == 'select' && n.is_readonly"
                          :type="n.options[form[n.props]].type"
                        >
                          {{ n.options[form[n.props]].text }}
                        </badge>
                        <base-input
                          v-else-if="n.type == 'multiline'"
                          :readonly="n.is_readonly"
                          :name="`register_${n.props}`"
                          :type="n.type"
                          v-model="form[n.props]"
                        >
                          <textarea
                            v-if="!n.is_readonly"
                            :name="`register_${n.props}`"
                            :readonly="n.is_readonly"
                            cols="200"
                            rows="30"
                            v-model="form[n.props]"
                          ></textarea>
                          <p v-else>{{ form[n.props] }}</p>
                        </base-input>
                        <template v-else>
                          <base-input
                            v-if="!n.is_readonly"
                            :readonly="n.is_readonly"
                            :name="`register_${n.props}`"
                            :type="n.type"
                            v-model="form[n.props]"
                          />
                          <strong v-else>{{ form[n.props] }}</strong>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="hide_btnArea">
                <base-button
                  type="secondary"
                  class="btn btn-warning"
                  @click="onCanceled"
                >
                  戻る
                </base-button>
                <base-button
                  type="success"
                  class="btn btn-primary"
                  native-type="submit"
                >
                  <span v-if="!is_new()">更新</span>
                  <span v-else>登録</span>
                </base-button>
              </template>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Select, Option, Button, Input } from "element-ui";
import HtmlEditor from "../../argon-core/Inputs/HtmlEditor";
const url = process.env.apiUrl;
let api_name = "uploads/blogs";

export default {
  name: "master_detail",
  layout: "DashboardLayout",
  scrollToTop: true,

  components: {
    HtmlEditor,
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
    [Input.name]: Input,
  },
  props: {
    page_name: {
      type: String,
      default: "",
    },
    api_name: {
      type: String,
      default: "",
    },
    head: {
      type: Array,
      default: null,
    },
    form: {
      type: Object,
      default: null,
    },
    meta: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
    emit_submit: {
      type: String,
      default: null,
    },
    hide_btnArea: {
      type: Boolean,
      default: true,
    },
    redirect: {
      type: String,
      default: "/",
    },
  },
  data: function () {
    return {
      id: 0,
      item: "",
      picType: "image/png, image/gif, image/jpeg, image/bmp,",
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.$nuxt.$on("input_value", (e) => {
      const props = this.head.filter((key) => {
        return key.type == "html";
      });
      this.form[props[0].props] = e;
    });
  },
  computed: {
    time() {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let hours = time.getHours();
      let min = time.getMinutes();
      let sec = time.getSeconds();

      day = day < 10 ? "0" + day : day;
      month = month < 10 ? "0" + month : month;
      hours = hours < 10 ? "0" + hours : hours;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      return `${year}${month}${day}${hours}${min}${sec}`;
    },
  },
  methods: {
    async handleFileChange(e) {
      try {
        if (e.target.files) {
          let file = e.target.files[0];
          let fileName = e.target.files[0].name;
          let formData = new FormData();
          formData.append("attachment", file, fileName);
          let res = await this.$axios.$post(`${url}/import/list`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log(res);
        }
      } catch (err) {
        console.log(err);
      }
    },
    is_show(n) {
      let is_new = this.is_new();
      let ret = true;
      if (n.is_hidden_new) {
        console.log("hidden new");
        ret = !is_new;
      } else if (n.is_hidden_edit) {
        console.log("hidden edit");
        ret = is_new;
      }
      console.log(n, ret, is_new);

      return ret;
    },
    async onSubmit() {
      try {
        //submitをフックしたい場合は
        if (this.emit_submit) {
          this.$nuxt.$emit(this.emit_submit, this.form);
          return;
        }
        if (this.id) {
          await this.$axios.$patch(`${url}/${this.api_name}/${this.id}`, {
            data: {
              type: this.api_name,
              id: this.id,
              attributes: this.form,
            },
          });
        } else {
          await this.$axios.$post(`${url}/${this.api_name}`, {
            data: {
              type: this.api_name,
              attributes: this.form,
            },
          });
        }
        this.$router.back();
      } catch (e) {
        console.error(e);
      }
    },
    get_date(date) {
      return this.$castvox.get_date(date);
    },
    async onReset(e) {
      try {
        await this.$axios.$post(`${url}/password-forgot`, {
          data: {
            type: "password-forgot",
            attributes: {
              email: e,
              redirect_url: `${window.location.origin}/password/email`,
            },
          },
        });
        this.$toast.success(
          "登録メールアドレスにパスワードリセット情報が送信されました"
        );
      } catch (e) {
        console.error(e);
      }
    },
    onCanceled() {
      this.$router.back();
    },
    is_new() {
      if (this.$route.params && this.$route.params.id) {
        return false;
      }

      return true;
    },

    async fileChange(e) {
      //      if (!this.$route.params.id) {
      const file = e.target.files[0] || {};
      const fileName = e.target.files[0].name || "";
      if (!file || !fileName) return;
      const formData = new FormData();
      formData.append("attachment", file, fileName);

      try {
        await this.$axios
          .$post(`${url}/${api_name}/${this.time}/title`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            this.form.img_path = res.url;
            this.$nuxt.$emit("file_register", {
              props: "img_path",
              url: res.url,
            });
          });
      } catch (e) {
        /*
        // test
        console.log("file_register");
        this.form.img_path = fileName;
        this.$nuxt.$emit("file_register", {
          props: "img_path",
          url: fileName,
          file: file,
        });
        */
      }
      /*
      } else {
        const res = this.head.filter((item) => {
          return item.type == "image";
        });
        this.form[res[0].props] = e.target.value;
      }
 */
    },
  },
};
</script>

<style scoped>
.card-wrapper {
  position: relative;
  top: 100px;
}
select {
  margin-left: 16px;
}
.input_style {
  width: 100%;
}
.btn-group {
}
.img_fit {
  object-fit: cover;
}
</style>
