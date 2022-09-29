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
        <div class="col-lg-6">
          <div class="card-wrapper">
            <!-- Input groups -->
            <card>
              <!-- Card header -->
              <h3 slot="header" class="mb-0">Input groups</h3>
              <!-- Card body -->
              <form>
                <!-- Input groups with icon -->
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      prepend-icon="fas fa-user"
                      placeholder="Your name"
                    ></base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      prepend-icon="fas fa-envelope"
                      placeholder="Email"
                    ></base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      append-icon="fas fa-map-marker"
                      placeholder="Location"
                    ></base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      append-icon="fas fa-eye"
                      placeholder="Password"
                      type="password"
                    ></base-input>
                  </div>
                </div>
                <!-- Input groups with icon -->
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      prepend-icon="fas fa-credit-card"
                      placeholder="Payment Method"
                    >
                      <small slot="append" class="font-weight-bold">USD</small>
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      append-icon="fas fa-phone"
                      prepend-icon="fas fa-globe-americas"
                      placeholder="Phone"
                    >
                    </base-input>
                  </div>
                </div>
              </form>
            </card>
            <!-- Dropdowns -->
            <card>
              <!-- Card header -->
              <h3 slot="header" class="mb-0">Selects</h3>
              <!-- Card body -->
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <base-input label="Simple select">
                      <el-select
                        v-model="selects.simple"
                        filterable
                        placeholder="Simple select"
                      >
                        <el-option
                          v-for="option in selectOptions"
                          :key="option.label"
                          :label="option.label"
                          :value="option.value"
                        >
                        </el-option>
                      </el-select>
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input label="Multiple select">
                      <el-select
                        v-model="selects.multiple"
                        multiple
                        filterable
                        placeholder="Multiple select"
                      >
                        <el-option
                          v-for="option in selectOptions"
                          :key="option.label"
                          :label="option.label"
                          :value="option.value"
                        >
                        </el-option>
                      </el-select>
                    </base-input>
                  </div>
                </div>
              </form>
            </card>
            <!-- Datepicker -->
            <div class="card">
              <!-- Card header -->
              <div class="card-header">
                <h3 class="mb-0">Datepicker</h3>
              </div>
              <!-- Card body -->
              <div class="card-body">
                <form>
                  <div class="row">
                    <div class="col-md-6">
                      <base-input label="Date picker">
                        <flat-picker
                          slot-scope="{ focus, blur }"
                          @on-open="focus"
                          @on-close="blur"
                          :config="{ allowInput: true }"
                          class="form-control datepicker"
                          v-model="dates.simple"
                        >
                        </flat-picker>
                      </base-input>
                    </div>
                    <div class="col-md-6">
                      <base-input label="Range picker">
                        <flat-picker
                          slot-scope="{ focus, blur }"
                          @on-open="focus"
                          @on-close="blur"
                          :config="{ allowInput: true, mode: 'range' }"
                          class="form-control datepicker"
                          v-model="dates.range"
                        >
                        </flat-picker>
                      </base-input>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!-- Text editor -->
            <div class="card">
              <!-- Card header -->
              <div class="card-header">
                <h3 class="mb-0">Text editor</h3>
              </div>
              <!-- Card body -->
              <div class="card-body">
                <form>
                  <html-editor></html-editor>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card-wrapper">
            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Tags</h3>
              <!--Card Body-->
              <tags-input v-model="inputs.tags"></tags-input>
            </card>

            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Toggle buttons</h3>
              <!--Card Body-->
              <base-switch
                class="mr-1"
                on-text="On"
                off-text="Off"
              ></base-switch>
              <base-switch
                class="mr-1"
                v-model="switches.primary"
              ></base-switch>
              <base-switch
                class="mr-1"
                v-model="switches.default"
                type="default"
              ></base-switch>
              <base-switch
                class="mr-1"
                v-model="switches.danger"
                type="danger"
              ></base-switch>
              <base-switch
                class="mr-1"
                v-model="switches.warning"
                type="warning"
              ></base-switch>
              <base-switch
                class="mr-1"
                v-model="switches.success"
                type="success"
              ></base-switch>
              <base-switch
                class="mr-1"
                v-model="switches.info"
                type="info"
              ></base-switch>
            </card>

            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Sliders</h3>
              <!--Card Body-->

              <base-slider v-model="sliders.simple"></base-slider>

              <div class="mt-3 row">
                <div class="col-6">
                  <span class="range-slider-value">{{ sliders.simple }}</span>
                </div>
              </div>

              <base-slider
                class="mt-5"
                v-model="sliders.range"
                :range="{ min: 100, max: 500 }"
              ></base-slider>
              <div class="mt-3 row">
                <div class="col-6">
                  <span class="range-slider-value">{{ sliders.range[0] }}</span>
                </div>
                <div class="text-right col-6">
                  <span class="range-slider-value value-high">{{
                    sliders.range[1]
                  }}</span>
                </div>
              </div>
            </card>

            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Dropzone</h3>
              <!--Card Body-->

              <dropzone-file-upload
                v-model="inputs.fileSingle"
              ></dropzone-file-upload>

              <dropzone-file-upload
                v-model="inputs.fileMultiple"
                multiple
              ></dropzone-file-upload>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Select, Option } from "element-ui";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import HtmlEditor from "@/components/argon-core/Inputs/HtmlEditor";
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import DropzoneFileUpload from "@/components/argon-core/Inputs/DropzoneFileUpload";
import BaseSlider from "@/components/argon-core/BaseSlider";

export default {
  name: "form-components",
  layout: "DashboardLayout",
  components: {
    HtmlEditor,
    TagsInput,
    DropzoneFileUpload,
    BaseSlider,
    flatPicker,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      selectOptions: [
        {
          label: "Alerts",
          value: "Alerts",
        },
        {
          label: "Badges",
          value: "Badges",
        },
        {
          label: "Buttons",
          value: "Buttons",
        },
        {
          label: "Cards",
          value: "Cards",
        },
        {
          label: "Forms",
          value: "Forms",
        },
        {
          label: "Modals",
          value: "Modals",
        },
      ],
      selects: {
        simple: "Badges",
        multiple: ["Alerts", "Buttons"],
      },
      dates: {
        simple: new Date(),
        range: "2019-04-19 to 2019-04-24",
      },
      inputs: {
        tags: ["BUCHAREST", "IASI", "TIMISOARA"],
        fileSingle: [],
        fileMultiple: [],
      },
      switches: {
        off: false,
        primary: true,
        default: true,
        danger: true,
        warning: true,
        success: true,
        info: true,
      },
      sliders: {
        simple: 50,
        range: [200, 400],
      },
    };
  },
};
</script>
