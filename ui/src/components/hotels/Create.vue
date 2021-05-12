<template>
  <v-container fill-height>
    <v-row
      class="justify-center"
      align="center"
    >
      <v-col cols="12">
        <h1 class="display text-center">
          Nový hotel
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
              rules="required|alpha_spaces"
              name="popis"
            >
              <v-text-field
                v-model="hotel.description"
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
                :items="['Česká Republika']"
                label="Země"
                :error-messages="errors[0]"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required|alpha_spaces"
              name="region"
            >
              <v-select
                v-model="hotel.region"
                :items="regions"
                label="Kraj"
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
            >
            <input
              class="custom-input"
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
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'Create',
  components: {
    ValidationProvider, ValidationObserver,
  },
  data() {
    return {

      remoteUrl: '',

      hotel: {
        name: '',
        description: '',
        country: '',
        region: '',
        city: '',
        street: '',
        apt: 0,
        zip: '',
        adressID: '',
        preview: '',
        hotelImage: '',
      },
      regions: [
        'Pardubický kraj',
        'Liberecký kraj',
        'Ústecký kraj',
        'Karlovarský kraj',
        'Plzeňský kraj',
        'Jihočeský kraj',
        'Kraj Vysočina',
        'Kralovéhradecký kraj',
        'Středočeský kraj',
        'Jihomoravský kraj',
        'Olomoucký kraj',
        'Moravskoslezský kraj',
        'Zlínský kraj',
      ],
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
    ...mapActions(['createHotel']),
    async onSubmit() {
      const isValid = await this.$refs.createForm.validate()
      if (isValid) {
        await this.createHotel(this.hotel);
        await this.$router.push({ name: 'hotels' })
        this.saveDetails('Hotel vytvořen!', 'secondary', 2000)
      }
    },
  },
}
</script>

<style></style>
