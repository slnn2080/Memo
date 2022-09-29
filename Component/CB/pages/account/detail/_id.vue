<template>
  <div>
    <nuxt-child :keep-alive-props="{ max: 16 }" keep-alive />
  </div>
</template>
<script>
export default {
  layout: "DashboardLayout",
};
</script>
