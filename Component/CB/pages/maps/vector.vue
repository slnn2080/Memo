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
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body pt-0">
              <no-ssr>
                <world-map
                  class="map map-big"
                  :map-data="mapData"
                  :points="points"
                >
                </world-map>
              </no-ssr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "DashboardLayout",
  data() {
    return {
      mapData: {
        AUS: 760,
        BRA: 900,
        CAN: 120,
        DEU: 1300,
        FRA: 540,
        GBR: 690,
        GEO: 200,
        IND: 200,
        ROU: 600,
        RUS: 757,
        USA: 1800,
      },
      points: [
        {
          name: "Brazil",
          centered: "BRA",
        },
        {
          name: "France",
          centered: "FRA",
        },
        {
          name: "Italy",
          centered: "ITA",
        },
        {
          name: "Oman",
          centered: "OMN",
        },
        {
          name: "Indonesia",
          centered: "IDN",
        },
        {
          name: "Romania",
          centered: "ROU",
        },
      ],
    };
  },
};
</script>
<style>
#worldMap {
  width: 100%;
}
</style>
