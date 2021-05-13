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
                v-model="hotel.name"
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
                v-model="hotel.description"
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
                v-model="hotel.country"
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
                v-model="hotel.region"
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
                v-model="hotel.city"
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
                v-model="hotel.street"
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
                v-model="hotel.apt"
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
                v-model="hotel.zip"
                label="PSC"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <img
                :src="hotel.preview"
                alt="card_image"
                style="max-width: 100%"
            >
            <input
                class="pure-material-button-contained"
                type="file"
                accept="image/*"
                @change="handleImage"
            >
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
      hotel: {},
    }
  },
  computed: {
    ...mapGetters(['certainHotel']),
    ...mapState(['hotels']),
  },
  created() {
    this.setHotel(this.$route.params.id)
    this.hotel = {
      addressId: this.hotels.hotel.AddressID,
      apt: this.hotels.hotel.Apt,
      city: this.hotels.hotel.City,
      country: this.hotels.hotel.Country,
      description: this.hotels.hotel.Description,
      hotelId: this.hotels.hotel.HotelID,
      name: this.hotels.hotel.Name,
      preview: this.hotels.hotel.Preview,
      region: this.hotels.hotel.Region,
      street: this.hotels.hotel.Street,
      zip: this.hotels.hotel.Zip,
    }
  },
  methods: {
    handleImage(e) {
      const selectedImage = e.target.files[0]; // get first file
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.hotel.preview = e.target.result;
        this.uploadImage();
      };
      reader.readAsDataURL(fileObject);
    },
    uploadImage() {
      // axios.post('http://127.0.0.1:8081/upload', { image })
      //   .then((response) => {
      //     this.remoteUrl = response.data.url;
      //   })
      //   .catch((err) => new Error(err.message))
    },
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
