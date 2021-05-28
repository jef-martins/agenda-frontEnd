import React, { Component } from 'react';
import api from '../services/api';
import '../App.css';
import '../bootstrap.css';
import {Link} from 'react-router-dom';
import Logo from '../componentes/logo';
import pencil from '../images/pencil-fill.svg';
import trash from '../images/trash-fill.svg';
import calendario from '../images/calendar-plus.svg';
import relatorio from '../images/clipboard-data.svg';
import filtro from '../images/funnel-fill.svg';
import lupa from '../images/search.svg';
import left from '../images/caret-left.svg';
import right from '../images/caret-right.svg';
import sign from '../images/sign.svg';


class Visualizacao extends Component {
    constructor(props){
        super(props);
        this.state = {
            tarefas: [],
            mesN: new Date().getMonth() + 1,//para iniciar a contagem do mês
            mes: ''
        }
        this.verificaMes = this.verificaMes.bind(this); 
        this.atualizaGrid = this.atualizaGrid.bind(this);
        this.subMes = this.subMes.bind(this); 
        this.somaMes = this.somaMes.bind(this); 
    }

    async componentDidMount() {
        this.atualizaGrid();
        
        await this.verificaMes();
    }

     async excluir(id, fkData) {
        await api.delete('tarefa/'+id);
        await api.delete('data/'+fkData);

        await this.atualizaGrid();
    } 

    async atualizaGrid() {
        const response = await api.get('tarefa/'+new Date().getFullYear()+'-'+this.state.mesN+'-1/'
        +new Date().getFullYear()+'-'+this.state.mesN+'-31');

        this.setState({ tarefas: response.data });
    }

    async subMes(){
        if(this.state.mesN > 1)
            this.setState({mesN: this.state.mesN - 1});
        //bloco de comando que atualiza o grid(por alguma razao o react parece que atuliza atrasado)
        await this.verificaMes();
        await this.atualizaGrid();
        await this.verificaMes();
        
    }

    async somaMes(){
        if(this.state.mesN < 12)
            this.setState({mesN: this.state.mesN + 1});
        //bloco de comando que atualiza o grid(por alguma razao o react parece que atuliza atrasado)
        await this.verificaMes();
        await this.atualizaGrid();
        await this.verificaMes();
    }

    async verificaMes(){
        let mes;

        if (this.state.mesN === 1){
            mes =  "Janeiro";
        }else if(this.state.mesN === 2){
            mes =  "Fevereiro";
        }else if(this.state.mesN === 3){
            mes =  "Março";
        }else if(this.state.mesN === 4){
            mes =  "Abril";
        }else if(this.state.mesN === 5){
            mes =  "Maio";
        }else if(this.state.mesN === 6){
            mes =  "Junho";
        }else if(this.state.mesN === 7){
            mes =  "Julho";
        }else if(this.state.mesN === 8){
            mes =  "Agosto";
        }else if(this.state.mesN === 9){
            mes =  "Setembro";
        }else if(this.state.mesN === 10){
            mes =  "Outubro";
        }else if(this.state.mesN === 11){
            mes =  "Novembro";
        }else{
            mes =  "Dezembro";
        }
        this.setState({mes: mes});
    }

    render(){
        return (
            <div>
                <Logo/>
                <div className="row mt-3">
                    <div className='col-12'>
                        <div className='card shadow-sm'>
                            <div className='card-body'>
                                <h5 className='card-title text-center'> Lista de Atividades </h5>

                                <div className="btn-toolbar justify-content-between mb-3 mt-3" role="toolbar">
                                    <div className="btn-group" role="group" aria-label="First group">
                                        <Link to={`/agendamento`} type="button" className="btn btn-outline-secondary"><img src={calendario} alt='Adicionar Tarefa'/></Link>
                                        <button type="button" className="btn btn-outline-secondary"><img src={relatorio} alt='Relatório'/></button>
                                        <button type="button" className="btn btn-outline-secondary"><img src={filtro} alt='Filtrar'/></button>
                                        <button type="button" className="btn btn-outline-secondary"><img src={sign} alt='Entrar'/></button>
                                    </div>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Pesquisar"/>
                                        <button className="input-group-text"><img src={lupa} alt='Pesquisar'/></button>
                                    </div>
                                    
                                    <div className="input-group">
                                        <button onClick={this.subMes} className="btn btn-primary btn-sm"><img src={left} alt='Esquerda'/></button>
                                        <span className="input-group-text">{this.state.mes}</span>
                                        <button onClick={this.somaMes} className="btn btn-primary btn-sm"><img src={right} alt='Direita'/></button>
                                    </div>
                                </div>
                               
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Atividade</th>
                                            <th>Funcionário</th>
                                            <th className='text-center'>Dia</th>
                                            <th className='text-center'>hora Inicio</th>
                                            <th className='text-center'>hora Término</th>
                                            <th>Status</th>
                                            <th>Observação</th>
                                            <th className='text-center'>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.tarefas.map(item => (
                                            <tr key={item.id}>
                                                <td> {item.atividade} </td>
                                                <td> {item.nome} </td>
                                                <td className='text-center'> {new Date(item.dia).toLocaleDateString()} </td>
                                                <td className='text-center'> {item.hrInicial.substr(0,5)} </td>
                                                <td className='text-center'> {item.hrFinal.substr(0,5)} </td>
                                                <td> {item.andamento} </td>
                                                <td> {item.observacao} </td>
                                                <td className='text-center'>  
                                                    <Link to={`/`} className="link btn btn-outline-light">
                                                        <img className="" src={pencil} alt='Editar'/>
                                                    </Link>   

                                                    <button onClick={()=>this.excluir(item.id,item.fkData)} type="button" className="btn btn-outline-light">
                                                        <img className="" src={trash} alt='Excluir'/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Visualizacao;
