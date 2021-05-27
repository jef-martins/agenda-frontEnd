import React, { Component } from 'react';
import api from '../services/api';
import '../App.css';
import '../bootstrap.css';
import Alerta from '../componentes/alerta';

class Agendamento extends Component {
    constructor(props){
        super(props);
        this.state = {
            funcionario: [],
            data: [],
            form: {
                atividade: '',
                funcEscolhido: '',
                data: '',
                hrInicial: '',
                hrFinal: ''
            },
            status: false      
        }
        this.setForm = this.setForm.bind(this);
        this.onSave = this.onSave.bind(this);  
    }

    setForm(e){
        let dados = this.state.form;

        dados[e.target.name] = e.target.value;
        this.setState({form: dados});
    }

    async componentDidMount() {
        const response = await api.get('integrante');
        this.setState({ funcionario: response.data });

        const response2 = await api.get('data');
        this.setState({ data: response2.data });
    }

    onSave = async () => {
        const response = await api.post('data', {
            dia: this.state.form.data,
            hrInicial: this.state.form.hrInicial,
            hrFinal: this.state.form.hrFinal
        });
        
        if(response.status === 200){
            const response2 = await api.post('tarefa', {
                atividade: this.state.form.atividade,
                fkIntegrante: this.state.form.funcEscolhido,
                fkData: this.state.data[this.state.data.length - 1].id,
                fkStatus: 1
            });

            if(response2.status === 200)
                this.setState({status: !this.state.status});
        }
    }

    render(){
        return (
            <div>
                <div>
                    {
                        this.state.status &&
                            <div className="row mt-3">
                                <div className='col-10 offset-1 text-center'>
                                    <Alerta tipo="success" texto="tarefa cadastrada com Sucesso!"/>
                                </div>
                            </div>
                    }
                </div>
                <form>
                    <input value={this.state.form.atividade} onChange={this.setForm} name="atividade" className="form-control mb-3 tamanho-input" type="text" placeholder="Nome da Atividade"/>
                    
                    <select onChange={this.setForm} name="funcEscolhido" className="form-select mb-3 tamanho-input">
                        <option defaultValue>Funcionário</option>
                        {
                            this.state.funcionario.map((item)=>
                                <option key={item.id} value={item.id}>{item.nome}</option>
                                
                            )
                        }
                    </select>
                    
                    <label className="tamanho-input">&nbsp;Escolha o dia da atividade</label>
                    <input value={this.state.form.data} onChange={this.setForm} name="data" className="form-control mb-3 tamanho-input" type="date"></input>

                    <label className="tamanho-input">&nbsp;Escolha o horário da atividade</label>
                    <div className="input-group tamanho-div mb-3">
                        <input value={this.state.form.hrInicial} onChange={this.setForm} name="hrInicial" className="form-control" type="time"></input>
                        <span className="input-group-text">à</span>
                        <input value={this.state.form.hrFinal} onChange={this.setForm} name="hrFinal" type="time" className="form-control"></input>
                    </div>
                    <div className="tamanho-div d-grid gap-2 d-md-flex justify-content-md-end mb-2">
                        <button type="button" className="btn btn-outline-danger">Voltar</button>
                        <button onClick={this.onSave} type="button" className="btn btn-outline-success">Enviar</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Agendamento;