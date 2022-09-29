<template>
  <card>
    <!-- Card header -->
    <h3 slot="header" class="mb-0">Custom styles</h3>

    <!-- Card body -->
    <div class="row">
      <div class="col-lg-8">
        <p class="mb-0">
          For custom form validation messages, you’ll need to provide error
          messages to your
          <code>&lt;base-input&gt;</code> components. This disables the browser
          default feedback tooltips, but still provides access to the form
          validation APIs in JavaScript. <br /><br />
          When attempting to submit, you’ll see the<code>.is-valid</code> and
          <code>.is-invalid</code> classes applied to your form controls.
        </p>
      </div>
    </div>
    <hr />
    <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
      <form
        class="needs-validation"
        @submit.prevent="handleSubmit(firstFormSubmit)"
      >
        <div class="form-row">
          <div class="col-md-4">
            <base-input
              label="First name"
              name="First name"
              placeholder="First name"
              success-message="Looks good!"
              rules="required"
              v-model="model.firstName"
            >
            </base-input>
          </div>

          <div class="col-md-4">
            <base-input
              label="Last name"
              name="Last name"
              placeholder="Last name"
              rules="required"
              success-message="Looks good!"
              v-model="model.lastName"
            >
            </base-input>
          </div>

          <div class="col-md-4">
            <base-input
              label="Username"
              name="Username"
              placeholder="Username"
              rules="required"
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
              rules="required"
              v-model="model.city"
            >
            </base-input>
          </div>
          <div class="col-md-3">
            <base-input
              label="State"
              name="State"
              placeholder="State"
              rules="required"
              v-model="model.state"
            >
            </base-input>
          </div>
          <div class="col-md-3">
            <base-input
              label="Zip"
              name="Zip"
              placeholder="Zip"
              rules="required"
              v-model="model.zip"
            >
            </base-input>
          </div>
        </div>
        <base-input :rules="{ required: { allowFalse: false } }" name="Terms">
          <base-checkbox v-model="model.agree">
            Agree to terms and conditions
          </base-checkbox>
        </base-input>
        <base-button type="primary" native-type="submit"
          >Submit form</base-button
        >
      </form>
    </validation-observer>
  </card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      validated: false,
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
    async firstFormSubmit() {
      // Form submit here
    },
  },
};
</script>
<style></style>
