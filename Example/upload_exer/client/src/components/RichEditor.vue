<template>
  <div class='wrap'>
    <div id="editor" class="editor"></div>
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import {request} from '../api/request'

export default {
  name: 'RichEditor',
  data() {
    return {
      quill:null,
      options: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        },
        placeholder: 'Insert text here ...'
      },
      url:'http://127.0.0.1:8000',
      rValue: ''
    }
  },

  methods: {
    async uploadToServer(file, callback) {

      let formData = new FormData();
      formData.append('file', file, file.name);

      let res = await request({ url: '/upload', method: 'POST', data: formData })
      callback&&callback(res)
    }
  },

  mounted() {
    let dom = this.$el.querySelector('#editor')
    this.quill = new Quill(dom, this.options);

    this.quill.setContents(this.value)
    this.quill.on('text-change', () => {
      this.$emit('input', this.quill.getContents())
    });

    let toolbar = this.quill.getModule('toolbar');
      toolbar.addHandler('image', () => {
        let fileInput = toolbar.container.querySelector('input.ql-image[type=file]');
        if (fileInput == null) {
          fileInput = document.createElement('input');
          fileInput.setAttribute('type', 'file');
          fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
          fileInput.classList.add('ql-image');

          fileInput.addEventListener('change',  () => {
            if (fileInput.files != null && fileInput.files[0] != null) {
              this.uploadToServer(fileInput.files[0], (res) => {

                let range = this.quill.getSelection();
                if (range) {
                  fileInput.value = null;
                  //  在当前光标位置插入图片
                  toolbar.quill.insertEmbed(range.index, 'image', this.url + res.data.data);
                  //  将光标移动到图片后面
                  toolbar.quill.setSelection(range.index + 1);
                 }
              });
            }

          });
          toolbar.container.appendChild(fileInput);
        }
        fileInput.click();
      });
  }

}
</script>

<style lang='less' scoped>
  .wrap {
    height:500px;
    margin-bottom:100px;
    .editor {
      background-color: #fff;
    }
  }
  
</style>
