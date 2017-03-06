import Vue from 'vue';

Vue.filter('saldo', time => time.gols_marcados - time.gols_sofridos);
Vue.filter('ucwords', value => value.charAt(0).toUpperCase() + value.slice(1));