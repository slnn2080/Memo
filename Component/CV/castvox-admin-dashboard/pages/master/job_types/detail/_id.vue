<template>
  <nuxt-child :keep-alive-props="{ max: 16 }" keep-alive />
</template>
<script>
export default {
  layout: "DashboardLayout",
};
</script>
