import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom';

import UsuarioService from '../service/usuarioService';
import { mensagemErro, mensagemSucesso } from '../components/toarst';

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {

        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg);
            }) 
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }
        
        this.service.salvar(usuario)
            .then( resposta => {
                mensagemSucesso('Usuário cadastrado com sucesso.')
                this.props.history.push('/login');
            }).catch( error => {
                mensagemErro(error.response.data)
            })
    }

    validar = () => {
        const msgs = [];

        if(!this.state.nome){
            msgs.push("O campo Nome é obrigatório.")
        }

        if(!this.state.nome){
            msgs.push("O campo Email é obrigatório.")
        }else if( !this.state.email.match('/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/')){
            msgs.push('Informe um email válido.')
        }

        if(!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push("Digite a senha 2x.")
        }else if(this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('Senhas não são iguais.')
        }

        return msgs;
    }

    cancelarCadastro = () => {
        this.props.history.push('/login');
    }

    render() {
        return(
           
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input 
                                    type="text" 
                                    id="inputNome"
                                    className="form-control"
                                    name="nome"
                                    onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup> < br />
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input 
                                    type="text" 
                                    className="form-control"
                                    id="inputEmail"
                                    name="email"
                                    onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup> < br />
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input 
                                    type="password" 
                                    className="form-control"
                                    id="inputSenha"
                                    name="senha"
                                    onChange={e => this.setState({senha: e.target.value})} />
                            </FormGroup>< br />
                            <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                    <input 
                                    type="password" 
                                    className="form-control"
                                    id="inputRepitaSenha"
                                    name="repitaSenha"
                                    onChange={e => this.setState({senhaRepeticao: e.target.value})} />
                            </FormGroup> < br />
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button type="button" className="btn btn-danger" onClick={this.cancelarCadastro}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario);