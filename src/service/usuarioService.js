import ApiService from './apiService';

class UsuarioService extends ApiService {


    constructor() {
        super('/usuarios')
    }

    autenticar(obj){
        return this.post('/autenticar', obj);
    }

    obterSaldoPorId(id) {
        return this.get(`/${id}/saldo`);
    }

}

export default UsuarioService;