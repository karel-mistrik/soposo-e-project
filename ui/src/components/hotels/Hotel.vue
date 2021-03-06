<template>
  <v-container>
    <v-row
      class="justify-center"
    >
      <v-col
        md="8"
        cols="12"
      >
        <v-row class="justify-center">
          <v-col
            cols="12"
            class="pt-0"
          >
            <v-img
              :src="certainHotel.Preview"
              height="400"
              width="100%"
              position="center center"
            >
              <div class="hero d-flex align-center justify-center">
                <span class="display-2 d-flex hero-title">{{ certainHotel.Name }}</span><br>
              </div>
            </v-img>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col
            class="text-left"
            cols="12"
          >
            <div class="text-center">
              <p class="title">
                {{ certainHotel.Description }}
              </p>
            </div>
            <div>
              <span class="subtitle-1">
                {{ certainHotel.City }}
              </span>
            </div>
            <div>
              <span class="subtitle-1">
                Ulice {{ certainHotel.Street }} - {{ certainHotel.Apt }}, {{ certainHotel.Zip }}
              </span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="room in selectedRooms"
            :key="room.RoomID"
            cols="12"
            md="4"
          >
            <v-card
              class="card"
              @click="redirect(room.RoomID)"
            >
              <v-img
                :src="room.Image"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title>{{ room.Name }}</v-card-title>
              </v-img>

              <v-card-subtitle class="text--primary pb-0">
                Počet hostů: {{ room.Capacity }}
              </v-card-subtitle>

              <v-card-text class="text--primary">
                <div class="line-clamp">
                  {{ room.Description }}
                </div>
              </v-card-text>

              <v-card-subtitle class="text--primary">
                Cena: <span class="font-weight-bold">
                  {{ sumInCrowns(room.Price) }}
                </span>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <ReviewListing
          v-if="certainHotel.HotelID"
          :hotel-i-d="certainHotel.HotelID.toString()"
        />
      </v-col>
      <div
        class="add-wrapper"
      >
        <v-btn
          tile
          class="mx-2 py-6"
          dark
          small
          color="primary"
          :to="{ name: 'reviewCreate'}"
        >
          <div class="d-flex align-center">
            <span class="mr-3 body-1">Přidat recenzi</span>
            <v-icon
              size="25"
              dark
            >
              mdi-plus
            </v-icon>
          </div>
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import ReviewListing from './ReviewListing.vue';

export default {
  name: 'Hotel',
  components: {
    ReviewListing,
  },
  computed: {
    ...mapGetters(['certainHotel', 'selectedRooms', 'loggedUser']),
    ...mapState(['hotels']),
    isAdmin() {
      return this.loggedUser ? this.loggedUser.Access === 'admin' : false
    },
  },
  watch: {

  },
  async created() {
    const found = await this.setHotel(this.$route.params.id);
    if (found) {
      await this.fetchRooms();
      await this.fetchRoomsByHotelId(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions(['setHotel', 'fetchRoomsByHotelId', 'fetchRooms', 'deleteRoomByHotel']),
    redirect(id) {
      this.$router.push({ name: 'roomReservation', params: { id } });
    },
    async deleteRoom(room) {
      await this.deleteRoomByHotel(room);
    },
  },
}
</script>

<style scoped>
    .hero{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        position: absolute;
    }

    .hero-title{
        color: white;
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
</style>
