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
import AppBar from './components/layout/Header.vue';

export default {
  name: 'App',

  components: {
    Snackbar,
    AppBar,
  },
};
</script>
