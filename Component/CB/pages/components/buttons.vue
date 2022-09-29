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
        <div class="col-lg-8 card-wrapper ct-example">
          <!-- Styles -->
          <div class="card">
            <div class="card-header">
              <h3 class="mb-0">Styles</h3>
            </div>
            <div class="card-body">
              <base-button icon type="primary">Button</base-button>
              <base-button icon type="primary">
                <span class="btn-inner--icon"
                  ><i class="ni ni-bag-17"></i
                ></span>
                <span class="btn-inner--text">With icon</span>
              </base-button>
              <base-button icon type="primary">
                <span class="btn-inner--icon"><i class="ni ni-atom"></i></span>
              </base-button>
            </div>
          </div>
          <!-- Colors -->
          <div class="card">
            <div class="card-header">
              <h3 class="mb-0">Colors</h3>
            </div>
            <div class="card-body">
              <base-button type="default">Default</base-button>
              <base-button type="primary">Primary</base-button>
              <base-button type="secondary">Secondary</base-button>
              <base-button type="info">Info</base-button>
              <base-button type="success">Success</base-button>
              <base-button type="danger">Danger</base-button>
              <base-button type="warning">Warning</base-button>
            </div>
          </div>
          <!-- Outline -->
          <div class="card">
            <div class="card-header">
              <h3 class="mb-0">Outline</h3>
            </div>
            <div class="card-body">
              <base-button outline type="default">Default</base-button>
              <base-button outline type="primary">Primary</base-button>
              <base-button outline type="secondary">Secondary</base-button>
              <base-button outline type="info">Info</base-button>
              <base-button outline type="success">Success</base-button>
              <base-button outline type="danger">Danger</base-button>
              <base-button outline type="warning">Warning</base-button>
            </div>
          </div>
          <!-- Sizes -->
          <div class="card">
            <div class="card-header">
              <h3 class="mb-0">Sizes</h3>
            </div>
            <div class="card-body">
              <base-button size="lg" type="primary">Large button</base-button>
              <base-button size="lg" type="secondary">Large button</base-button>
              <hr />
              <base-button size="sm" type="primary">Small button</base-button>
              <base-button size="sm" type="secondary">Small button</base-button>
              <hr />
              <base-button block type="primary">Block level button</base-button>
              <base-button block type="secondary"
                >Block level button</base-button
              >
            </div>
          </div>
          <!-- Group -->
          <div class="card">
            <div class="card-header">
              <h3 class="mb-0">Group</h3>
            </div>
            <div class="card-body">
              <div class="btn-group" role="group" aria-label="Basic example">
                <base-button type="secondary">Left</base-button>
                <base-button type="secondary" class="active"
                  >Middle</base-button
                >
                <base-button type="secondary">Right</base-button>
              </div>
              <hr />
              <div class="btn-group">
                <base-button type="info" class="active">1</base-button>
                <base-button type="info">2</base-button>
                <base-button type="info">3</base-button>
                <base-button type="info">4</base-button>
              </div>
              <div class="btn-group">
                <base-button type="default">5</base-button>
                <base-button type="default">6</base-button>
                <base-button type="default">7</base-button>
              </div>
            </div>
          </div>
          <!-- Social -->
          <div class="card">
            <div class="card-header">
              <h3 class="mb-0">Social</h3>
            </div>
            <div class="card-body">
              <base-button icon class="btn-facebook btn-icon">
                <span class="btn-inner--icon"
                  ><i class="fab fa-facebook"></i
                ></span>
                <span class="btn-inner--text">Facebook</span>
              </base-button>
              <base-button icon class="btn-twitter">
                <span class="btn-inner--icon"
                  ><i class="fab fa-twitter"></i
                ></span>
                <span class="btn-inner--text">Twitter</span>
              </base-button>
              <base-button icon class="btn-google-plus">
                <span class="btn-inner--icon"
                  ><i class="fab fa-google-plus-g"></i
                ></span>
                <span class="btn-inner--text">Google +</span>
              </base-button>
              <base-button icon class="btn-instagram">
                <span class="btn-inner--icon"
                  ><i class="fab fa-instagram"></i
                ></span>
                <span class="btn-inner--text">Instagram</span>
              </base-button>
              <base-button icon class="btn-pinterest">
                <span class="btn-inner--icon"
                  ><i class="fab fa-pinterest"></i
                ></span>
                <span class="btn-inner--text">Pinterest</span>
              </base-button>
              <base-button icon class="btn-youtube">
                <span class="btn-inner--icon"
                  ><i class="fab fa-youtube"></i
                ></span>
                <span class="btn-inner--text">Youtube</span>
              </base-button>
              <base-button icon class="btn-vimeo">
                <span class="btn-inner--icon"
                  ><i class="fab fa-vimeo-v"></i
                ></span>
                <span class="btn-inner--text">Vimeo</span>
              </base-button>
              <base-button icon class="btn-slack">
                <span class="btn-inner--icon"
                  ><i class="fab fa-slack"></i
                ></span>
                <span class="btn-inner--text">Slack</span>
              </base-button>
              <base-button icon class="btn-dribbble">
                <span class="btn-inner--icon"
                  ><i class="fab fa-dribbble"></i
                ></span>
                <span class="btn-inner--text">Dribbble</span>
              </base-button>
              <hr />
              <base-button class="btn-facebook btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-facebook"></i
                ></span>
              </base-button>
              <base-button class="btn-twitter btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-twitter"></i
                ></span>
              </base-button>
              <base-button class="btn-google-plus btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-google-plus-g"></i
                ></span>
              </base-button>
              <base-button class="btn-instagram btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-instagram"></i
                ></span>
              </base-button>
              <base-button class="btn-pinterest btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-pinterest"></i
                ></span>
              </base-button>
              <base-button class="btn-youtube btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-youtube"></i
                ></span>
              </base-button>
              <base-button class="btn-vimeo btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-vimeo-v"></i
                ></span>
              </base-button>
              <base-button class="btn-slack btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-slack"></i
                ></span>
              </base-button>
              <base-button class="btn-dribbble btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-dribbble"></i
                ></span>
              </base-button>
              <hr />
              <base-button round class="btn-facebook btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-facebook"></i
                ></span>
              </base-button>
              <base-button round class="btn-twitter btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-twitter"></i
                ></span>
              </base-button>
              <base-button round class="btn-google-plus btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-google-plus-g"></i
                ></span>
              </base-button>
              <base-button round class="btn-instagram btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-instagram"></i
                ></span>
              </base-button>
              <base-button round class="btn-pinterest btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-pinterest"></i
                ></span>
              </base-button>
              <base-button round class="btn-youtube btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-youtube"></i
                ></span>
              </base-button>
              <base-button round class="btn-vimeo btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-vimeo-v"></i
                ></span>
              </base-button>
              <base-button round class="btn-slack btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-slack"></i
                ></span>
              </base-button>
              <base-button round class="btn-dribbble btn-icon-only">
                <span class="btn-inner--icon"
                  ><i class="fab fa-dribbble"></i
                ></span>
              </base-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RouteBreadcrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import BaseHeader from "@/components/argon-core/BaseHeader";

export default {
  layout: "DashboardLayout",
  components: {
    BaseHeader,
    RouteBreadcrumb,
  },
};
</script>
<style>
.ct-example .btn {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
