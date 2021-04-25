<template>
  <v-container fill-height>
    <v-row
      class="justify-center"
      align="center"
    >
      <v-col cols="12">
        <h1 class="display text-center">
          Nová recenze
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
            ref="createForm"
            tag="form"
            @submit.prevent="onSubmit(certainHotel.HotelID)"
          >
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="nazev"
            >
              <div class="text-center">
                <v-rating
                  v-model="review.stars"
                  background-color="primary"
                  color="primary"
                  medium
                  :error-messages="errors[0]"
                />
              </div>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha_spaces"
              name="nazev"
            >
              <v-text-field
                v-model="review.text"
                label="Obsah recenze"
                :error-messages="errors[0]"
              />
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="odkaz na obrazek"
            >
              <v-text-field
                v-model="review.photo"
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
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ReviewCreate',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      review: {
        stars: 0,
        text: '',
        photo: '',
      },
    }
  },
  computed: {
    ...mapGetters(['certainHotel', 'loggedUser']),
  },
  methods: {
    ...mapActions(['createReview']),
    async onSubmit(id) {
      const isValid = await this.$refs.createForm.validate()
      if (isValid) {
        this.review.hotelId = this.certainHotel.HotelID;
        this.review.customerId = this.loggedUser.CustomerID;
        await this.createReview(this.review);
        await this.$router.push({ name: 'hotel', params: { id } });
        await this.saveDetails('Rezervace přidána!', 'secondary', 2000)
      }
    },
  },
}
</script>

<style>
</style>
