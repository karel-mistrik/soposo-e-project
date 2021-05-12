<template>
  <v-container fill-height>
    <v-row
      class="justify-center"
      align="center"
    >
      <v-col cols="12">
        <h1 class="display text-center">
          Registrace
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
            ref="formRegister"
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
              name="email"
            >
              <v-text-field
                v-model="user.password"
                label="Heslo"
                :counter="20"
                :error-messages="errors[0]"
                type="password"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="email"
            >
              <v-text-field
                v-model="user.name"
                name="name"
                label="Jméno"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="email"
            >
              <v-text-field
                v-model="user.surname"
                name="surname"
                label="Příjmení"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="email"
            >
              <v-text-field
                v-model="user.alias"
                name="alias"
                label="Alias"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required|numeric"
              name="telefon"
            >
              <v-text-field
                v-model="user.phone"
                name="phone"
                label="Telefonní číslo"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="email"
            >
              <v-select
                v-model="user.gender"
                label="Pohlaví"
                :items="['Muž', 'Žena', 'Jiné']"
                single
                :error-messages="errors[0]"
              />
            </validation-provider>
            <v-checkbox
              label="Souhlasím s podmínkami"
              required
            />
            <v-btn
              tile
              color="primary"
              type="submit"
            >
              submit
            </v-btn>
          </validation-observer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/api';
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'Registration',
  components: {
    ValidationObserver, ValidationProvider,
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
        name: '',
        surname: '',
        alias: '',
        phone: '',
        gender: '',
      },
    }
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.formRegister.validate()
      if (isValid) {
        await api.post('/register', {
          ...this.user,
        });
        await this.$router.push({ name: 'login' })
        await this.saveDetails('Registrován/a!', 'accent', 1000)
      }
    },
  },
}
</script>

<style>

</style>
