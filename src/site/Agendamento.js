import React, { Component } from 'react';
import '../App.css';
import '../bootstrap.css';

class Agendamento extends Component {
    constructor(props){
        super(props);
        this.state = {
            funcionario: [{id:1, nome:"Jefferson"},{id:2, nome:"andú"},{id:3, nome:"João"}],
            form: {
                atividade: '',
                funcEscolhido: '',
                data: '',
                hrInicial: '',
                hrFinal: ''
            }      
        }
        this.salvarForm = this.salvarForm.bind(this);
        this.Enviar = this.Enviar.bind(this);
    }

    salvarForm(e){
        let dados = this.state.form;

        dados[e.target.name] = e.target.value;
        this.setState({form: dados});
    }

    Enviar(e){
        alert("teste");
        e.preventDefault();
    }

    render(){
        return (
            <div>
                <form onSubmit={this.Enviar}>
                    <input value={this.state.form.atividade} onChange={this.salvarForm} name="atividade" className="form-control mb-3 tamanho-input" type="text" placeholder="Nome da Atividade"/>
                    
                    <select onChange={this.salvarForm} name="funcEscolhido" className="form-select mb-3 tamanho-input">
                        <option defaultValue>Funcionário</option>
                        {
                            this.state.funcionario.map((item)=>
                                <option key={item.id} value={item.id}>{item.nome}</option>
                                
                            )
                        }
                    </select>
                    
                    <label className="tamanho-input">&nbsp;Escolha o dia da atividade</label>
                    <input value={this.state.form.data} onChange={this.salvarForm} name="data" className="form-control mb-3 tamanho-input" type="date"></input>

                    <label className="tamanho-input">&nbsp;Escolha o horário da atividade</label>
                    <div className="input-group tamanho-div mb-3">
                        <input value={this.state.form.hrInicial} onChange={this.salvarForm} name="hrInicial" className="form-control" type="time"></input>
                        <span className="input-group-text">à</span>
                        <input value={this.state.form.hrFinal} onChange={this.salvarForm} name="hrFinal" type="time" className="form-control"></input>
                    </div>
                    <div className="tamanho-div d-grid gap-2 d-md-flex justify-content-md-end mb-2">
                        <button type="button" className="btn btn-outline-danger">Voltar</button>
                        <button type="submit" className="btn btn-outline-success">Enviar</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Agendamento;