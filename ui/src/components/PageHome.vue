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
        >
          <v-carousel-item
            src="@/assets/img1.jpg"
          >
            <div class="fill-height dimmer d-flex align-center justify-center">
              <span class="display-3">Hotel 1</span>
            </div>
          </v-carousel-item>
          <v-carousel-item
            src="@/assets/img2.jpg"
          >
            <div class="fill-height dimmer d-flex align-center justify-center">
              <span class="display-3">Hotel 2</span>
            </div>
          </v-carousel-item>
          <v-carousel-item
            src="@/assets/img3.jpg"
          >
            <div class="fill-height dimmer d-flex align-center justify-center">
              <span class="display-3">Hotel 3</span>
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
import SearchBar from './SearchBar.vue';

export default {
  name: 'Home',
  components: { SearchBar },
  data() {
    return {
      carouselHeight: window.innerHeight - 250,
    }
  },
  created() {
    window.addEventListener('resize', this.variableHeight);
  },
  destroyed() {
    window.removeEventListener('resize', this.variableHeight);
  },
  methods: {
    variableHeight() {
      this.carouselHeight = window.innerHeight - 250;
    },
  },
};
</script>

<style scoped>
.dimmer{
   background: rgba(0, 0, 0, 0.3);
}
</style>
