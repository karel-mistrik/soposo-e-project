<template>
  <v-row justify="center">
    <v-col
      cols="12"
      md="9"
    >
      <v-container>
        <Title title="Rezervace" />
        <v-row justify="center">
          <v-col cols="3">
            <v-text-field v-model="search" />
          </v-col>
        </v-row>
        <v-data-iterator
          :items="getReservations"
          :items-per-page="6"
          :search="search"
        >
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="reservation in props.items"
                :key="reservation.ReservationID"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card @click="redirect(reservation)">
                  <v-list>
                    <v-list-item>
                      <v-row>
                        <v-col cols="6">
                          <h5 class="title">
                            Cena:
                          </h5>
                        </v-col>
                        <v-col
                          cols="6"
                          class="text-right"
                        >
                          <span class="subtitle-1">{{ reservation.Price }}</span>
                        </v-col>
                      </v-row>
                    </v-list-item>
                    <v-list-item>
                      <v-row>
                        <v-col cols="6">
                          <h5 class="title">
                            Počet hostů:
                          </h5>
                        </v-col>
                        <v-col
                          cols="6"
                          class="text-right"
                        >
                          <span class="subtitle-1">{{ reservation.Numberofguests }}</span>
                        </v-col>
                      </v-row>
                    </v-list-item>
                    <v-list-item>
                      <v-row>
                        <v-col cols="6">
                          <h5 class="title">
                            Jméno:
                          </h5>
                        </v-col>
                        <v-col
                          cols="6"
                          class="text-right"
                        >
                          <span class="subtitle-1">{{ reservation.contactName }}
                            {{ reservation.surname }}</span>
                        </v-col>
                      </v-row>
                    </v-list-item>
                    <v-list-item>
                      <v-row>
                        <v-col cols="6">
                          <h5 class="title">
                            Od:
                          </h5>
                        </v-col>
                        <v-col
                          cols="6"
                          class="text-right"
                        >
                          <span class="subtitle-1">
                            {{ csLocalizedDateTime(reservation.Startdate) }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-list-item>
                    <v-list-item>
                      <v-row>
                        <v-col cols="6">
                          <h5 class="title">
                            Do:
                          </h5>
                        </v-col>
                        <v-col
                          cols="6"
                          class="text-right"
                        >
                          <span class="subtitle-1">
                            {{ csLocalizedDateTime(reservation.Enddate) }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-list-item>
                    <v-list-item>
                      <v-row>
                        <v-col cols="6">
                          <h5 class="title">
                            Hotel:
                          </h5>
                        </v-col>
                        <v-col
                          cols="6"
                          class="text-right"
                        >
                          <span class="subtitle-1">{{ reservation.name }}</span>
                        </v-col>
                      </v-row>
                    </v-list-item>
                    <v-list-item>
                      <v-row>
                        <v-col cols="6">
                          <h5 class="title">
                            Status:
                          </h5>
                        </v-col>
                        <v-col
                          cols="6"
                          class="text-right font-weight-bold"
                        >
                          <span class="subtitle-1">{{ getStatus(reservation.Status) }}</span>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Title from '../layout/Title.vue';

export default {
  name: 'ReservationListing',
  components: { Title },
  data() {
    return {
      search: '',
    }
  },
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
