import React, { Component } from 'react';
import api from '../services/api';
import '../App.css';
import '../bootstrap.css';
import Alerta from '../componentes/alerta';
import {Link} from 'react-router-dom';
import Logo from '../componentes/logo';

class Alteracao extends Component{
    constructor(props){
        super(props);
        this.state = {
            arrfuncionario: [],
            arrAndamento: [],
            form: {
                idAtividade: '',
                atividade: '',
                idFuncionario: '',
                funcionario: '',
                idAndamento: '',
                andamento: '',
                observacao: '',
                fkData: ''
            },
            status: false  
        }
        this.setForm = this.setForm.bind(this);
        this.onSave = this.onSave.bind(this);  
    }

    async componentDidMount() {
        let dados = this.state.form;

        const response = await api.get('tarefa/'+this.props.match.params.id);
        dados['idAtividade'] = response.data.id;
        dados['atividade'] = response.data.atividade;
        dados['observacao'] = response.data.observacao;
        dados['fkData'] = response.data.fkData;

        const response2 = await api.get('integrante/'+this.props.match.params.func);
        dados['idFuncionario'] = response2.data.id;
        dados['funcionario'] = response2.data.nome;

        const response3 = await api.get('status/'+this.props.match.params.status);
        dados['idAndamento'] = response3.data.id;
        dados['andamento'] = response3.data.andamento;

        this.setState({form: dados});

        //bloco daqui até o escopo da função preenche o obj form que fará o update no sistema
        /*************************************************************************************/
        //bloco daqui até o fim da função apenas recebe alguns valores do banco para caso tenha atualização

        const response4 = await api.get('integrante');
        this.setState({ arrfuncionario: response4.data });

        const response5 = await api.get('status');
        this.setState({ arrAndamento: response5.data });
    }

    onSave = async () => {
        const response = await api.put('tarefa/'+this.state.form.idAtividade, {
            atividade: this.state.form.atividade,
            observacao: this.state.form.observacao,
            fkIntegrante: this.state.form.idFuncionario,
            fkData: this.state.form.fkData,
            fkStatus: this.state.form.idAndamento
        });

        if(response.status === 200){
                this.setState({status: true});
                
            }else{
                this.setState({status: false});
            }
    }

    setForm(e){
        let dados = this.state.form;

        dados[e.target.name] = e.target.value;
        this.setState({form: dados});
        this.setState({status: false});
    }

    render(){
        return (
            <div>
                <Logo/>
                <div className='card shadow-sm'>
                    <div className='mb-3 mt-3'>
                        <h5 className='card-title text-center'> Tela de Alteração </h5>
                        
                        <div className="mb-3 mt-3">
                            {
                                this.state.status &&
                                    <div className="row mt-3">
                                        <div className='col-10 offset-1 text-center'>
                                            <Alerta tipo='success' texto='tarefa cadastrada com Sucesso!'/>
                                        </div>
                                    </div>
                            }
                        </div> 

                        <form>

                            <input onChange={this.setForm} value={this.state.form.atividade} name="atividade" className="form-control mb-3 tamanho-input" type="text" placeholder="Nome da Atividade"/>
                            
                            <label className="tamanho-input">&nbsp;Funcionário Responsável</label>
                            <select onChange={this.setForm} name="idFuncionario" className="form-select mb-3 tamanho-input">
                                {
                                    this.state.arrfuncionario.map((item)=>
                                        this.state.form.idFuncionario !== item.id ?
                                            <option key={item.id} value={item.id}>{item.nome}</option> 
                                        :
                                        <option selected key={this.state.form.idFuncionario} value={this.state.form.idFuncionario}>{this.state.form.funcionario}</option>
                                    )
                                }
                            </select>

                            <label className="tamanho-input">&nbsp;Status Atual</label>
                            <select onChange={this.setForm} name="idAndamento" className="form-select mb-3 tamanho-input">
                                {
                                    this.state.arrAndamento.map((item)=>
                                        this.state.form.idAndamento !== item.id ?
                                            <option key={item.id} value={item.id}>{item.andamento}</option>
                                        :
                                        <option selected key={this.state.form.idAndamento} value={this.state.form.idAndamento}>{this.state.form.andamento}</option>
                                    )
                                }
                            </select>

                            <div className="input-group tamanho-input">
                                <span className="input-group-text">Observação</span>
                                <textarea onChange={this.setForm} value={this.state.form.observacao} name="observacao" className="form-control"></textarea>
                            </div>
                            
                            <div className="tamanho-div d-grid gap-2 d-md-flex justify-content-md-end mb-2 mt-3">
                                <Link to="/" type="button" className="btn btn-outline-danger">Voltar</Link>
                                <button onClick={this.onSave} type="button" className="btn btn-outline-success">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Alteracao;