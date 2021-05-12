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
              Status: <span class="subtitle-1">{{ getStatus(getReservation.Status) }}</span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Počet hostů: <span class="subtitle-1">{{ getReservation.Numberofguests }}</span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Cena: <span class="subtitle-1">{{ sumInCrowns(getReservation.Price) }}</span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Od: <span class="subtitle-1">
                {{ csLocalizedDateTime(getReservation.Startdate) }}
              </span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Do: <span class="subtitle-1">{{ csLocalizedDateTime(getReservation.Enddate) }}</span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Jméno: <span class="subtitle-1">
                {{ getReservation.contactName + ' ' + getReservation.surname }}
              </span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Název hotelu: <span class="subtitle-1">{{ getReservation.name }}</span>
            </h5>
          </div>
          <div>
            <h5 class="title">
              Adresa:
              <span class="subtitle-1">
                {{ getReservation.street + ' ' + getReservation.apt + ', ' + getReservation.city }}
              </span>
            </h5>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Title from '../layout/Title.vue';

export default {
  components: { Title },
  name: 'ReservationDetail',
  computed: {
    ...mapGetters(['getReservation']),
  },
  created() {
    console.log(this.getReservation);
  },
  methods: {
    getStatus(status) {
      if (status === 0) {
        return 'Vytvořena'
      } if (status === 1) {
        return 'Zaplacena'
      }
      return 'Zrušena'
    },
  },
}
</script>

<style>

</style>
