<template>
  <v-container>
    <Title title="Profil" />
    <v-row justify="center">
      <v-col cols="6">
        <v-card>
          <v-list>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Alias:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ user.Alias }}
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Jméno:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ user.name }} {{ user.surname }}
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Gender:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ user.Gender }}
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Email:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ user.email }}
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Telefon:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ user.phone }}
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Registrován od:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ getRegisterDate(user.Registrationdate) }}
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="6">
                  Oprávnění:
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  {{ user.Access }}
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Title from './layout/Title.vue'

export default {
  name: 'PageProfile',
  components: { Title },
  user: {},
  computed: {
    ...mapGetters(['getSpecificUser', 'loggedUser']),
  },
  created() {
    this.fetchUsers();
    this.setUser(this.$route.params.id);
    // workaround
    if (this.$route.params.id === this.loggedUser.CustomerID) {
      this.user = this.loggedUser;
    } else {
      this.user = this.getSpecificUser
    }
  },
  methods: {
    ...mapActions(['setUser', 'fetchUsers']),
    getRegisterDate(date) {
      return this.csLocalizedDateTime(date)
    },
  },
}
</script>

<style>
</style>
