<template>
  <div class="card">
    <div class="card-header">
      <h1>Edit Profile</h1>
    </div>
    <div class="card-body">
      <form ref="profile_form" @submit.prevent="handleProfileUpdate">
        <div class="form-group">
          <label class="form-control-label"> Picture </label>
          <div v-if="image" class="profile-image card-img pb-4">
            <img :src="`${image}`" class="profile-image argon-image" />
          </div>
          <div v-else class="profile-image">
            <img src="/img/placeholder.jpg" class="argon-image" />
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
    user: {
      type: Object,
      default: null,
    },
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
      if (this.$isDemo == 1 && ["1", "2", "3"].includes(this.user.id)) {
        this.$notify({
          type: "danger",
          message: "You are not allowed not change data of default users.",
        });
        return;
      } else
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
