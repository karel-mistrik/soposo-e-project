<template>
  <v-container>
    <Title title="Rezervace" />
    <v-row>
      <v-col
        v-for="reservation in getReservations"
        :key="reservation.ReservationID"
        cols="3"
      >
        <v-card @click="redirect(reservation)">
          <v-list>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  <h5 class="title">Cena:</h5>
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ reservation.Price }}
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Počet hostů:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ reservation.Numberofguests }}
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Jméno:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ reservation.contactName }} {{ reservation.surname }}
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Od:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ csLocalizedDateTime(reservation.Startdate) }}
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Do:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ csLocalizedDateTime(reservation.Enddate) }}
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Hotel:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ reservation.name }}
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Status:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right font-weight-bold"
                >
                  {{ getStatus(reservation.Status) }}
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Title from '../layout/Title.vue';

export default {
  name: 'ReservationListing',
  components: { Title },
  computed: {
    ...mapGetters(['getReservations', 'loggedUser']),
  },
  async created() {
    if (this.isAdmin()) {
      await this.fetchReservations();
    } else {
      await this.fetchReservationsByUser(this.loggedUser);
    }
  },
  methods: {
    ...mapActions(['fetchReservations', 'fetchReservationsByUser', 'setReservationDetail']),
    isAdmin() {
      return this.loggedUser ? this.loggedUser.Access === 'admin' : false
    },
    getStatus(status) {
      if (status === 0) {
        return 'Vytvořena';
      } if (status === 1) {
        return 'Zaplacena';
      } if (status === 2) {
        return 'Zrušena';
      }
    },
    redirect(reservation) {
      this.setReservationDetail(reservation)
      this.$router.push({ name: 'reservationDetail' })
    },
  },
}
</script>

<style>

</style>
