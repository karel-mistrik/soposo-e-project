<template>
  <v-container>
    <Title title="Profil" />
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
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
                  {{ getSpecificUser.Alias }}
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
                  {{ getSpecificUser.name }} {{ getSpecificUser.surname }}
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
                  {{ getSpecificUser.Gender }}
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
                  {{ getSpecificUser.email }}
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
                  {{ getSpecificUser.phone }}
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
                  {{ getRegisterDate(getSpecificUser.Registrationdate) }}
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
                  {{ getSpecificUser.Access }}
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
import { mapActions, mapGetters, mapState } from 'vuex'
import Title from './layout/Title.vue'

export default {
  name: 'PageProfile',
  components: { Title },
  user: {},
  computed: {
    ...mapState(['specificUser']),
    ...mapGetters(['getSpecificUser', 'loggedUser']),
  },
  watch: {
    specificUser(value) {
      console.log(value)
    },
  },
  async created() {
    await this.fetchUsers();
    this.setUser(this.$route.params.id)
    // // workaround
    // if (this.$route.params.id === this.loggedUser.CustomerID) {
    //   this.user = this.loggedUser;
    // } else {
    //   this.user = this.getSpecificUser
    // }
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
