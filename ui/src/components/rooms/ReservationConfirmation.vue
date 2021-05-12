<template>
  <v-container>
    <Title title="Shrnuti rezervace" />
    <v-row class="justify-center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          flat
          outlined
          class="pa-5"
          rounded="0"
        >
          <div>
            <h5 class="title">
              Status: <span class="subtitle-1">{{ getStatus(getReservation.status) }}</span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Počet hostů: <span class="subtitle-1">{{ getReservation.numberOfGuests }}</span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Cena: <span class="subtitle-1">{{ sumInCrowns(getReservation.price) }}</span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Od: <span class="subtitle-1">
                {{ csLocalizedDateTime(getReservation.startDate) }}
              </span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Do: <span class="subtitle-1">{{ csLocalizedDateTime(getReservation.endDate) }}</span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Jméno: <span class="subtitle-1">
                {{ loggedUser.name + ' ' + loggedUser.surname }}
              </span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Název hotelu: <span class="subtitle-1">{{ certainHotel.Name }}</span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Adresa:
              <span class="subtitle-1">
                {{ certainHotel.Street + ' ' + certainHotel.Apt + ', ' + certainHotel.City }}
              </span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Způsob platby:
              <span class="subtitle-1">
                {{ getPayment(getReservation.paymentId) }}
              </span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Popis pokoje:
              <span class="subtitle-1">
                {{ getReservation.description }}
              </span>
            </h5>
          </div>
          <v-divider class="mt-4" />
          <div class="d-flex justify-end mt-5 mb-2">
            <v-btn
              tile
              color="secondary"
              :disabled="getReservation.status !== 0"
              @click.prevent="finish(2)"
            >
              zrušit
            </v-btn>
            <v-btn
              class="ml-3"
              tile
              color="accent"
              :disabled="getReservation.status !== 0"
              @click.prevent="finish(1)"
            >
              zaplatit
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Title from '../layout/Title.vue'

export default {
  name: 'ReservationConfrimation',
  components: { Title },
  computed: {
    ...mapGetters(['getReservation', 'certainHotel', 'loggedUser']),
  },
  async created() {
    await this.fetchHotels();
    await this.setHotel(this.getReservation.hotelId);
  },
  methods: {
    ...mapState(['hotels']),
    ...mapActions(['setHotel', 'finishReservation', 'fetchHotels']),
    getStatus(status) {
      if (status === 0) {
        return 'Vytvořena'
      } if (status.status === 1) {
        return 'Zaplacena'
      }
      return 'Zrušena'
    },
    getPayment(method) {
      if (method === 1) {
        return 'Karta'
      } if (method === 2) {
        return 'Bankovní převod'
      }
      return 'Hotovost'
    },
    async finish(newStatus) {
      await this.finishReservation({ status: newStatus });
      console.log(this.getReservation.status)
      await this.saveDetails(this.getReservation.status.status === 1 ? 'Zaplaceno!' : 'Zrušeno', 'secondary', 2000)
    },
  },
}
</script>
<style>
</style>
