import _ from 'lodash';
import store from '../store';

export default {
    template: `
        <div>
            <input type="text" class="form-control" v-model="filter">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th v-for="coluna in colunas">
                            <a href="#" @click.prevent="sortBy(coluna)">{{coluna | ucwords}}</a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(time, index) in timesFiltered" :class="{'success': index < 3, 'warning': index > 2 && index < 6, 'danger': index > 15}">
                        <td>
                            <img :src="time.escudo" style="height: 30px; width: 30px;" />
                            <strong>{{ time.nome}}</strong>
                        </td>
                        <td>{{ time.pontos }}</td>
                        <td>{{ time.gols_marcados }}</td>
                        <td>{{ time.gols_sofridos }}</td>
                        <td>{{ time | saldo }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    created() {
        if (store.state.times.length == 0) {
            store.dispatch('load-times');
        }
    },
    data() {
        return {
            order: {
                keys: ['pontos', 'gols_marcados', 'gols_sofridos'],
                sort: ['desc', 'desc', 'asc'],
            },
            colunas: ['nome', 'pontos', 'gols_marcados', 'gols_sofridos', 'saldo'],
            filter: '',
        }
    },
    methods: {
        sortBy(coluna) {
            this.order.keys = coluna;
            this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc';
        },
        sortDefault() {
            this.order.keys = ['pontos', 'gols_marcados', 'gols_sofridos'];
            this.order.sort = ['desc', 'desc', 'asc'];
        }
    },
    computed: {
        times() {
            return store.state.times;
        },
        timesFiltered() {
            let colecao = _.orderBy(this.times, this.order.keys, this.order.sort);

            return _.filter(colecao, item => {
                return item.nome.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
            });
        }
    }
}