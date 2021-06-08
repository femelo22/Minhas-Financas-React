import ApiService from './apiService';

export default class LancamentoService extends ApiService {

    constructor() {
        super('/lancamentos')
    }

    consultar(LancamentoFiltro) {
        let params = `?ano=${LancamentoFiltro.ano}`

        if(LancamentoFiltro.mes){
            params = `${params}&mes=${LancamentoFiltro.mes}`
        }

        if(LancamentoFiltro.tipo){
            params = `${params}&tipo=${LancamentoFiltro.tipo}`
        }

        if(LancamentoFiltro.status){
            params = `${params}&status=${LancamentoFiltro.status}`
        }

        return this.get(params);
    }

}