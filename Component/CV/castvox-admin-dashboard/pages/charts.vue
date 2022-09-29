<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Charts</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
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
          <stats-card
            title="Total traffic"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 3.48%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Total traffic"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 12.18%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Sales"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
          >
            <template slot="footer">
              <span class="text-danger mr-2"
                ><i class="fa fa-arrow-down"></i> 5.72%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Performance"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 54.8%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-6">
          <card>
            <template slot="header">
              <!-- Subtitle -->
              <h6 class="surtitle">Overview</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Total sales</h5>
            </template>
            <div class="chart">
              <line-chart :height="350" :chart-data="salesChart.chartData">
              </line-chart>
            </div>
          </card>
        </div>

        <div class="col-xl-6">
          <card>
            <template slot="header">
              <!-- Subtitle -->
              <h6 class="surtitle">Performance</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Total orders</h5>
            </template>
            <div class="chart">
              <bar-chart :chart-data="ordersChart.chartData" :height="350" />
            </div>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6">
          <card>
            <template slot="header">
              <!-- Subtitle -->
              <h6 class="surtitle">Growth</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Sales value</h5>
            </template>
            <div class="chart">
              <line-chart
                :height="350"
                :chart-data="dotsChart.chartData"
                :extra-options="dotsChart.extraOptions"
              >
              </line-chart>
            </div>
          </card>
        </div>

        <div class="col-xl-6">
          <card>
            <template slot="header">
              <!-- Subtitle -->
              <h6 class="surtitle">Users</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Audience overview</h5>
            </template>
            <div class="chart-area">
              <doughnut-chart
                :height="350"
                :chart-data="doughnutChart.chartData"
                :extra-options="doughnutChart.extraOptions"
              >
              </doughnut-chart>
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-6">
          <card>
            <template slot="header">
              <!-- Subtitle -->
              <h6 class="surtitle">Partners</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Affiliate traffic</h5>
            </template>
            <div class="chart">
              <pie-chart
                :height="350"
                :chart-data="pieChart.chartData"
                :extra-options="pieChart.extraOptions"
              >
              </pie-chart>
            </div>
          </card>
        </div>

        <div class="col-xl-6">
          <card>
            <template slot="header">
              <!-- Subtitle -->
              <h6 class="surtitle">Overview</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Product comparison</h5>
            </template>
            <div class="chart-area">
              <bar-chart
                :height="350"
                :chart-data="barChartStacked.chartData"
                :extra-options="barChartStacked.extraOptions"
              >
              </bar-chart>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DoughnutChart from "~/components/argon-core/Charts/DoughnutChart";
import LineChart from "~/components/argon-core/Charts/LineChart";
import BarChart from "~/components/argon-core/Charts/BarChart";
import PieChart from "~/components/argon-core/Charts/PieChart";
import * as chartConfigs from "~/components/argon-core/Charts/config";

import RouteBreadCrumb from "~/components/argon-core/Breadcrumb/RouteBreadcrumb";
import BaseHeader from "~/components/argon-core/BaseHeader";
import StatsCard from "~/components/argon-core/Cards/StatsCard";
import { Charts } from "~/components/argon-core/Charts/config";

function randomScalingFactor() {
  return Math.round(Math.random() * 100);
}

export default {
  layout: "DashboardLayout",
  components: {
    DoughnutChart,
    LineChart,
    BarChart,
    PieChart,
    StatsCard,
    BaseHeader,
    RouteBreadCrumb,
  },
  data() {
    return {
      salesChart: {
        chartData: {
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Performance",
              data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            },
          ],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      ordersChart: {
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
      dotsChart: {
        chartData: {
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Performance",
              data: [10, 18, 28, 23, 28, 40, 36, 46, 52],
              pointRadius: 10,
              pointHoverRadius: 15,
              showLine: false,
            },
          ],
        },
        extraOptions: {
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: Charts.colors.gray[200],
                  zeroLineColor: Charts.colors.gray[200],
                },
              },
            ],
          },
        },
      },
      doughnutChart: {
        chartData: {
          labels: ["Danger", "Warning", "Success", "Primary", "Info"],
          datasets: [
            {
              data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
              ],
              backgroundColor: [
                Charts.colors.theme["danger"],
                Charts.colors.theme["warning"],
                Charts.colors.theme["success"],
                Charts.colors.theme["primary"],
                Charts.colors.theme["info"],
              ],
              label: "Dataset 1",
            },
          ],
        },
        extraOptions: {
          responsive: true,
          legend: {
            position: "top",
          },
          animation: {
            animateScale: true,
            animateRotate: true,
          },
        },
      },
      pieChart: {
        chartData: {
          labels: ["Danger", "Warning", "Success", "Primary", "Info"],
          datasets: [
            {
              data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
              ],
              backgroundColor: [
                Charts.colors.theme["danger"],
                Charts.colors.theme["warning"],
                Charts.colors.theme["success"],
                Charts.colors.theme["primary"],
                Charts.colors.theme["info"],
              ],
              label: "Dataset 1",
            },
          ],
        },
        extraOptions: {
          responsive: true,
          legend: {
            position: "top",
          },
          animation: {
            animateScale: true,
            animateRotate: true,
          },
        },
      },
      barChartStacked: {
        chartData: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "Dataset 1",
              backgroundColor: Charts.colors.theme["danger"],
              data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
              ],
            },
            {
              label: "Dataset 2",
              backgroundColor: Charts.colors.theme["primary"],
              data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
              ],
            },
            {
              label: "Dataset 3",
              backgroundColor: Charts.colors.theme["success"],
              data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
              ],
            },
          ],
        },
        extraOptions: {
          tooltips: {
            mode: "index",
            intersect: false,
          },
          responsive: true,
          scales: {
            xAxes: [
              {
                stacked: true,
              },
            ],
            yAxes: [
              {
                stacked: true,
              },
            ],
          },
        },
      },
    };
  },
};
</script>
<style></style>
