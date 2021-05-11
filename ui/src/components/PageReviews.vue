<template>
  <v-container>
    <Title title="Recenze" />
    <v-row>
      <ReviewListing />
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import ReviewListing from './hotels/ReviewListing.vue'
import Title from './layout/Title.vue'

export default {
  name: 'PageReviews',
  components: { Title, ReviewListing },
  async created() {
    await this.fetchAllReviews();
  },
  methods: {
    ...mapActions(['fetchAllReviews']),
  },
}
</script>

<style>

</style>
