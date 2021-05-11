<template>
  <v-container fill-height>
    <v-row
      class="justify-center"
      align="center"
    >
      <v-col cols="12">
        <h1 class="display text-center">
          Editace hotelu
        </h1>
      </v-col>
      <v-col
        cols="11"
        md="4"
      >
        <v-card
          flat
          outlined
          class="pa-5"
          rounded="0"
        >
          <validation-observer
            ref="form"
            tag="form"
            @submit.prevent="onSubmit"
          >
            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha_spaces"
              name="nazev"
            >
              <v-text-field
                v-model="hotel.Name"
                label="Název"
                :error-messages="errors[0]"
              />
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="popis"
            >
              <v-textarea
                v-model="hotel.Description"
                auto-grow
                label="Popis"
                :error-messages="errors[0]"
              />
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha_spaces"
              name="zeme"
            >
              <v-select
                v-model="hotel.Country"
                label="Zeme"
                :items="['Česká Republika']"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha_spaces"
              name="zeme"
            >
              <v-text-field
                v-model="hotel.Region"
                label="Region"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha_spaces"
              name="mesto"
            >
              <v-text-field
                v-model="hotel.City"
                label="Mesto"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha_spaces"
              name="ulice"
            >
              <v-text-field
                v-model="hotel.Street"
                label="Ulice"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha_num"
              name="cislo popisne"
            >
              <v-text-field
                v-model="hotel.Apt"
                label="Cislo popisne"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha_num"
              name="psc"
            >
              <v-text-field
                v-model="hotel.Zip"
                label="PSC"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required|url"
              name="odkaz na obrazek"
            >
              <v-text-field
                v-model="hotel.Preview"
                label="Odkaz na obrazek"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <v-row>
              <v-col>
                <v-btn
                  tile
                  color="primary"
                  type="submit"
                >
                  odešli
                </v-btn>
              </v-col>
            </v-row>
          </validation-observer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'HotelEdit',
  components: {
    ValidationProvider, ValidationObserver,
  },
  data() {
    return {
      hotel: {
        Country: 'Česká Republika',
      },
    }
  },
  computed: {
    ...mapGetters(['certainHotel']),
    ...mapState(['states']),
  },
  created() {
    this.setHotel(this.$route.params.id)
    this.hotel = { ...this.states.hotel }
    this.hotel.Country = 'Česká Republika'
    console.log(this.hotel)
  },
  methods: {
    ...mapActions(['setHotel', 'editHotel']),
    async onSubmit() {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        await this.editHotel(this.hotel);
        await this.$router.push({ name: 'hotels' })
        this.saveDetails('Hotel upraven!', 'secondary', 2000)
      }
    },
  },
}
</script>

<style>

</style>
