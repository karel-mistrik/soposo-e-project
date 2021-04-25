<template>
  <v-container>
    <Title title="Pokoj" />
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <div>
          <h5 class="title">
            Popis pokoje:
            <span class="subtitle-1">
              {{ certainRoom.Description }}
            </span>
          </h5>
        </div>
        <div>
          <h5 class="title">
            Počet hostů: <span class="subtitle-1">{{ certainRoom.Capacity }}</span>
          </h5>
        </div>
        <div>
          <h5 class="title">
            Cena za noc: <span class="subtitle-1">{{ sumInCrowns(certainRoom.Price) }}</span>
          </h5>
        </div>
        <div>
          <h5 class="title">
            Název hotelu: <span class="subtitle-1">{{ certainHotel.Name }}</span>
          </h5>
        </div>
        <div>
          <h5 class="title">
            Adresa hotelu: <span class="subtitle-1">{{ certainHotel.Street }}
              {{ certainHotel.Apt }},
              {{ certainHotel.City }}
            </span>
          </h5>
        </div>
        <v-divider class="mt-4" />
        <v-col
          cols="12"
          class="px-0"
        >
          <v-row>
            <v-col cols="12">
              <h2 class="subtitle-1 font-weight-bold">
                Služby hotelu pro tento pokoj
              </h2>
            </v-col>
          </v-row>
          <v-row class="justify-start">
            <v-col
              v-for="item in icons"
              :key="item.serviceid"
              cols="auto"
              class="d-flex"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-sheet
                    class="mt-auto mb-auto mr-auto d-flex"
                    color="primary"
                    height="60"
                    v-bind="attrs"
                    width="60"
                    v-on="on"
                  >
                    <v-icon
                      class="ma-auto"
                      size="30"
                      color="white"
                    >
                      {{ `mdi-${iconsEnuims[item.serviceid]}` }}
                    </v-icon>
                  </v-sheet>
                </template>
                <span class="text--accent-4">{{ item.name }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <ReservationForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Title from '../layout/Title';
import ReservationForm from './ReservationForm.vue';

export default {
  name: 'RoomReservation',
  components: {
    Title,
    ReservationForm,
  },
  data() {
    return {
      icons: [],
      iconsEnuims: {
        2: 'wifi',
        3: 'arm-flex',
        4: 'shower',
        5: 'parking',
        6: 'glass-cocktail',
        7: 'silverware',

      },
    }
  },
  computed: {
    ...mapGetters(['certainRoom', 'certainHotel']),
  },
  async created() {
    await this.setRoom(this.$route.params.id);
    await this.fetchHotels();
    await this.setHotel(this.certainRoom.HotelID);
    this.icons = await this.getServices(this.certainRoom.HotelID)
  },
  methods: {
    ...mapActions(['setRoom', 'fetchHotels', 'setHotel', 'getServices']),
  },
}
</script>

<style>

</style>
