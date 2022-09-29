<template>
  <card>
    <!-- Card header -->
    <h3 slot="header" class="mb-0">Browser defaults</h3>

    <!-- Card body -->
    <div class="row">
      <div class="col-lg-8">
        <p class="mb-0">
          Not interested in custom validation feedback messages or writing
          JavaScript to change form behaviors? All good, you can use the browser
          defaults. Try submitting the form below. Depending on your browser and
          OS, you’ll see a slightly different style of feedback.
          <br /><br />
          While these feedback styles cannot be styled with CSS, you can still
          customize the feedback text through JavaScript.
        </p>
      </div>
    </div>
    <hr />
    <form class="needs-validation" @submit.prevent="submit">
      <div class="form-row">
        <div class="col-md-4">
          <base-input
            label="First name"
            name="First name"
            placeholder="First name"
            required
            v-model="model.firstName"
          >
          </base-input>
        </div>

        <div class="col-md-4">
          <base-input
            label="Last name"
            name="Last name"
            placeholder="Last name"
            required
            v-model="model.lastName"
          >
          </base-input>
        </div>

        <div class="col-md-4">
          <base-input
            label="Username"
            name="Username"
            placeholder="Username"
            required
            v-model="model.username"
          >
          </base-input>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6">
          <base-input
            label="City"
            name="City"
            placeholder="City"
            required
            v-model="model.city"
          >
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input
            label="State"
            name="State"
            placeholder="State"
            required
            v-model="model.state"
          >
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input
            label="Zip"
            name="Zip"
            placeholder="Zip"
            required
            v-model="model.zip"
          >
          </base-input>
        </div>
      </div>
      <base-input>
        <base-checkbox v-model="model.agree">
          Agree to terms and conditions
        </base-checkbox>
      </base-input>
      <base-button type="primary" native-type="submit">Submit form</base-button>
    </form>
  </card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      model: {
        firstName: "Mark",
        lastName: "Otto",
        username: "",
        city: "",
        state: "",
        zip: "",
        agree: false,
      },
    };
  },
  methods: {
    async submit() {},
  },
};
</script>
<style></style>
