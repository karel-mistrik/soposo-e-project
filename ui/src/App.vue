<template>
  <v-app>
    <Snackbar />
    <v-main>
      <AppBar />
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from '@/components/layout/Snackbar';
import { mapActions } from 'vuex';
import AppBar from './components/layout/Header.vue';

export default {
  name: 'App',

  components: {
    Snackbar,
    AppBar,
  },
  async created() {
    await this.fetchHotels()
    await this.fetchRooms()
    await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchHotels', 'fetchRooms', 'fetchUsers']),
  },
};
</script>
