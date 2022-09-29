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
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row justify-content-center">
        <div class="col-lg-8 card-wrapper">
          <!-- Grid system -->
          <card class="card">
            <h3 slot="header" class="mb-0">Grid system</h3>

            <div class="row row-example">
              <div class="col-sm">
                <span>One of three columns</span>
              </div>
              <div class="col-sm">
                <span>One of three columns</span>
              </div>
              <div class="col-sm">
                <span>One of three columns</span>
              </div>
            </div>
          </card>
          <!-- Equal-width -->
          <card>
            <h3 slot="header" class="mb-0">Equal-width</h3>

            <div class="row row-example">
              <div class="col">
                <span>1 of 2</span>
              </div>
              <div class="col">
                <span>2 of 2</span>
              </div>
            </div>
            <div class="row row-example">
              <div class="col">
                <span>1 of 3</span>
              </div>
              <div class="col">
                <span>2 of 3</span>
              </div>
              <div class="col">
                <span>3 of 3</span>
              </div>
            </div>
          </card>
          <!-- Setting one column width -->
          <card>
            <h3 slot="header" class="mb-0">Setting one column width</h3>

            <div class="row row-example">
              <div class="col">
                <span>1 of 3</span>
              </div>
              <div class="col-6">
                <span>2 of 3 (wider)</span>
              </div>
              <div class="col">
                <span>3 of 3</span>
              </div>
            </div>
            <div class="row row-example">
              <div class="col">
                <span>1 of 3</span>
              </div>
              <div class="col-5">
                <span>2 of 3 (wider)</span>
              </div>
              <div class="col">
                <span>3 of 3</span>
              </div>
            </div>
          </card>
          <!-- Variable width content -->
          <div class="card">
            <div class="card-header">
              <h3 class="mb-0">Variable width content</h3>
            </div>
            <div class="card-body">
              <div class="row row-example justify-content-md-center">
                <div class="col col-lg-2">
                  <span>1 of 3</span>
                </div>
                <div class="col-md-auto">
                  <span>Variable width content</span>
                </div>
                <div class="col col-lg-2">
                  <span>3 of 3</span>
                </div>
              </div>
              <div class="row row-example">
                <div class="col">
                  <span>1 of 3</span>
                </div>
                <div class="col-md-auto">
                  <span>Variable width content</span>
                </div>
                <div class="col col-lg-2">
                  <span>3 of 3</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Equal-width multi-row -->
          <card>
            <h3 slot="header" class="mb-0">Equal-width multi-row</h3>

            <div class="row row-example">
              <div class="col"><span>col</span></div>
              <div class="col"><span>col</span></div>
              <div class="w-100"></div>
              <div class="col"><span>col</span></div>
              <div class="col"><span>col</span></div>
            </div>
          </card>
          <!-- Mix and match -->
          <card>
            <h3 slot="header" class="mb-0">Mix and match</h3>

            <!-- Stack the columns on mobile by making one full-width and the other half-width -->
            <div class="row row-example">
              <div class="col-12 col-md-8"><span>.col-12 .col-md-8</span></div>
              <div class="col-6 col-md-4"><span>.col-6 .col-md-4</span></div>
            </div>
            <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
            <div class="row row-example">
              <div class="col-6 col-md-4"><span>.col-6 .col-md-4</span></div>
              <div class="col-6 col-md-4"><span>.col-6 .col-md-4</span></div>
              <div class="col-6 col-md-4"><span>.col-6 .col-md-4</span></div>
            </div>
            <!-- Columns are always 50% wide, on mobile and desktop -->
            <div class="row row-example">
              <div class="col-6"><span>.col-6</span></div>
              <div class="col-6"><span>.col-6</span></div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RouteBreadcrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import BaseHeader from "@/components/argon-core/BaseHeader";

export default {
  name: "grid-system",
  layout: "DashboardLayout",
  components: {
    BaseHeader,
    RouteBreadcrumb,
  },
};
</script>
<style></style>
