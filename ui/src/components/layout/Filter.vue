<template>
  <v-card>
    <v-card-title>
      <h2>Filtr</h2>
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="name"
        label="Název hotelu"
      />
      <v-select
        v-model="region"
        :items="regions"
        label="Kraj"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'FilterComponent',
  data() {
    return {
      name: '',
      region: '',
      regions: [
        'Kterýkoliv',
        'Pardubický kraj',
        'Liberecký kraj',
        'Ústecký kraj',
        'Karlovarský kraj',
        'Plzeňský kraj',
        'Jihočeský kraj',
        'Kraj Vysočina',
        'Kralovéhradecký kraj',
        'Středočeský kraj',
        'Jihomoravský kraj',
        'Olomoucký kraj',
        'Moravskoslezský kraj',
        'Zlínský kraj',
      ],
    }
  },
  computed: {
    ...mapState(['hotels']),
  },
  watch: {
    name(value) {
      const newHotels = this.hotels.hotels.filter((hotel) => hotel.Name.toLowerCase()
        .includes(value.toLowerCase()));
      this.updateHotels(newHotels);
    },
    region(value) {
      if (value === 'Kterýkoliv') {
        this.updateHotels(this.hotels.hotels);
      } else {
        const newHotels = this.hotels.hotels.filter((hotel) => hotel.Region === value);
        this.updateHotels(newHotels);
      }
    },
  },
  created() {
  },
  methods: {
    ...mapGetters(['allHotel']),
    ...mapActions(['updateHotels']),
  },
}
</script>

<style scoped>
    .filter-wrapper{
        border: var(--v-primary-base) 2px solid;
        border-radius: 2px;
    }
</style>
