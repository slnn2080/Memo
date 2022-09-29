# Profile edit

You have the option to edit the current logged in user's profile information (name, email, profile picture) and password. To access this page, just click the "**Examples/Profile**" link in the left sidebar or add **/profile** in the URL.

The `src\pages\examples\user-profile` is the folder with Vue components that handle the update of the user information and password.

## Edit profile component

```
<template>
  <div class="card">
    <div class="card-header">
      <h1>Edit Profile</h1>
    </div>
    <div class="card-body">
      <form ref="profile_form" @submit.prevent="handleProfileUpdate">
        <div class="form-group">
          <label class="form-control-label"> Profile Photo </label>
          <div
            v-if="image"
            class="profile-image card-img pb-4"
            :style="{
              'background-image': `url('${image}')`,
            }"
          ></div>
          <div v-else class="profile-image">
            <img src="/img/placeholder.jpg" />
          </div>
          <div class="image-upload">
            <base-button
              v-if="image"
              type="button"
              class="btn btn-sm btn-danger"
              @click="removeImage"
            >
              <span>
                <i class="fa fa-times" />
                Remove
              </span>
            </base-button>
            <base-button type="button" class="btn btn-sm btn-primary">
              <label v-if="!image" for="imageInput" class="mb-0"
                >Select image</label
              >
              <label v-else for="imageInput" class="mb-0">Change</label>
              <input
                id="imageInput"
                ref="imageInput"
                accept="image/*"
                type="file"
                style="display: none"
                @input="onSelectFile"
              />
            </base-button>
          </div>
        </div>
        <validation-error :errors="apiValidationErrors.attachment" />
        <base-input
          label="Name"
          prepend-icon="fas fa-user"
          placeholder="Your name"
          v-model="user.name"
        />
        <validation-error :errors="apiValidationErrors.name" />
        <base-input
          label="Email"
          prepend-icon="fas fa-envelope"
          placeholder="Email"
          v-model="user.email"
        />
        <validation-error :errors="apiValidationErrors.email" />
        <div class="my-4">
          <base-button
            type="button"
            class="btn btn-sm btn-primary"
            native-type="submit"
          >
            Submit
          </base-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import BaseInput from "~/components/argon-core/Inputs/BaseInput.vue";
import BaseButton from "~/components/argon-core/BaseButton.vue";
import formMixin from "@/mixins/form-mixin";
import ValidationError from "~/components/ValidationError.vue";

export default {
  name: "UserEditCard",

  components: {
    BaseInput,
    BaseButton,
    ValidationError,
  },

  mixins: [formMixin],

  props: {
    user: Object,
  },

  data() {
    return {
      image: null,
    };
  },

  methods: {
    async onSelectFile(e) {
      const input = this.$refs.imageInput;
      const files = input.files;

      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(files[0]);
      }
    },

    removeImage() {
      this.image = null;
    },

    async handleProfileUpdate() {
      if (["1", "2", "3"].includes(this.user.id)) {
        this.$notify({
          type: "danger",
          message: "You are not allowed not change data of default users.",
        });
        return;
      }
      try {
        if (this.image) {
          await this.$store.dispatch("users/upload", {
            user: this.user,
            image: this.$refs.imageInput.files[0],
            axios: this.$axios,
          });
          this.user.profile_image = await this.$store.getters["users/url"];
        }

        await this.$store.dispatch("profile/update", this.user);

        this.removeImage();
        this.unsetApiValidationErrors();
        this.$notify({
          type: "success",
          message: "Profile updated successfully.",
        });

        await this.$store.getters["profile/me"];
      } catch (error) {
        this.$notify({
          type: "danger",
          message: "Oops, something went wrong!",
        });
        this.setApiValidation(error.response.data.errors);
      }
    },
  },
};
</script>
```

## Edit password component

```
<template>
  <div class="card">
    <div class="card-header">
      <h1>Change Password</h1>
    </div>
    <div class="card-body">
      <form ref="password_form" @submit.prevent="handleChangePassword">
        <base-input
          v-model="password"
          type="password"
          name="new_password"
          autocomplete="on"
          class="mb-3"
          prepend-icon="fa fa-key"
          placeholder="New Password"
        />
        <validation-error :errors="apiValidationErrors.password" />

        <base-input
          v-model="password_confirmation"
          type="password"
          name="confirm_password"
          autocomplete="on"
          class="mb-3"
          prepend-icon="fa fa-key"
          placeholder="Confirm Password"
        />
        <validation-error :errors="apiValidationErrors.password_confirmation" />
        <div class="my-4">
          <base-button
            type="button"
            class="btn btn-sm btn-primary"
            native-type="submit"
          >
            Change Password
          </base-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import BaseInput from "~/components/argon-core/Inputs/BaseInput.vue";
import BaseButton from "~/components/argon-core/BaseButton.vue";
import formMixin from "@/mixins/form-mixin";
import ValidationError from "~/components/ValidationError.vue";

export default {
  name: "UserPasswordCard",

  components: {
    BaseInput,
    BaseButton,
    ValidationError,
  },

  mixins: [formMixin],

  props: {
    user: Object,
  },

  data() {
    return {
      password: null,
      password_confirmation: null,
    };
  },

  methods: {
    async handleChangePassword() {
      if (["1", "2", "3"].includes(this.user.id)) {
        this.$notify({
          type: "danger",
          message: "You are not allowed not change data of default users.",
        });
        return;
      }
      this.user.password = this.password;
      this.user.password_confirmation = this.password_confirmation;
      try {
        await this.$store.dispatch("users/update", this.user);
        this.$refs["password_form"].reset();
        this.unsetApiValidationErrors();

        this.$notify({
          type: "success",
          message: "Password changed successfully.",
        });
      } catch (error) {
        this.$notify({
          type: "danger",
          message: "Oops, something went wrong!",
        });
        this.setApiValidation(error.response.data.errors);
      }
    },
  },
};
</script>
```
