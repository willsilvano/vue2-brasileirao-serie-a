import {Time} from '../time';
import _ from 'lodash';
import event from '../event';

export default {
    template: `
        <div>
            <a class="btn btn-primary" @click="showNovoJogo">Novo Jogo</a>
            <br /><br />
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
                    <tr v-for="time in timesFiltered">
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
    data() {
        return {
            order: {
                keys: ['pontos', 'gols_marcados', 'gols_sofridos'],
                sort: ['desc', 'desc', 'asc'],
            },
            colunas: ['nome', 'pontos', 'gols_marcados', 'gols_sofridos', 'saldo'],
            filter: '',
            times: [
                new Time("América MG", require('../assets/america_mg_60x60.png')),
                new Time("Atlético PR", require('../assets/atletico-pr_60x60.png')),
                new Time("Atlético MG", require('../assets/atletico_mg_60x60.png')),
                new Time("Botafogo", require('../assets/botafogo_60x60.png')),
                new Time("Chapecoense", require('../assets/chapecoense_60x60.png')),
                new Time("Corinthians", require('../assets/corinthians_60x60.png')),
                new Time("Coritiba", require('../assets/coritiba_60x60.png')),
                new Time("Cruzeiro", require('../assets/cruzeiro_60x60.png')),
                new Time("Figueirense", require('../assets/figueirense_60x60.png')),
                new Time("Flamengo", require('../assets/flamengo_60x60.png')),
                new Time("Fluminense", require('../assets/fluminense_60x60.png')),
                new Time("Grêmio", require('../assets/gremio_60x60.png')),
                new Time("Internacional", require('../assets/internacional_60x60.png')),
                new Time("Palmeiras", require('../assets/palmeiras_60x60.png')),
                new Time("Ponte Preta", require('../assets/ponte_preta_60x60.png')),
                new Time("Santa Cruz", require('../assets/santa_cruz_60x60.png')),
                new Time("Santos", require('../assets/santos_60x60.png')),
                new Time("São Paulo", require('../assets/sao_paulo_60x60.png')),
                new Time("Sport", require('../assets/sport_60x60.png')),
                new Time("Vitória", require('../assets/vitoria_60x60.png')),
            ],
        }
    },
    methods: {
        showNovoJogo() {
            event.$emit('novo-jogo');
            event.$emit('get-times', this.times);
        },
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
        timesFiltered() {
            let colecao = _.orderBy(this.times, this.order.keys, this.order.sort);

            return _.filter(colecao, item => {
                return item.nome.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
            });
        }
    }
}