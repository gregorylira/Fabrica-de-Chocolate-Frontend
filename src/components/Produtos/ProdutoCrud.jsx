import React, { Component } from "react";
import Main from "../templates/Main";
import axios from "axios";

const headerProps = {
    icon: "bitbucket",
    title: "Produtos",
    subtitle: "Cadastro de Produtos: Incluir, Listar, Alterar e Excluir"
}

const baseUrl = "http://localhost:3001/preco-sugerido";
const initialState = {
    produto: { produto: "", custo_MP: 0, custo_total: 0, preco_min: 0, preco_max:0 , preco_medio: 0, seu_preco_venda: 0, imposto_sob_venda: 0, margem_contribuicao:0, margem_liquida: 0 },
    list: []
}


export default class ProdutoCrud extends Component {
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
            console.log(resp.data)
        })
        console.log(this.state.list)
    }

    clear(){
        this.setState({ produto: initialState.produto })
    }

    save(){
        const produto = this.state.produto;
        const method = produto.id ? "put" : "post";
        const url = produto.id ? `${baseUrl}/${produto.id}` : baseUrl;
        axios[method](url, produto)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({ produto: initialState.produto, list })
            })
    }

    getUpdatedList(user, add = true){
        const list = this.state.list.filter(u => u.id !== user.id);
        if (add) list.unshift(user);
        return list;
    }

    updateField(event){
        const produto = { ...this.state.produto }
        produto[event.target.name] = event.target.value;
        this.setState({ produto })
    }

    renderForm(){
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Produto</label>
                            <input type="text" className="form-control"
                                name="produto"
                                value={this.state.produto.produto}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Custo M.P</label>
                            <input type="number" className="form-control"
                                name="custo_MP"
                                value={this.state.produto.custo_MP}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Custo Total</label>
                            <input type="text" className="form-control"
                                name="custo_total"
                                value={this.state.produto.custo_total}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite qual é a unidade..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço Minimo Sugerido</label>
                            <input type="number" className="form-control"
                                name="preco_min"
                                value={this.state.produto.preco_min}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço Maximo Sugerido</label>
                            <input type="number" className="form-control"
                                name="preco_max"
                                value={this.state.produto.preco_max}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço Medio (Rede)</label>
                            <input type="number" className="form-control"
                                name="preco_medio"
                                value={this.state.produto.preco_medio}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Seu Preco de Venda</label>
                            <input type="number" className="form-control"
                                name="seu_preco_venda"
                                value={this.state.produto.seu_preco_venda}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Imposto Sobre Venda</label>
                            <input type="number" className="form-control"
                                name="imposto_sob_venda"
                                value={this.state.produto.imposto_sob_venda}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Margem de Contribuição</label>
                            <input type="number" className="form-control"
                                name="margem_contribuicao"
                                value={this.state.produto.margem_contribuicao}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Margem Liquida</label>
                            <input type="number" className="form-control"
                                name="margem_liquida"
                                value={this.state.produto.margem_liquida}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e=>this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(produto){
        this.setState({ produto })
    }

    remove(produto){
        axios.delete(`${baseUrl}?produto=${produto.produto}`).then(resp => {
            const list = this.getUpdatedList( produto, false );
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
                        <th>Custo MP</th>
                        <th>Custo Total</th>
                        <th>Custo Minimo</th>
                        <th>Custo Maximo</th>
                        <th>Preço Medio</th>
                        <th>Seu Preço de Venda</th>
                        <th>Imposto sob. Venda</th>
                        <th>Margem de Contribuição</th>
                        <th>Margem Liquida</th>
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
        return this.state.list.map(produto => {
            return (
                <tr key={produto.id}>
                    <td>{produto.id}</td>
                    <td>{produto.produto}</td>
                    <td>{produto.custo_MP}</td>
                    <td>{produto.custo_total}</td>
                    <td>{produto.preco_min}</td>
                    <td>{produto.preco_max}</td>
                    <td>{produto.preco_medio}</td>
                    <td>{produto.seu_preco_venda}</td>
                    <td>{produto.imposto_sob_venda}</td>
                    <td>{produto.margem_contribuicao}</td>
                    <td>{produto.margem_liquida}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={()=> this.load(produto)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger"
                            onClick={()=> this.remove(produto)}>
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