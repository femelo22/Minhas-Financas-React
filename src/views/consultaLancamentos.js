import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import SelectMenu from '../components/selectMenu';
import LancamentoTable from '../views/lancamentosTable';
import LocalStorageService from '../service/localStorageService';
import LancamentoService from '../service/lancamentoService';

import * as message from '../components/toarst';

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {

        if(!this.state.ano) {
            message.mensagemErro('O preenchimento do campo Ano é obrigatório.')
            return false;
        }

        const user = LocalStorageService.obterItem("usuario_logado");

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: user.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then(resposta => {
                console.log(resposta)
                this.setState({ lancamentos: resposta.data })
            }).catch(error => {
                console.log(error)
            })
    }


    editar = (id) => {
        console.log(id);
    }

    deletar = ( lancamento ) => {

        //remover do array
        const lancamentos = this.state.lancamentos;
        const index = lancamentos.indexOf(lancamento);
        lancamentos.splice(index, 1);
        //atualizar a váriavel de lancamentos
        this.setState(lancamentos);

        this.service.deletar(lancamento.id)
            .then(resposta => {
                message.mensagemSucesso('Lançamento deletado!');
        }).catch(error => {
                message.mensagemErro('Ocorreu um erro ao tentar deletar o Lançamento.')
        })
    }

    render() {

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();


        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">

                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o Ano" />
                            </FormGroup>< br />

                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id="inputMes"
                                    className="form-control"
                                    value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })}
                                    lista={meses} />
                            </FormGroup>< br />

                            <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                                <input type="text"
                                    className="form-control"
                                    id="inputDescricao"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Digite a descrição do lançamento" />
                            </FormGroup>< br />

                            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                                <SelectMenu id="inputTipo"
                                    className="form-control"
                                    value={this.state.tipo}
                                    onChange={e => this.setState({ tipo: e.target.value })}
                                    lista={tipos} />
                            </FormGroup>
                            < br />
                            <button type="button" onClick={this.buscar} className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>

                        </div>
                    </div>
                </div><br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable lancamentos={this.state.lancamentos} deleteAction={this.deletar} editarAction={this.editar}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);