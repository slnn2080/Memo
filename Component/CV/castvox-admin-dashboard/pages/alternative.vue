<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Alternative</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <nuxt-link to="/"><i class="fas fa-home"></i></nuxt-link>
              </li>
              <li class="breadcrumb-item"><a href="#">Dashboards</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                Alternative
              </li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-primary border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Tasks completed
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white">8/24</span>
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="30"
                  ></base-progress>
                </div>
                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template slot="title">
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <a href="#!" class="text-nowrap text-white font-weight-600"
                  >See details</a
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-info border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Contacts
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white"
                    >123/267</span
                  >
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="50"
                  ></base-progress>
                </div>
                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template slot="title">
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <a href="#!" class="text-nowrap text-white font-weight-600"
                  >See details</a
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-danger border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Items sold
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white"
                    >200/300</span
                  >
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="80"
                  ></base-progress>
                </div>
                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template slot="title">
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <a href="#!" class="text-nowrap text-white font-weight-600"
                  >See details</a
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-default border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Notifications
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white">50/62</span>
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="90"
                  ></base-progress>
                </div>
                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template slot="title">
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <a href="#!" class="text-nowrap text-white font-weight-600"
                  >See details</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <div class="card-deck flex-column flex-xl-row">
        <card>
          <div slot="header" class="row align-items-center">
            <div class="col">
              <h6 class="text-uppercase text-muted ls-1 mb-1">Overview</h6>
              <h5 class="h3 mb-0">Sales value</h5>
            </div>
          </div>
          <line-chart
            :height="350"
            ref="bigChart"
            :chart-data="bigLineChart.chartData"
            :extra-options="bigLineChart.extraOptions"
          >
          </line-chart>
        </card>

        <card header-classes="bg-transparent">
          <div slot="header" class="row align-items-center">
            <div class="col">
              <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
              <h5 class="h3 mb-0">Total orders</h5>
            </div>
          </div>

          <bar-chart
            :height="350"
            ref="barChart"
            :chart-data="redBarChart.chartData"
          >
          </bar-chart>
        </card>
        <!-- Progress track list-->
        <card>
          <!-- Card header -->
          <template v-slot:header>
            <div class="row align-items-center">
              <div class="col-8">
                <!-- Surtitle -->
                <h6 class="surtitle">5/23 projects</h6>
                <!-- Title -->
                <h5 class="h3 mb-0">Progress track</h5>
              </div>
              <div class="col-4 text-right">
                <a href="#!" class="btn btn-sm btn-neutral">Action</a>
              </div>
            </div>
          </template>
          <!-- Card body -->
          <progress-track-list :item-limit="5"></progress-track-list>
        </card>
      </div>
      <!-- End charts-->

      <!--Tables & Widgets-->
      <div class="row">
        <div class="col-xl-8">
          <light-table :item-limit="5"></light-table>
        </div>
        <div class="col-xl-4">
          <vector-map-card></vector-map-card>
        </div>
      </div>
      <!--End Tables & Widgets-->

      <!--Lists-->
      <div class="card-deck flex-column flex-xl-row">
        <!-- Members list group card -->
        <members-card :show-search="false"></members-card>
        <!-- Checklist -->
        <task-list></task-list>
        <!-- Progress track -->
        <card>
          <!-- Card header -->
          <h5 slot="header" class="h3 mb-0">Progress track</h5>
          <!-- Card body -->
          <progress-track-list :item-limit="5"></progress-track-list>
        </card>
      </div>
      <!--End lists-->
    </div>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/argon-core/Charts/config";
import LineChart from "@/components/argon-core/Charts/LineChart";
import BarChart from "@/components/argon-core/Charts/BarChart";

// Components
import BaseHeader from "@/components/argon-core/BaseHeader";
import BaseProgress from "@/components/argon-core/BaseProgress";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/argon-core/Cards/StatsCard";

// Lists
import ProgressTrackList from "~/components/pages/dashboard/ProgressTrackList";
import MembersCard from "~/components/widgets/MembersCard";
import TaskList from "~/components/widgets/TaskList";

// Tables
import LightTable from "~/components/pages/dashboard/LightTable";
import VectorMapCard from "~/components/widgets/VectorMapCard";

export default {
  layout: "DashboardLayout",
  components: {
    LineChart,
    BarChart,
    BaseHeader,
    BaseProgress,
    RouteBreadCrumb,
    StatsCard,
    TaskList,
    VectorMapCard,
    LightTable,
    ProgressTrackList,
    MembersCard,
  },
  data() {
    return {
      bigLineChart: {
        chartData: {
          datasets: [
            {
              label: "Performance",
              data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            },
          ],
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      redBarChart: {
        chartData: {
          labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Sales",
              data: [25, 20, 30, 22, 17, 29],
            },
          ],
        },
      },
    };
  },
};
</script>
<style></style>
