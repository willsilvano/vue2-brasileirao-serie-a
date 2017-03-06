import TimeListComponent from './time-list.component'

export default {
    components: {
        'time-list': TimeListComponent
    },
    template: `
    <div class="container">
        <div class="row">
            <h3>Campeonato Brasileiro - Série A - 2016</h3>
            <div v-if="view == 'tabela'">
                <time-list></time-list>
            </div>
            <div v-if="view == 'novoJogo'">
                <form class="form-inline">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="novoJogo.casa.gols">
                        <label class="control-label">
                        {{novoJogo.casa.time.nome}}
                        <img :src="novoJogo.casa.time.escudo" style="height: 30px; width: 30px;">
                    </label>
                    </div>
                    <span>X</span>
                    <div class="form-group">
                        <label class="control-label">
                        <img :src="novoJogo.fora.time.escudo" style="height: 30px; width: 30px;">
                        {{novoJogo.fora.time.nome}}
                    </label>
                        <input type="text" class="form-control" v-model="novoJogo.fora.gols">
                    </div>
                    <button type="button" class="btn btn-primary" @click="fimJogo">Fim de jogo</button>
                </form>
            </div>
        </div>
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
            novoJogo: {
                casa: {
                    time: null,
                    gols: 0
                },
                fora: {
                    time: null,
                    gols: 0
                }
            },
            view: 'tabela'
        }
    },
    methods: {
        fimJogo() {
            let timeAdversario = this.novoJogo.fora.time;
            let gols = +this.novoJogo.casa.gols;
            let golsAdversario = +this.novoJogo.fora.gols;
            this.novoJogo.casa.time.fimJogo(timeAdversario, gols, golsAdversario);
            this.showView('tabela');
        },
        criarNovoJogo() {
            let indexCasa = Math.floor(Math.random() * 20),
                indexFora = Math.floor(Math.random() * 20);

            this.novoJogo.casa.time = this.times[indexCasa];
            this.novoJogo.casa.gols = 0;
            this.novoJogo.fora.time = this.times[indexFora];
            this.novoJogo.fora.gols = 0;
            this.showView('novoJogo');
            this.sortDefault();
        },
        showView(view) {
            this.view = view;
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