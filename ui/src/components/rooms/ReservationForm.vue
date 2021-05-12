<template>
  <v-card
    flat
    outlined
    class="pa-5"
    rounded="0"
  >
    <validation-observer
      ref="form"
      tag="form"
      @submit.prevent="onSubmit"
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
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="data"
          >
            <v-text-field
              v-model="dateRangeText"
              label="Délka pobytu"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              :error-messages="errors[0]"
              v-on="on"
            />
          </validation-provider>
        </template>
        <v-date-picker
          ref="picker"
          v-model="reservation.date"
          range
          min="1950-01-01"
        />
      </v-menu>
      <validation-provider
        v-slot="{ errors }"
        rules="required"
        name="platba"
      >
        <v-select
          v-model="reservation.payment"
          label="Způsob platby"
          :items="paymentMethods"
          item-value="value"
          item-text="name"
          single
          :error-messages="errors[0]"
        />
      </validation-provider>
      <div class="mb-2">
        <h5 class="title">
          Cena celkem:
          <span class="ml-3 title font-weight-black">
            {{ sumInCrowns(reservation.price) }}
          </span>
        </h5>
      </div>
      <v-btn
        :disabled="blocker"
        tile
        color="primary"
        type="submit"
      >
        Rezervovat
      </v-btn>
    </validation-observer>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import moment from 'moment';

export default {
  name: 'ReservationForm',
  components: {
    ValidationProvider, ValidationObserver,
  },
  data() {
    return {
      blocker: false,
      menu: false,
      reservation: {
        date: ['', ''],
        payment: '',
        price: '',
      },
      paymentMethods: [{ name: 'Karta', value: 1 },
        { name: 'Bankovní převod', value: 2 },
        { name: 'Hotovost', value: 3 }],
    }
  },
  computed: {
    ...mapState(['room']),
    dateRangeText() {
      const dates = [this.csLocalizedDateTime(this.reservation.date[0]),
        this.csLocalizedDateTime(this.reservation.date[1])]
      return dates.join(' ~ ')
    },
  },
  watch: {
    dateRangeText() {
      this.reservation.price = this.states.room.Price * moment(this.reservation.date[1]).diff(this.reservation.date[0], 'days');
      this.blocker = moment(this.reservation.date[1]).diff(this.reservation.date[0], 'days') === 0
    },
  },
  created() {
    this.reservation.guests = this.states.room.Capacity
    this.reservation.price = `${this.states.room.Price}`
    this.blocker = true
  },
  methods: {
    ...mapActions(['createReservation', 'setHotel']),
    async onSubmit() {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        await this.createReservation({
          startDate: this.reservation.date[0],
          endDate: this.reservation.date[1],
          numberOfGuests: this.reservation.guests,
          price: this.reservation.price,
          customerId: this.states.user.CustomerID,
          paymentId: this.reservation.payment,
          roomId: this.states.room.RoomID,
        });
        await this.saveDetails('Rezervace vytvořena!', 'secondary', 2000)
        await this.$router.push({ name: 'reservationConfirmation' });
      }
    },
  },
}
</script>

<style>

</style>
