import React, { Component } from "react";
import Main from "../templates/Main";
import axios from "axios";

const headerProps = {
    icon: "archive",
    title: "Insumos",
    subtitle: "Cadastro de Insumo: Incluir, Listar, Alterar e Excluir"
}

const baseUrl = "http://localhost:3001/insumo";
const initialState = {
    insumo: { produto: "", medida: 0, und:"", custo_rede: 0, custo:0 , custo_atual: 0, aproveitamento: 0, custo_real: 0, custo_final:0  },
    list: []
}


export default class InsumoCrud extends Component {
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
            console.log(resp.data)
        })
        console.log(this.state.list)
    }

    clear(){
        this.setState({ insumo: initialState.insumo })
    }

    save(){
        const insumo = this.state.insumo;
        const method = insumo.id ? "put" : "post";
        const url = insumo.id ? `${baseUrl}/${insumo.id}` : baseUrl;
        axios[method](url, insumo)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({ insumo: initialState.insumo, list })
            })
    }

    getUpdatedList(user, add = true){
        const list = this.state.list.filter(u => u.id !== user.id);
        if (add) list.unshift(user);
        return list;
    }

    updateField(event){
        const insumo = { ...this.state.insumo }
        insumo[event.target.name] = event.target.value;
        this.setState({ insumo })
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
                                value={this.state.insumo.produto}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Medida</label>
                            <input type="number" className="form-control"
                                name="medida"
                                value={this.state.insumo.medida}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>und</label>
                            <input type="text" className="form-control"
                                name="und"
                                value={this.state.insumo.und}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite qual é a unidade..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Custo Rede</label>
                            <input type="number" className="form-control"
                                name="custo_rede"
                                value={this.state.insumo.custo_rede}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Custo</label>
                            <input type="number" className="form-control"
                                name="custo"
                                value={this.state.insumo.custo}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Custo Atual</label>
                            <input type="number" className="form-control"
                                name="custo_atual"
                                value={this.state.insumo.custo_atual}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>aproveitamento</label>
                            <input type="number" className="form-control"
                                name="aproveitamento"
                                value={this.state.insumo.aproveitamento}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Custo Real</label>
                            <input type="number" className="form-control"
                                name="custo_real"
                                value={this.state.insumo.custo_real}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Custo Final</label>
                            <input type="number" className="form-control"
                                name="custo_final"
                                value={this.state.insumo.custo_final}
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

    load(insumo){
        this.setState({ insumo })
    }

    remove(insumo){
        axios.delete(`${baseUrl}?produto=${insumo.produto}`).then(resp => {
            const list = this.getUpdatedList( insumo, false );
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
                        <th>und</th>
                        <th>custo_rede</th>
                        <th>custo</th>
                        <th>custo_atual</th>
                        <th>aproveitamento</th>
                        <th>custo_real</th>
                        <th>custo_final</th>
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
        return this.state.list.map(insumo => {
            const custo_rede = `R$ ${insumo.custo_rede}`
            const custo = `R$ ${insumo.custo}`
            const custo_atual = `R$ ${insumo.custo_atual}`
            const aproveitamento = `${insumo.aproveitamento}%`
            const custo_real = `R$ ${insumo.custo_real}`
            const custo_final = `R$ ${insumo.custo_final}`
            return (
                <tr key={insumo.id}>
                    <td>{insumo.id}</td>
                    <td>{insumo.produto}</td>
                    <td>{insumo.und}</td>
                    <td>{custo_rede}</td>
                    <td>{custo}</td>
                    <td>{custo_atual}</td>
                    <td>{aproveitamento}</td>
                    <td>{custo_real}</td>
                    <td>{custo_final}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={()=> this.load(insumo)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={()=> this.remove(insumo)}>
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