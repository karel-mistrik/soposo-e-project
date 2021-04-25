<template>
  <v-container class="px-4">
    <Title title="Hotely" />
    <v-row class="justify-center mx-md-10">
      <v-col
        cols="12"
        md="3"
      >
        <FilterComponent />
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <v-row>
          <v-col
            v-for="hotel in filteredHotels"
            :key="hotel.HotelID"
            cols="12"
            md="4"
          >
            <v-card
              class="card"
              min-height="400"
              @click="redirect(hotel.HotelID)"
            >
              <v-img
                :src="hotel.Preview"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="hotel.Name" />
              </v-img>

              <v-card-subtitle class="pb-0">
                {{ hotel.City }}
              </v-card-subtitle>

              <v-card-subtitle class="pt-0">
                {{ hotel.Street }} {{ hotel.Apt }}
              </v-card-subtitle>

              <v-card-text class="text--primary">
                <div class="line-clamp">
                  {{ hotel.Description }}
                </div>
              </v-card-text>

              <div
                v-if="isAdmin"
                class="delete-wrapper"
              >
                <v-btn
                  color="secondary"
                  class="mx-2"
                  fab
                  dark
                  x-small
                  @click.stop="deleteHotelCall(hotel)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
              <div
                v-if="isAdmin"
                class="edit-wrapper"
              >
                <v-btn
                  color="accent"
                  class="mx-2"
                  fab
                  dark
                  x-small
                  @click.stop="editHotel(hotel.HotelID)"
                >
                  <v-icon>mdi-circle-edit-outline</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer />
    </v-row>
    <div
      v-if="isAdmin"
      class="add-wrapper"
    >
      <v-btn
        tile
        class="mx-2 py-6"
        dark
        small
        color="primary"
        :to="{ name: 'hotelCreate'}"
      >
        <div class="d-flex align-center">
          <span class="mr-3 body-1">Přidat hotel</span>
          <v-icon
            size="25"
            dark
          >
            mdi-plus
          </v-icon>
        </div>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Title from '../layout/Title.vue';
import FilterComponent from '../layout/Filter.vue';

export default {
  name: 'Listing',
  components: {
    Title,
    FilterComponent,
  },
  computed: {
    ...mapGetters(['filteredHotels', 'loggedUser']),
    isAdmin() {
      return this.loggedUser ? this.loggedUser.Access === 'admin' : false
    },
  },
  created() {
    this.fetchHotels();
  },
  methods: {
    ...mapActions(['fetchHotels', 'deleteHotel', 'setHotel']),
    redirect(id) {
      this.$router.push({ name: 'hotel', params: { id } })
    },
    async deleteHotelCall(hotel) {
      await this.deleteHotel(hotel)
      await this.saveDetails('Hotel smazán!', 'secondary', 2000)
    },
    editHotel(id) {
      this.setHotel(id)
      this.$router.push({ name: 'hotelEdit', params: { id } })
    },
  },
}
</script>

<style scoped>
.card{
  z-index: 0;
}

.add-wrapper{
  position: fixed;
  right: 32px;
  bottom: 32px;
}

.delete-wrapper{
  position: absolute;
  right: -22px;
  top: -15px;
  z-index: 1;
}

.edit-wrapper{
  position: absolute;
  right: -22px;
  top: 25px;
  z-index: 1;
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
