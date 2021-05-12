<template>
  <v-container class="px-4">
    <Title title="Uživatelé" />
    <v-row>
      <v-col
        v-for="user in getAllUsers"
        :key="user.CustomerID"
        cols="3"
      >
        <v-card @click="redirect(user.CustomerID)">
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
  name: 'PageUsers',
  components: { Title },
  computed: {
    ...mapGetters(['getAllUsers']),
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions(['fetchUsers']),
    redirect(id) {
      this.$router.push({ name: 'profile', params: { id } });
    },
    getRegisterDate(date) {
      return this.csLocalizedDateTime(date)
    },
  },
}
</script>

<style>
</style>
