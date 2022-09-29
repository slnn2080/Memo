<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ $route.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
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
      <div class="row card-wrapper">
        <div class="col-lg-4">
          <!-- Basic with list group -->
          <div class="card">
            <!-- Card image -->
            <img
              class="card-img-top"
              src="~/static/img/theme/img-1-1000x600.jpg"
              alt="Image placeholder"
            />
            <!-- List group -->
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Cras justo odio</li>
              <li class="list-group-item">Dapibus ac facilisis in</li>
              <li class="list-group-item">Vestibulum at eros</li>
            </ul>
            <!-- Card body -->
            <div class="card-body">
              <h3 class="card-title mb-3">Card title</h3>
              <p class="card-text mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis non dolore est fuga nobis ipsum illum eligendi nemo iure
                repellat, soluta, optio minus ut reiciendis voluptates enim
                impedit veritatis officiis.
              </p>
              <base-button type="primary">Go somewhere</base-button>
            </div>
          </div>
          <!-- Basic with card title -->
          <card>
            <!-- Card body -->
            <h3 class="card-title mb-3">Card title</h3>
            <p class="card-text mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
              non dolore est fuga nobis ipsum illum eligendi nemo iure repellat,
              soluta, optio minus ut reiciendis voluptates enim impedit
              veritatis officiis.
            </p>
            <base-button type="primary">Go somewhere</base-button>
          </card>

          <!--Profile card-->
          <div class="card card-profile">
            <img
              src="~/static/img/theme/img-1-1000x600.jpg"
              alt="Image placeholder"
              class="card-img-top"
            />
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img
                      src="~/static/img/theme/team-4.jpg"
                      class="rounded-circle"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div
              class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            >
              <div class="d-flex justify-content-between">
                <base-button type="info" size="sm" class="mr-4"
                  >Connect</base-button
                >
                <base-button type="default" size="sm" class="float-right"
                  >Message</base-button
                >
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center">
                    <div>
                      <span class="heading">22</span>
                      <span class="description">Friends</span>
                    </div>
                    <div>
                      <span class="heading">10</span>
                      <span class="description">Photos</span>
                    </div>
                    <div>
                      <span class="heading">89</span>
                      <span class="description">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h5 class="h3">
                  Jessica Jones<span class="font-weight-light">, 27</span>
                </h5>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Bucharest, Romania
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <!-- Basic with card header -->
          <card>
            <!-- Card header -->
            <h5 slot="header" class="h3 mb-0">Card title</h5>
            <!-- Card body -->
            <p class="card-text mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
              non dolore est fuga nobis ipsum illum eligendi nemo iure repellat,
              soluta, optio minus ut reiciendis voluptates enim impedit
              veritatis officiis.
            </p>
            <base-button type="primary" class="btn btn-primary"
              >Go somewhere</base-button
            >
          </card>

          <!-- Contact card -->
          <card>
            <!-- Card body -->
            <div class="row align-items-center">
              <div class="col-auto">
                <!-- Avatar -->
                <a href="#" class="avatar avatar-xl rounded-circle">
                  <img
                    alt="Image placeholder"
                    src="~/static/img/theme/team-2.jpg"
                  />
                </a>
              </div>
              <div class="col ml--2">
                <h4 class="mb-0">
                  <a href="#!">John Snow</a>
                </h4>
                <p class="text-sm text-muted mb-0">Working remoteley</p>
                <span class="text-success">● </span>
                <small>Active</small>
              </div>
              <div class="col-auto">
                <base-button type="primary" size="sm">Add</base-button>
              </div>
            </div>
          </card>

          <!-- Team member card -->
          <card>
            <!-- Card body -->
            <a href="#!">
              <img
                src="~/static/img/theme/team-1.jpg"
                class="
                  rounded-circle
                  img-center img-fluid
                  shadow
                  shadow-lg--hover
                "
                style="width: 140px"
              />
            </a>
            <div class="pt-4 text-center">
              <h5 class="h3 title">
                <span class="d-block mb-1">Ryan Tompson</span>
                <small class="h4 font-weight-light text-muted"
                  >Web Developer</small
                >
              </h5>
              <div class="mt-3">
                <a
                  href="#"
                  class="btn btn-twitter btn-icon-only rounded-circle"
                >
                  <i class="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  class="btn btn-facebook btn-icon-only rounded-circle"
                >
                  <i class="fab fa-facebook"></i>
                </a>
                <a
                  href="#"
                  class="btn btn-dribbble btn-icon-only rounded-circle"
                >
                  <i class="fab fa-dribbble"></i>
                </a>
              </div>
            </div>
          </card>
          <!-- Image-Text card -->
          <div class="card">
            <!-- Card image -->
            <img
              class="card-img-top"
              src="~/static/img/theme/img-1-1000x900.jpg"
              alt="Image placeholder"
            />
            <!-- Card body -->
            <div class="card-body">
              <h5 class="h2 card-title mb-0">Get started with Argon</h5>
              <small class="text-muted"
                >by John Snow on Oct 29th at 10:23 AM</small
              >
              <p class="card-text mt-4">
                Argon is a great free UI package based on Bootstrap 4 that
                includes the most important components and features.
              </p>
              <a href="#!" class="btn btn-link px-0">View article</a>
            </div>
          </div>

          <!-- Basic with blockquote -->
          <card gradient="default">
            <h3 class="card-title text-white">Testimonial</h3>
            <blockquote class="blockquote text-white mb-0">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
              <footer class="blockquote-footer text-danger">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </card>
        </div>
        <div class="col-lg-4">
          <!-- Pricing -->
          <card
            gradient="success"
            header-classes="bg-transparent"
            footer-classes="bg-transparent"
            body-classes="px-lg-7"
            class="card-pricing border-0 text-center mb-4"
          >
            <!--Header-->
            <h4 slot="header" class="text-uppercase ls-1 text-white py-3 mb-0">
              Bravo pack
            </h4>
            <!--Card Body-->
            <div class="display-2 text-white">$49</div>
            <span class="text-white">per application</span>
            <ul class="list-unstyled my-4">
              <li>
                <div class="d-flex align-items-center">
                  <div>
                    <div
                      class="
                        icon icon-xs icon-shape
                        bg-white
                        shadow
                        rounded-circle
                      "
                    >
                      <i class="fas fa-terminal"></i>
                    </div>
                  </div>
                  <div>
                    <span class="pl-2 text-sm text-white"
                      >Complete documentation</span
                    >
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center">
                  <div>
                    <div
                      class="
                        icon icon-xs icon-shape
                        bg-white
                        shadow
                        rounded-circle
                      "
                    >
                      <i class="fas fa-pen-fancy"></i>
                    </div>
                  </div>
                  <div>
                    <span class="pl-2 text-sm text-white"
                      >Working materials in Sketch</span
                    >
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center">
                  <div>
                    <div
                      class="
                        icon icon-xs icon-shape
                        bg-white
                        shadow
                        rounded-circle
                      "
                    >
                      <i class="fas fa-hdd"></i>
                    </div>
                  </div>
                  <div>
                    <span class="pl-2 text-sm text-white"
                      >2GB cloud storage</span
                    >
                  </div>
                </div>
              </li>
            </ul>
            <base-button type="primary" class="mb-3"
              >Start free trial</base-button
            >
            <!--Footer-->
            <a slot="footer" href="#!" class="text-white">Request a demo</a>
          </card>
          <!-- Basic with action button -->
          <card>
            <!-- Card header -->
            <div slot="header" class="row align-items-center">
              <div class="col-8">
                <!-- Title -->
                <h5 class="h3 mb-0">Card title</h5>
              </div>
              <div class="col-4 text-right">
                <a href="#!" class="btn btn-sm btn-neutral">Action</a>
              </div>
            </div>
            <!-- Card body -->
            <p class="card-text mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
              non dolore est fuga nobis ipsum illum eligendi nemo iure repellat,
              soluta, optio minus ut reiciendis voluptates enim impedit
              veritatis officiis.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </card>
          <!-- Image overlay -->
          <div class="card bg-dark text-white border-0">
            <img
              class="card-img"
              src="~/static/img/theme/img-1-1000x600.jpg"
              alt="Card image"
            />
            <div class="card-img-overlay d-flex align-items-center">
              <div>
                <h5 class="h2 card-title text-white mb-2">Card title</h5>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p class="card-text text-sm font-weight-bold">
                  Last updated 3 mins ago
                </p>
              </div>
            </div>
          </div>
          <!-- Pricing card -->
          <card
            header-classes="bg-transparent"
            body-classes="px-lg-7"
            class="card-pricing border-0 text-center mb-4"
          >
            <!--Header-->
            <h4
              slot="header"
              class="text-uppercase ls-1 text-primary py-3 mb-0"
            >
              Bravo pack
            </h4>

            <!--Body-->
            <div class="display-2">$49</div>
            <span class="text-muted">per application</span>
            <ul class="list-unstyled my-4">
              <li>
                <div class="d-flex align-items-center">
                  <div>
                    <div
                      class="
                        icon icon-xs icon-shape
                        bg-gradient-primary
                        text-white
                        shadow
                        rounded-circle
                      "
                    >
                      <i class="fas fa-terminal"></i>
                    </div>
                  </div>
                  <div>
                    <span class="pl-2 text-sm">Complete documentation</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center">
                  <div>
                    <div
                      class="
                        icon icon-xs icon-shape
                        bg-gradient-primary
                        text-white
                        shadow
                        rounded-circle
                      "
                    >
                      <i class="fas fa-pen-fancy"></i>
                    </div>
                  </div>
                  <div>
                    <span class="pl-2 text-sm"
                      >Working materials in Sketch</span
                    >
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center">
                  <div>
                    <div
                      class="
                        icon icon-xs icon-shape
                        bg-gradient-primary
                        text-white
                        shadow
                        rounded-circle
                      "
                    >
                      <i class="fas fa-hdd"></i>
                    </div>
                  </div>
                  <div>
                    <span class="pl-2 text-sm">2GB cloud storage</span>
                  </div>
                </div>
              </li>
            </ul>
            <base-button type="primary" class="mb-3"
              >Start free trial</base-button
            >
            <!--Footer-->
            <a slot="footer" href="#!" class="text-muted">Request a demo</a>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RouteBreadcrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import BaseHeader from "@/components/argon-core/BaseHeader";
import StatsCard from "@/components/argon-core/Cards/StatsCard";

export default {
  layout: "DashboardLayout",
  components: {
    BaseHeader,
    RouteBreadcrumb,
    StatsCard,
  },
};
</script>
<style></style>
