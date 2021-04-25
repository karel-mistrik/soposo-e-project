<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        class="pa-0"
      >
        <v-carousel
          :show-arrows="false"
          width="100%"
          :height="carouselHeight"
          hide-delimiter-background
          cycle
        >
          <v-carousel-item
            v-for="item in randomHotelsData"
            :key="item.HotelID"
            :src="item.Preview"
            @click="redirect(item.HotelID)"
          >
            <div class="fill-height dimmer d-flex align-center justify-center">
              <span class="display-3">{{ item.Name }}</span>
            </div>
          </v-carousel-item>
          <v-carousel />
        </v-carousel>
      </v-col>
    </v-row>
    <SearchBar />
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SearchBar from './SearchBar.vue';

export default {
  name: 'Home',
  components: { SearchBar },
  data() {
    return {
      randomHotelsData: this.randomHotels,
      carouselHeight: window.innerHeight - 250,
    }
  },
  computed: {
    ...mapState(['states']),
  },
  async created() {
    window.addEventListener('resize', this.variableHeight);
    await this.fetchHotels()
    await this.randomHotels()
  },
  destroyed() {
    window.removeEventListener('resize', this.variableHeight);
  },
  methods: {
    ...mapActions(['fetchHotels']),
    variableHeight() {
      this.carouselHeight = window.innerHeight - 250;
    },
    randomHotels() {
      const array = []
      for (let i = 0; i < 3; i++) {
        array.push(this.states.hotels[Math.floor(Math.random() * this.states.hotels.length)])
      }
      this.randomHotelsData = array;
    },
    redirect(id) {
      this.$router.push({ name: 'hotel', params: { id } })
    },
  },
};
</script>

<style scoped>
.dimmer{
   background: rgba(0, 0, 0, 0.3);
}
</style>
