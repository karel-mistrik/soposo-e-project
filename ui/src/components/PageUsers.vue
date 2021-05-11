<template>
  <v-container>
    <Title title="Uživatelé" />
    <v-row>
      <v-col
        v-for="user in allUsers"
        :key="user.CustomerID"
      >
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                {{ user.Alias }}
              </h3>
              <div>description</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn
              flat
              color="primary"
            >
              text
            </v-btn>
            <v-btn
              flat
              color="primary"
            >
              text
            </v-btn>
          </v-card-actions>
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
    ...mapGetters(['allUsers']),
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
