<template>
  <v-container fill-height>
    <v-row
      class="justify-center"
      align="center"
    >
      <v-col cols="12">
        <h1 class="display text-center">
          Přihlášení
        </h1>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          flat
          outlined
          class="pa-5"
          rounded="0"
        >
          <validation-observer
            ref="formLogin"
            tag="form"
            @submit.prevent="onSubmit"
          >
            <validation-provider
              v-slot="{ errors }"
              rules="required|email"
              name="email"
            >
              <v-text-field
                v-model="user.email"
                label="E-mail"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="heslo"
            >
              <v-text-field
                v-model="user.password"
                label="Heslo"
                :counter="20"
                :type="'password'"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <div class="d-flex align-center mt-2">
              <v-btn
                tile
                color="primary"
                type="submit"
              >
                přihlásit
              </v-btn>
              <span class="ml-3">
                Nemáte ještě účet?
                <router-link :to="{name: 'registration'}">
                  Registrujte se.
                </router-link>
              </span>
            </div>
          </validation-observer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'Login',
  components: {
    ValidationObserver, ValidationProvider,
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    async onSubmit() {
      const isValid = await this.$refs.formLogin.validate()
      if (isValid) {
        await this.loginUser(this.user);
        await this.$router.push({ name: 'home' })
        this.saveDetails('Vítejte!', 'accent', 1000)
      }
    },
  },
}
</script>

<style>

</style>
