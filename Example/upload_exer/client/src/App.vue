<template>
  <div id="app">
    <div class="header">
      <h3>RichEditor</h3>
    </div>
    <div class="main">
      <RichEditor />
    </div>
  </div>
</template>

<script>
import RichEditor from './components/RichEditor.vue'

export default {
  name: 'App',
  components: {
    RichEditor
  }
}
</script>

<style lang='less'>
  .header {
    width:100%;
    background-color: #303133;
    height: 40px;
    padding: 10px;
    padding-left: 30px;
    line-height:40px;
    color:#fff;
  }

  .main {
    width:100%;
    background: #EBEEF5;
    margin-top:30px;
    padding:15px;
  }
  
</style>
