import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';
import PageHome from '../components/PageHome'
import PageLogin from '../components/auth/Login'
import PageRegistration from '../components/auth/Registration'
import HotelListing from '../components/hotels/Listing';
import HotelCreate from '../components/hotels/Create';
import Hotel from '../components/hotels/Hotel';
import HotelEdit from '../components/hotels/Edit';
import RoomListing from '../components/rooms/Listing';
import RoomReservation from '../components/rooms/Reservation';
import ReservationConfirmation from '../components/rooms/ReservationConfirmation';
import ReviewCreate from '../components/hotels/ReviewCreate';
import PageUsers from '../components/PageUsers.vue';
import PageReviews from '../components/PageReviews.vue';

const user = store;

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome,
      props: { policy: ['admin', 'user'] },
    },
    {
      path: '/login',
      name: 'login',
      component: PageLogin,
      props: { policy: ['stranger'] },
    },
    {
      path: '/registration',
      name: 'registration',
      component: PageRegistration,
      props: { policy: ['stranger'] },
    },
    {
      path: '/hotels',
      name: 'hotels',
      component: HotelListing,
      props: { policy: ['admin', 'user'] },
    },
    {
      path: '/hotelCreate',
      name: 'hotelCreate',
      component: HotelCreate,
      props: { policy: ['admin'] },
    },
    {
      path: '/hotel/:id',
      name: 'hotel',
      component: Hotel,
      props: { policy: ['admin', 'user'] },
    },
    {
      path: '/hotel/edit/:id',
      name: 'hotelEdit',
      component: HotelEdit,
      props: { policy: ['admin'] },
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomListing,
      props: { policy: ['admin', 'user'] },
    },
    {
      path: '/room/:id',
      name: 'roomReservation',
      component: RoomReservation,
      props: { policy: ['admin', 'user'] },
    },
    {
      path: '/reservation/confirmation',
      name: 'reservationConfirmation',
      component: ReservationConfirmation,
      props: { policy: ['admin', 'user'] },
    },
    {
      path: '/hotel/review',
      name: 'reviewCreate',
      component: ReviewCreate,
      props: { policy: ['admin', 'user'] },
    },
    {
      path: '/customers',
      name: 'users',
      component: PageUsers,
      props: { policy: ['admin'] },
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: PageReviews,
      props: { policy: ['admin'] },
    },
  ],
})

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from, next) => {
  let kokos
  if (!user.getters.loggedUser) {
    kokos = { policy: 'stranger' }
  } else {
    kokos = { policy: user.getters.loggedUser.Access }
  }
  if (!to.matched[0].props.default.policy.includes(kokos.policy)) {
    if (kokos.policy === 'stranger') {
      next({ path: '/login' });
    }
    if (kokos.policy === 'user' || kokos.policy === 'admin') {
      next({ path: '/' });
    }
  } else {
    next()
  }
});

export default router
