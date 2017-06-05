import Vue from 'vue';
import Dialogue from '../components/dialogue/dialogue.vue';
import store from '../store';
import vueResource from 'vue-resource';

Vue.use(vueResource);

const app = new Vue({
	el: '#app',
	// store,
	data() {
		return {

		}
	},
	computed: {
		count() {
			return this.$store.state.count
		}
	},
	methods: {
		plus() {
			this.$store.dispatch('plus');
		},
		minus() {
			this.$store.dispatch('minus');
		}
	},
	components: {
		Dialogue
	}
});
