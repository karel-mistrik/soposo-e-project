<template>
  <v-app-bar
    app
    color="white"
    light
    height="100"
  >
    <v-toolbar-title>
      <h3 class="display-2 text--black">
        SOPOSO-Ecommodation
      </h3>
    </v-toolbar-title>
    <v-spacer />
    <router-link
      v-slot="{ href, route, navigate, isExactActive }"
      :to="{name: 'hotels'}"
      class="ma-auto px-3 pointer"
    >
      <span
        :href="href"
        :class="isExactActive && 'router-link-active'"
        @click="navigate"
      >Hotely</span>
    </router-link>
    <router-link
      v-slot="{ href, route, navigate, isExactActive }"
      :to="{name: 'home'}"
      class="ma-auto px-3 pointer"
    >
      <span
        :class="isExactActive && 'router-link-active'"
        :href="href"
        @click="navigate"
      >Vyhledávání</span>
    </router-link>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import mixins from '../../mixin/mixins';

export default {
  name: 'Header',
  mixins: [mixins],
  computed: {
    ...mapGetters(['loggedUser']),
    isAdmin() {
      return this.loggedUser ? this.loggedUser.Access === 'admin' : false
    },
  },
  created() {
    console.log(this.currentUser)
  },
};
</script>

<style lang="scss">
.app-title{
   cursor: pointer;}

.pointer{
  cursor: pointer;
}

.router-link-active{
   :hover{
      color: var(--v-primary-base);
   }
   transition: all .5s;
   color: var(--v-primary-base);
}
</style>
