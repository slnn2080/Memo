<template>
  <div class="quill ql-snow">
    <div :id="editorId" :name="name" class="" ref="editor">
      <div class="ql-container ql-show">
        <div class="ql-editor">
          <div>{{ value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
const url = process.env.apiUrl;
let api_name = "uploads/blogs";

export default {
  name: "html-editor",
  props: {
    value: {
      type: String,
      default: "",
    },
    name: String,
  },
  data() {
    return {
      editor: null,
      content: null,
      lastHtmlValue: "",
      editorId: null,
      toolbarId: null,
      toolbarOptions: [
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [{ header: "1" }, { header: "2" }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["link", "image", "clean"],
      ],
      fileKeys: [],
    };
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
    initialize(Quill) {
      this.editor = new Quill(`#${this.editorId}`, {
        theme: "snow",
        modules: {
          toolbar: this.toolbarOptions,
        },
      });
      if (this.value.length > 0) {
        this.editor.pasteHTML(this.value);
      }

      let editorRef = this.$refs.editor;
      let node = editorRef.children[0];
      this.editor.on("text-change", () => {
        let html = node.innerHTML;
        if (html === "<p><br></p>") {
          html = "";
        }
        this.content = html;
        this.$nuxt.$emit("input_value", this.content);
      });

      let toolbar = this.editor.getModule("toolbar");
      let fileInput = toolbar.container.querySelector(
        "input.ql-image[type=file]"
      );

      toolbar.addHandler("image", () => {
        let fileInput = toolbar.container.querySelector(
          "input.ql-image[type=file]"
        );
        if (fileInput === null) {
          fileInput = document.createElement("input");
          fileInput.setAttribute("type", "file");
          fileInput.setAttribute(
            "accept",
            "image/png",
            "image/gif",
            "image/jpeg",
            "image/bmp",
            "image/x-icon"
          );
          fileInput.classList.add("ql-image");
          fileInput.addEventListener("change", () => {
            if (fileInput.files != null && fileInput.files[0] != null) {
              this.uploadServer(fileInput.files[0], (res) => {
                //                console.log(res);
                let range = this.editor.getSelection();
                if (range) {
                  fileInput.value = null;
                  toolbar.quill.insertEmbed(range.index, "image", res.url);
                  toolbar.quill.setSelection(range.index + 1);
                }
              });
            }
          });
          toolbar.container.appendChild(fileInput);
        }
        fileInput.click();
      });
    },

    async uploadServer(file, callback) {
      let formData = new FormData();
      formData.append("attachment", file);
      let res = formData.keys();
      for (let key of res) {
        this.fileKeys.push(key);
      }

      this.$axios
        .$post(
          `${url}/${api_name}/${this.time}/body_${this.fileKeys.length}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          callback(res);
        });
    },

    pasteHTML() {
      if (!this.editor) {
        return;
      }
      this.editor.pasteHTML(this.value);
    },
    randomString() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    },
  },
  async mounted() {
    let Quill = await import("quill");
    Quill = Quill.default || Quill;
    this.editorId = this.randomString();
    this.toolbarId = this.randomString();
    this.$nextTick(() => {
      this.initialize(Quill);
    });
  },
  watch: {
    value(newVal) {
      if (newVal !== this.content) {
        this.pasteHTML(newVal);
      }
    },
  },
};
</script>

<style scoped>
.ql-container {
  border: none;
}
</style>
