<template>
  <section class="l-cnt__full l-cnt__full--blue">
    <div class="l-cnt__main">
      <h1 class="p-index__title">Kinto One Pro</h1>
      <h3 class="p-index__sub">我会将每一个页面放一个连接在这里哦</h3>
      <div class="test">hello</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Catalog",
  data() {
    return {
      navList: [
        {
          title: "首页",
          path: "/"
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/style/pages/kinto_one/morizo/gryaris/style.scss";

.test {
  width: 1000px;
  background: red;
  padding: 50px;
}
</style>