# Login

The login functionality is fully implemented in our theme helping you to start your project in no time. To login into dashboard you just have to add **/login** in the URL and fill the login form with one of the credentials (user: **admin@jsonapi.com**, **creator@jsonapi.com**, **member@jsonapi.com** and password: **secret**).

The `src\pages\login.vue` is the Vue component which handles the login functinality. You can easily adapt it to your needs.

## Login card

```
<div class="container mt--9 pb-5">
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary border-0 mb-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>
          <div class="btn-wrapper text-center">
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="~/static/img/icons/common/github.svg"
              /></span>
              <span class="btn-inner--text">Github</span>
            </a>
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="~/static/img/icons/common/google.svg"
              /></span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Or sign in with credentials</small>
          </div>

          <form class="needs-validation" @submit.prevent="handleSubmit()">
            <base-input
              alternative
              class="mb-3"
              name="Email"
              prepend-icon="ni ni-email-83"
              placeholder="Email"
              v-model="form.data.attributes.email"
            >
            </base-input>
            <validation-error :errors="apiValidationErrors.email" />

            <base-input
              alternative
              class="mb-3"
              name="Password"
              prepend-icon="ni ni-lock-circle-open"
              type="password"
              placeholder="Password"
              v-model="form.data.attributes.password"
            >
            </base-input>
            <validation-error :errors="apiValidationErrors.password" />

            <div class="text-center">
                  <!-- <base-button type="submit" @click.prevent="handleSubmit" class="my-4">Sigin</base-button> -->
              <base-button type="primary" native-type="submit" class="my-4"
                >Sign in</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/password/reset" class="text-light"
            ><small>Forgot password?</small></router-link
          >
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"
            ><small>Create new account</small></router-link
          >
        </div>
      </div>
    </div>
  </div>
</div>
```
