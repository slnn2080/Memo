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
      <div class="card mb-4">
        <!-- Card header -->
        <div class="card-header">
          <h3 class="mb-0">Form group in grid</h3>
        </div>
        <!-- Card body -->
        <div class="card-body">
          <!-- Form groups used in grid -->
          <div class="row">
            <div class="col-md-4">
              <base-input
                label="One of three cols"
                placeholder="One of three cols"
              />
            </div>
            <div class="col-md-4">
              <base-input
                label="One of three cols"
                placeholder="One of three cols"
              />
            </div>
            <div class="col-md-4">
              <base-input
                label="One of three cols"
                placeholder="One of three cols"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-3">
              <base-input
                label="One of four cols"
                placeholder="One of four cols"
              />
            </div>
            <div class="col-sm-6 col-md-3">
              <base-input
                label="One of four cols"
                placeholder="One of four cols"
              />
            </div>
            <div class="col-sm-6 col-md-3">
              <base-input
                label="One of four cols"
                placeholder="One of four cols"
              />
            </div>
            <div class="col-sm-6 col-md-3">
              <base-input
                label="One of four cols"
                placeholder="One of four cols"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <base-input
                label="One of two cols"
                placeholder="One of two cols"
              />
            </div>
            <div class="col-md-6">
              <base-input
                label="One of two cols"
                placeholder="One of two cols"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="card-wrapper">
            <!-- Form controls -->
            <div class="card">
              <!-- Card header -->
              <div class="card-header">
                <h3 class="mb-0">Form controls</h3>
              </div>
              <!-- Card body -->
              <div class="card-body">
                <form>
                  <base-input
                    label="Email address"
                    placeholder="name@example.com"
                  />

                  <base-input label="Example select">
                    <select class="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </base-input>

                  <base-input label="Example multiple select">
                    <select multiple="" class="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </base-input>

                  <base-input label="Example textarea">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea3"
                      rows="3"
                    ></textarea>
                  </base-input>
                </form>
              </div>
            </div>
            <!-- HTML5 inputs -->
            <div class="card">
              <!-- Card header -->
              <div class="card-header">
                <h3 class="mb-0">HTML5 inputs</h3>
              </div>
              <!-- Card body -->
              <div class="card-body">
                <form>
                  <div class="form-group row">
                    <label class="col-md-2 col-form-label form-control-label"
                      >Text</label
                    >
                    <div class="col-md-10">
                      <base-input placeholder="Jon Snow"></base-input>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="example-search-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Search</label
                    >
                    <div class="col-md-10">
                      <base-input
                        id="example-search-input"
                        placeholder="Tell me your secret ..."
                      ></base-input>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="example-email-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Email</label
                    >
                    <div class="col-md-10">
                      <base-input
                        type="email"
                        autocomplete="username email"
                        placeholder="argon@example.com"
                        id="example-email-input"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="example-url-input"
                      class="col-md-2 col-form-label form-control-label"
                      >URL</label
                    >
                    <div class="col-md-10">
                      <base-input
                        type="url"
                        placeholder="https://www.creative-tim.com"
                        id="example-url-input"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="example-tel-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Phone</label
                    >
                    <div class="col-md-10">
                      <base-input
                        type="tel"
                        placeholder="40-(770)-888-444"
                        id="example-tel-input"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="example-password-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Password</label
                    >
                    <div class="col-md-10">
                      <base-input
                        type="password"
                        autocomplete="current-password"
                        placeholder="password"
                        id="example-password-input"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="example-number-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Number</label
                    >
                    <div class="col-md-10">
                      <base-input
                        type="number"
                        placeholder="23"
                        id="example-number-input"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="example-datetime-local-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Datetime</label
                    >
                    <div class="col-md-10">
                      <base-input
                        type="datetime-local"
                        value="2018-11-23T10:30:00"
                        id="example-datetime-local-input"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="example-date-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Date</label
                    >
                    <div class="col-md-10">
                      <base-input
                        type="date"
                        value="2018-11-23"
                        id="example-date-input"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="example-month-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Month</label
                    >
                    <div class="col-md-10">
                      <base-input
                        type="month"
                        value="2018-11"
                        id="example-month-input"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="example-week-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Week</label
                    >
                    <div class="col-md-10">
                      <base-input
                        type="week"
                        value="2018-W23"
                        id="example-week-input"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="example-time-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Time</label
                    >
                    <div class="col-md-10">
                      <base-input
                        type="time"
                        value="10:30:00"
                        id="example-time-input"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="example-color-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Color</label
                    >
                    <div class="col-md-10">
                      <base-input
                        type="color"
                        value="#5e72e4"
                        id="example-color-input"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card-wrapper">
            <!-- Sizes -->
            <div class="card">
              <!-- Card header -->
              <div class="card-header">
                <h3 class="mb-0">Sizes</h3>
              </div>
              <!-- Card body -->
              <div class="card-body">
                <base-input
                  label="Large input"
                  input-classes="form-control-lg"
                  placeholder=".form-control-lg"
                />
                <base-input label="Default input" placeholder="Default input" />
                <base-input
                  label="Default input"
                  input-classes="form-control-sm"
                  placeholder=".form-control-sm"
                />
              </div>
            </div>
            <!-- Textareas -->
            <div class="card">
              <!-- Card header -->
              <div class="card-header">
                <h3 class="mb-0">Text inputs</h3>
              </div>
              <!-- Card body -->
              <div class="card-body">
                <form>
                  <base-input label="Basic textarea">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </base-input>
                  <base-input label="Unresizable textarea">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea2"
                      rows="3"
                      resize="none"
                    ></textarea>
                  </base-input>
                </form>
              </div>
            </div>
            <!-- Selects -->
            <div class="card">
              <!-- Card header -->
              <div class="card-header">
                <h3 class="mb-0">Select</h3>
              </div>
              <!-- Card body -->
              <div class="card-body">
                <form>
                  <base-input label="Basic select">
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </base-input>
                  <base-input label="Basic select">
                    <select
                      class="form-control"
                      id="exampleFormControlSelect2"
                      disabled=""
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </base-input>
                  <base-input label="Multiple select">
                    <label
                      class="form-control-label"
                      for="exampleFormControlSelect3"
                      >Multiple select</label
                    >
                    <select
                      multiple=""
                      class="form-control"
                      id="exampleFormControlSelect3"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </base-input>
                  <base-input
                    class="form-group"
                    label="Disabled multiple select"
                  >
                    <select
                      multiple=""
                      class="form-control"
                      id="exampleFormControlSelect4"
                      disabled=""
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </base-input>
                </form>
              </div>
            </div>
            <!-- File browser -->
            <div class="card">
              <!-- Card header -->
              <div class="card-header">
                <h3 class="mb-0">File browser</h3>
              </div>
              <!-- Card body -->
              <div class="card-body">
                <form>
                  <file-input @change="filesChange"></file-input>
                </form>
              </div>
            </div>
            <!-- Checkboxes and radios -->
            <div class="card">
              <!-- Card header -->
              <div class="card-header">
                <h3 class="mb-0">Checkboxes and radios</h3>
              </div>
              <!-- Card body -->
              <div class="card-body">
                <form>
                  <div class="row">
                    <div class="col-md-6">
                      <base-checkbox
                        v-model="checkboxes.unchecked"
                        class="mb-3"
                      >
                        Unchecked
                      </base-checkbox>

                      <base-checkbox v-model="checkboxes.checked" class="mb-3">
                        Checked
                      </base-checkbox>

                      <base-checkbox
                        v-model="checkboxes.unchecked"
                        disabled
                        class="mb-3"
                      >
                        Disabled Unchecked
                      </base-checkbox>

                      <base-checkbox
                        v-model="checkboxes.checked"
                        disabled
                        class="mb-3"
                      >
                        Disabled Checked
                      </base-checkbox>
                    </div>
                    <div class="col-md-6">
                      <base-radio
                        v-model="radios.radio1"
                        name="unchecked"
                        class="mb-3"
                      >
                        Unchecked
                      </base-radio>

                      <base-radio
                        v-model="radios.radio1"
                        name="checked"
                        class="mb-3"
                      >
                        Checked
                      </base-radio>

                      <base-radio
                        v-model="radios.radio2"
                        disabled
                        name="unchecked"
                        class="mb-3"
                      >
                        Unchecked
                      </base-radio>

                      <base-radio
                        v-model="radios.radio2"
                        disabled
                        name="checked"
                        class="mb-3"
                      >
                        Checked
                      </base-radio>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileInput from "@/components/argon-core/Inputs/FileInput";
export default {
  name: "form-elements",
  layout: "DashboardLayout",
  components: {
    FileInput,
  },
  data() {
    return {
      inputs: {
        file: [],
      },
      checkboxes: {
        unchecked: false,
        checked: true,
        uncheckedDisabled: false,
        checkedDisabled: true,
      },
      radios: {
        radio1: "checked",
        radio2: "checked",
      },
    };
  },
  methods: {
    filesChange(files) {
      this.inputs.file = files;
    },
  },
};
</script>
