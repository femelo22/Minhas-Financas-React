import ApiService from './apiService';

class UsuarioService extends ApiService {


    constructor() {
        super('/usuarios')
    }

    autenticar(obj){
        return this.post('/autenticar', obj)
    }

}

export default UsuarioService;