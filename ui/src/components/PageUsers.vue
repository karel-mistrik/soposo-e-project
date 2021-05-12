<template>
  <v-container>
    <Title title="Uživatelé" />
    <v-row>
      <v-col
        v-for="user in getAllUsers"
        :key="user.CustomerID"
        cols="3"
      >
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                {{ user.Alias }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                {{ user.name }} {{ user.surname }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <div cols="6">
                  Gender:
                </div>
                <div cols="6">
                  {{ user.Gender }}
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                {{ user.email }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                {{ user.phone }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                {{ user.Registrationdate }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                {{ user.Access }}
              </v-list-item-content>
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
  },
}
</script>

<style>
</style>
