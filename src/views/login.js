import React from 'react';
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom';
import UsuarioService from '../service/usuarioService';
import localStorageService from '../service/localStorageService';
import { mensagemErro } from '../components/toarst';


class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService()
    }




    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            localStorageService.adicionarItem('usuario_logado', response.data);
            this.props.history.push('/home');
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    prepararCadastro = () => {
        this.props.history.push('/cadastro-usuarios');
    }


    render() {
        return (

            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="b2-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exempleInputEamil1">
                                            <input type="email"
                                                value={this.state.email}
                                                onChange={e => this.setState({ email: e.target.value })}
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                placeholder="Digite o Email"
                                            />
                                        </FormGroup>< br />
                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password"
                                                value={this.state.senha}
                                                onChange={e => this.setState({ senha: e.target.value })}
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Password"
                                            />
                                        </FormGroup>< br/>
                                        <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                        <button onClick={this.prepararCadastro} className="btn btn-danger">Cadastrar</button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

        )
    }


}

export default withRouter(Login);