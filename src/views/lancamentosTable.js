import React from 'react';
import currencyFormatter from 'currency-formatter';


export default props => {

    const rows = props.lancamentos.map( lancamento => {
        return (
           <tr key={lancamento.id}>
               <th>{lancamento.descricao}</th>
               <th>{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</th>
               <th>{lancamento.tipo}</th>
               <th>{lancamento.mes}</th>
               <th>{lancamento.status}</th>
           </tr> 
        )
    })



    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}