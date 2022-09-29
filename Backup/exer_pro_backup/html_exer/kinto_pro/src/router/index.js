import VueRouter from 'vue-router'
import KintoOneMorizoGryaris from "../pages/KintoOneMorizoGryaris.vue"
import Catalog from "../pages/Catalog.vue"

const routes = [
  {
    path: "/",
    component: Catalog
  },
  {
    path: "/page1",
    component: KintoOneMorizoGryaris
  },
]


const router = new VueRouter({
  routes,
  mode: "history"
})

export default router