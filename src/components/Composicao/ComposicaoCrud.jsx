import React, { Component } from "react";
import Main from "../templates/Main";
import axios from "axios";

const headerProps = {
    icon: "info-circle",
    title: "Composição Dos Produtos",
    subtitle: "Composição de produtos: Incluir, Listar, Alterar e Excluir"
}

const baseUrl = "http://localhost:3001/composicao";
const initialState = {
    composicao: { produtoFK: "", ingredienteFK: "", quant_liqu: 0, unid_medidaFK: "", custo_insumoFK:0 },
    list: [],
    block: false
}


export default class ComposicaoCrud extends Component {
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
            console.log(resp.data)
        })
        console.log(this.state.list)
    }

    clear(){
        this.setState({ composicao: initialState.composicao })
    }

    save(){
        const composicao = this.state.composicao;
        const method = composicao.id ? "put" : "post";
        const url = composicao.id ? `${baseUrl}/${composicao.id}` : baseUrl;
        axios[method](url, composicao)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                console.log(resp.data)
                this.setState({ composicao: initialState.composicao, list })
            })
        
    }

    getUpdatedList(user, add = true){
        const list = this.state.list.filter(u => u.ingredienteFK !== user.ingredienteFK);
        if (add) list.unshift(user);
        return list;
    }

    updateField(event){
        const composicao = { ...this.state.composicao };
        composicao[event.target.name] = event.target.value;
        this.setState({ composicao })
    }

    renderForm(){
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Produto</label>
                            <input type="text" className="form-control"
                                name="produtoFK"
                                value={this.state.composicao.produtoFK}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Ingrediente</label>
                            <input type="text" className="form-control"
                                name="ingredienteFK"
                                value={this.state.composicao.ingredienteFK}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a medida..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade Liquida</label>
                            <input type="text" className="form-control"
                                name="quant_liqu"
                                value={this.state.composicao.quant_liqu}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => {this.state.block = false; this.save(e)}}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e=> {this.state.block = false; this.clear(e)}}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(composicao){
        this.setState({ composicao })
    }

    remove(composicao){
        console.log(composicao)
        axios.delete(`${baseUrl}?ingredienteFK=${composicao.ingredienteFK}`).then(resp => {
            const list = this.getUpdatedList( composicao, false );
            this.setState({ list })
        })
    }

    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Ingrediente</th>
                        <th>Quantidade Liquida</th>
                        <th>Unidade de Medida</th>
                        <th>Custo do Insumo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map((composicao,index) => {
            return (
                <tr key={composicao.id}>
                    <td>{index + 1}</td>
                    <td>{composicao.produtoFK}</td>
                    <td>{composicao.ingredienteFK}</td>
                    <td>{composicao.quant_liqu}</td>
                    <td>{composicao.unid_medidaFK}</td>
                    <td>{composicao.custo_insumoFK}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={()=> {this.state.block=true; this.load(composicao)}}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={()=> this.remove(composicao)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }


    render(){
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}