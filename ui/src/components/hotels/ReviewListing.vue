<template>
  <v-row
    v-if="getReviews.length > 0"
    class="justify-start"
  >
    <v-col cols="12">
      <span class="title">Recenze</span>
    </v-col>
    <v-col
      v-for="review in getReviews"
      :key="review.id"
      cols="12"
      md="4"
    >
      <v-card
        class="card"
      >
        <v-card-title>
          Recenze od {{ getAuthor(review.CustomerID) }}
        </v-card-title>
        <v-card-subtitle>
          {{ csLocalizedDateTime(review.Date) }}
        </v-card-subtitle>
        <v-card-text class="text--primary">
          {{ review.Text }}
        </v-card-text>
        <div class="text-center pb-4">
          <v-rating
            v-model="review.Stars"
            background-color="primary"
            color="primary"
            readonly
            medium
          />
        </div>
        <div
          v-if="isAdmin"
          class="delete-wrapper"
        >
          <v-btn
            color="secondary"
            class="mx-2"
            fab
            dark
            x-small
            @click="deleteReviewCall(review.ReviewID)"
          >
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ReviewListing',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['certainHotel', 'allUsers', 'getReviews', 'loggedUser']),
    isAdmin() {
      return this.loggedUser ? this.loggedUser.Access === 'admin' : false
    },
  },
  async created() {
    await this.fetchUsers();
    await this.fetchReviews(this.certainHotel.HotelID);
  },
  methods: {
    ...mapActions(['fetchUsers', 'fetchReviews', 'deleteReview']),
    getAuthor(id) {
      const author = this.allUsers.filter((user) => user.CustomerID === id);
      return author[0].Alias;
    },
    async deleteReviewCall(review) {
      await this.deleteReview(review)
      await this.saveDetails('Rezervace smazána!', 'secondary', 2000)
    },
  },
}
</script>

<style scoped>
  .delete-wrapper{
    position: absolute;
    right: -22px;
    top: -15px;
    z-index: 1;
}
</style>
