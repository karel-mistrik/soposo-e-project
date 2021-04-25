import moment from 'moment/moment';
import { mapActions } from 'vuex';

moment.locale('cs'); // default the locale to English
export default {
  methods: {
    ...mapActions('snackbar', ['showSnack']),
    saveDetails(text, color, time) {
      this.showSnack({
        text,
        color,
        timeout: time,
      });
    },
    sumInCrowns(value) {
      return `${value},- Kč`;
    },
    csLocalizedDateTime(date) {
      if (!date) {
        return moment().format('DD. MM. YYYY')
      }
      return moment(date).format('DD. MM. YYYY')
    },
  },
};
