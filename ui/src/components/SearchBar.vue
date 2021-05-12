<template>
  <v-row
    class="justify-center search-bar-wrapper"
  >
    <v-col
      cols="6"
      md="2"
      class="d-flex align-center"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateRangeText"
            label="Délka pobytu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            dark
            v-on="on"
          />
        </template>
        <v-date-picker
          ref="picker"
          v-model="date"
          range
          :min="getToday"
        />
      </v-menu>
    </v-col>
    <v-col
      cols="6"
      md="2"
      class="d-flex"
    >
      <v-select
        v-model="capacity"
        class="my-auto"
        label="Počet hostů"
        dark
        :items="[1,2,3,4,5]"
      />
    </v-col>
    <v-col
      cols="auto"
      class="d-flex"
    >
      <v-btn
        depressed
        tile
        color="primary"
        class="my-auto"
        min-height="55"
        min-width="55"
        @click="search"
      >
        <span class="mr-3">Hledat</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default {
  name: 'SearchBar',
  data() {
    return {
      menu: false,
      date: ['', ''],
      capacity: null,
    }
  },
  computed: {
    dateRangeText() {
      const dates = [this.csLocalizedDateTime(this.date[0]),
        this.csLocalizedDateTime(this.date[1])]
      return dates.join(' ~ ')
    },
  },
  methods: {
    ...mapActions(['fetchReservations', 'fetchRooms']),
    iteration(reservations) {
      const format2 = 'YYYY-MM-DD'

      const searchIn = moment(this.date[0]).format(format2)
      const searchOut = moment(this.date[1]).format(format2)

      return reservations.filter((reservation) => this.overlapping(
        [[searchIn, searchOut], [moment(reservation.Startdate).format(format2),
          moment(reservation.Enddate).format(format2),
        ]],
      ))
    },
    overlapping(timelapse) {
      const date1 = [moment(timelapse[0][0]), moment(timelapse[0][1])];
      const date2 = [moment(timelapse[1][0]), moment(timelapse[1][1])];

      const range = moment.range(date1);
      const range2 = moment.range(date2);

      // has overlapping
      if (range.overlaps(range2)) {
        if ((range2.contains(range, true) || range.contains(range2, true))
           && !date1[0].isSame(date2[0])) return true
        return true
      }
      return false
    },
    async search() {
      const reservations = await this.fetchReservations()
      const iteratedReservations = this.iteration(reservations)
      await this.$router.push({ name: 'rooms', params: { restrictedHotels: iteratedReservations, capacity: this.capacity } })
    },
  },
}
</script>

<style>
.search-bar-wrapper{
   min-height: 150px;
   background-color: var(--v-secondary-base);
}

.text-field label {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
