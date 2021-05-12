<template>
  <v-container>
    <Title title="Pokoje" />
    <v-row
      class="justify-start"
    >
      <v-col
        v-for="room in filterRooms()"
        :key="room.RoomID"
        cols="12"
        md="3"
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
            >
              <v-icon>mdi-circle-edit-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Title from '../layout/Title.vue';

export default {
  name: 'RoomListing',
  components: {
    Title,
  },
  data() {
    return {
      rooms: null,
      filteredRoomss: [],
    }
  },
  computed: {
    ...mapGetters(['allRooms', 'loggedUser']),
    isAdmin() {
      return this.loggedUser ? this.loggedUser.Access === 'admin' : false
    },
  },
  async created() {
    this.rooms = await this.fetchRooms()
    this.filterRooms()
  },
  methods: {
    ...mapActions(['fetchRooms']),
    redirect(id) {
      this.$router.push({ name: 'roomReservation', params: { id } });
    },
    filterRooms() {
      if (this.$route.params.restrictedHotels && this.rooms) {
        // eslint-disable-next-line max-len
        const filtredrooms = this.rooms.filter(({ RoomID: id1 }) => !this.$route.params.restrictedHotels.some(({ RoomID: id2 }) => id2 === id1))
        console.log(filtredrooms.filter((room) => room.Capacity >= this.$route.params.capacity))
        return filtredrooms.filter((room) => room.Capacity >= this.$route.params.capacity)
      }
      return this.rooms
    },
  },
}
</script>

<style>
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
