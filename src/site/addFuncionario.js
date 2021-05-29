import React, { Component } from 'react';
import api from '../services/api';
import '../App.css';
import '../bootstrap.css';
import Alerta from '../componentes/alerta';
import {Link} from 'react-router-dom';
import Logo from '../componentes/logo';

class AddFuncionario extends Component{
    constructor(props){
        super(props);
        this.state = {
            arrfuncionario: [],
            nomeFuncionario: '',
            status: false  
        }
        this.setForm = this.setForm.bind(this);
        this.onSave = this.onSave.bind(this); 
    }

    async componentDidMount() {
        this.getFuncionarios();
    }

    onSave = async () => {
        const response = await api.post('integrante', {
            nome: this.state.nomeFuncionario,
        });

        if(response.status === 200){

            this.setState({nomeFuncionario: ''});
            this.getFuncionarios();
            this.setState({status: true});
        }else{
            this.setState({status: false});
        }
    }

    async getFuncionarios(){
        const response4 = await api.get('integrante');
        this.setState({ arrfuncionario: response4.data });
    }

    setForm(e){
        let dados = e.target.value;
        this.setState({nomeFuncionario: dados});
        this.setState({status: false});
    }

    render(){
        return (
            <div>
                <Logo/>
                <div className='card shadow-sm'>
                    <div className='mb-3 mt-3'>
                        <h5 className='card-title text-center'> Adicionar Funcionário </h5>
                        
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
                            
                            <label className="tamanho-input">&nbsp;Funcionários já Cadastrados</label>
                            <select onChange={this.setForm} className="form-select mb-3 tamanho-input">
                                <option >{"Funcionários"}</option>
                                {
                                    this.state.arrfuncionario.map((item)=>
                                            <option key={item.id} value={item.id}>{item.nome}</option> 
                                    )
                                }
                            </select>

                            <label className="tamanho-input">&nbsp;Adicionar Funcionário</label>
                            <input onChange={this.setForm} value={this.state.nomeFuncionario} className="form-control mb-3 tamanho-input" type="text" placeholder="Nome do novo funcionário"/>

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

export default AddFuncionario;