import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import SelectMenu from '../components/selectMenu';
import LancamentoService from '../service/lancamentoService';
import LocalStorageService from '../service/localStorageService';

import { withRouter } from 'react-router-dom';
import * as messages from '../components/toarst';

class CadastroLancamentos extends React.Component {


    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipoLancamento: '',
        statusLancamento: ''
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        //seta o nome do campo e o valor capturado
        this.setState({ [name]: value })
    }

    submit = () => {
        const usuario = LocalStorageService.obterItem('usuario_logado');

        const lancamento = {
            descricao: this.state.descricao,
            valor: this.state.valor,
            mes: this.state.mes,
            ano: this.state.ano,
            tipoLancamento: this.state.tipoLancamento,
            usuario: usuario
        }

        this.service
            .salvar(lancamento)
                .then( resposta => {
                    console.log(resposta)
                    //Navegação de páginas
                    this.props.history.push('/consulta-lancamentos');
                    messages.mensagemSucesso('Lançamento registrado com sucesso!')
                }).catch( error => {
                    console.log(error)
                    messages.mensagemErro(error.response.data)
                })
    }

    render() {

        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();


        return (
            <Card title="Cadastro de lançamento">
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input
                                id="inputDescricao"
                                type="text"
                                className="form-control"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div> < br />
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text"
                                className="form-control"
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inutMeses"
                                lista={meses}
                                className="form-control"
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div> <br />
                <div className="row">

                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor"
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange}
                                type="text"
                                className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" 
                                        lista={tipos} 
                                        name="tipoLancamento"
                                        value={this.state.tipoLancamento}
                                        onChange={this.handleChange}
                                        className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <input type="text"
                                className="form-control"
                                name="statusLancamento"
                                value={this.state.statusLancamento}
                                disabled />
                        </FormGroup>
                    </div>
                </div>
                < br />
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-success" onClick={this.submit}>Salvar</button>
                        <button className="btn btn-danger" onClick={e =>  this.props.history.push('/consulta-lancamentos')}>Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);