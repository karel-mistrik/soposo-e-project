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

    <div class="pl-3">
      <v-btn
        color="primary"
        min-height="65"
        min-width="65"
        tile
        depressed
        @click="drawer = !drawer"
      >
        <v-icon>
          mdi-account
        </v-icon>
      </v-btn>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      height="100vh"
      width="350"
      color="primary"
      right
      dark
      hide-overlay
      temporary
      @mouseleave.native="drawer = !drawer"
    >
      <v-list>
        <v-list-item
          two-line
        >
          <v-list-item-avatar>
            <v-icon
              size="40"
            >
              mdi-account-circle
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ loggedUser ? loggedUser.name : '' }}</v-list-item-title>
            <v-list-item-subtitle>{{ loggedUser ? loggedUser.Access : '' }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item @click="redirect(loggedUser.CustomerID)">
          <v-list-item-avatar>
            <v-icon size="25">
              mdi-file-find
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Můj profil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item
          v-if="isAdmin"
          :to="{ name: 'users' }"
        >
          <v-list-item-avatar>
            <v-icon size="25">
              mdi-account
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Uživatelé</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item
          :to="{ name: 'reservations' }"
        >
          <v-list-item-avatar>
            <v-icon size="25">
              mdi-book
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Rezervace</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-list-item @click="logout()">
          <v-list-item-avatar>
            <v-icon size="25">
              mdi-logout
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Odhlásit se</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import mixins from '../../mixin/mixins';

export default {
  name: 'Header',
  mixins: [mixins],
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    ...mapGetters(['loggedUser', 'getSpecificUser']),
    isAdmin() {
      return this.loggedUser ? this.loggedUser.Access === 'admin' : false
    },
  },
  created() {
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    },
    redirect(id) {
      this.$router.push({ name: 'profile', params: { id } });
    },
    ...mapActions(['setUser']),
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
