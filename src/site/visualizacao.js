import React, { Component } from 'react';
import api from '../services/api';
import '../App.css';
import '../bootstrap.css';
import {Link} from 'react-router-dom';
import Logo from '../componentes/logo';
import pencil from '../images/pencil-fill.svg';
import trash from '../images/trash-fill.svg';
import calendario from '../images/calendar-plus.svg';
//import relatorio from '../images/clipboard-data.svg';
//import filtro from '../images/funnel-fill.svg';
import lupa from '../images/search.svg';
import close from '../images/close.svg';
import left from '../images/caret-left.svg';
import right from '../images/caret-right.svg';
import add from '../images/sign.svg';
import file from '../images/file.svg';


class Visualizacao extends Component {
    constructor(props){
        super(props);
        this.state = {
            tarefas: [],
            mesN: new Date().getMonth() + 1,//para iniciar a contagem do mês
            mes: '',
            statusPesquisa: false,
            pesquisa: ''
        }
        this.changePesquisar = this.changePesquisar.bind(this); 
        this.atualizaGrid = this.atualizaGrid.bind(this);
        this.subMes = this.subMes.bind(this); 
        this.somaMes = this.somaMes.bind(this); 
        this.somaMes = this.somaMes.bind(this); 
        this.pesquisar = this.pesquisar.bind(this); 
        this.fecharPesquisa = this.fecharPesquisa.bind(this); 
    }

    async componentDidMount() {
        this.atualizaGrid();
        
        await this.verificaMes();
    }

     async excluir(id, fkData) {
        if(window.confirm("Deseja realmente excluir esse registro?")){
            await api.delete('tarefa/'+id);
            await api.delete('data/'+fkData);

            await this.atualizaGrid();
        }
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

        if(this.state.statusPesquisa === true)
            await this.fecharPesquisa();
    }

    async somaMes(){
        if(this.state.mesN < 12)
            this.setState({mesN: this.state.mesN + 1});
        //bloco de comando que atualiza o grid(por alguma razao o react parece que atuliza atrasado)
        await this.verificaMes();
        await this.atualizaGrid();
        await this.verificaMes();

        if(this.state.statusPesquisa === true)
            await this.fecharPesquisa();
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
        }else if(this.state.mesN === 12){
            mes =  "Dezembro";
        }else{
            mes = "Pesquisa"
        }
        this.setState({mes: mes});
    }

    mostraData(item){
        let dia, mes, ano;//new Date(item.dia).toLocaleDateString("pt-br")
        dia = item.substr(-2,2);
        mes = item.substr(0,7);mes = mes.substr(-2,2);
        ano = item.substr(0,4)
        return dia+"/"+mes+"/"+ano;
    }

    async pesquisar(){
        let param = this.state.pesquisa;
        if(this.state.pesquisa.length > 0) {  
            this.setState({statusPesquisa: true});
            if(this.state.pesquisa.indexOf("/") !== -1){//formatar a data para igualar com o que está salvo no banco
                let dia, mes, ano;
                dia = param.substr(0,2);
                mes = param.substr(0,5);mes = mes.substr(-2,2);
                ano = param.substr(-4,4)
                param = ano+"-"+mes+"-"+dia;
            }
            const response = await api.get('tarefa/pesquisa/filtro/'+param);
            this.setState({tarefas: response.data});

            this.setState({mesN: 0});
            await this.verificaMes();
            await this.verificaMes();
        }
    }

    async fecharPesquisa(){  
        this.setState({pesquisa: ''}); 
        this.setState({statusPesquisa: false})
        this.setState({mesN: new Date().getMonth() + 1})
        
        await this.verificaMes();
        await this.atualizaGrid();
        await this.verificaMes();
    }

    changePesquisar(e){
        this.setState({pesquisa: e.target.value});
    }

    atraso(item, item2, item3){
        let d = new Date();
        let dia, mes, ano, data, hora, min, seg, tempo;

        dia = d.getDate();
        if (dia < 10)
            dia = '0'+dia

        mes = d.getMonth();
        if (mes < 10)
            mes = '0'+ (mes+1)

        ano = d.getUTCFullYear();
        data = ano+'-'+ mes+'-'+dia;

        hora = d.getHours(); 
        if (hora < 10)
            hora = '0'+hora;
        
        min = d.getMinutes();
        if (min < 10)
            min = '0'+min;
        
        seg = d.getSeconds();
        if (seg < 10)
            seg = '0'+seg;

        tempo = hora+':'+min+':'+seg;

        const data1 = new Date(item+' ' + item2);
        const data2 = new Date(data+' ' + tempo);

        if (new Date(data1).getTime() < new Date(data2).getTime() && item3 !== 'Concluído')
            return true;
        else 
            return false;
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
                                        {/* 
                                        <button type="button" className="btn btn-outline-secondary"><img src={relatorio} alt='Relatório'/></button>
                                        <button type="button" className="btn btn-outline-secondary"><img src={filtro} alt='Filtrar'/></button>
                                         */}
                                        <Link to={`/addFuncionario`} type="button" className="btn btn-outline-secondary"><img src={add} alt='Adicionar Funcionario'/></Link>
                                        <Link to={`/addStatus`} type="button" className="btn btn-outline-secondary"><img src={file} alt='Adicionar Status'/></Link>
                                    </div>
                                    
                                    <div className="input-group">
                                        <input onChange={this.changePesquisar} value={this.state.pesquisa} name="txtPesquisa" type="text" className="form-control" placeholder="Pesquisar"/>
                                        {
                                            this.state.statusPesquisa ?
                                                <button onClick={this.fecharPesquisa} className="input-group-text"><img src={close} alt='Cancelar'/></button>
                                            :
                                                <button onClick={this.pesquisar} className="input-group-text"><img src={lupa} alt='Pesquisar'/></button>
                                        }        
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
                                            <tr key={item.id} style={{ color: 
                                                                        this.atraso(item.dia, item.hrFinal, item.andamento) && 
                                                                        'red'//.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
                                                                    }}>
                                                <td> {item.atividade} </td>
                                                <td> {item.nome} </td>
                                                <td className='text-center'>{this.mostraData(item.dia)}</td>
                                                <td className='text-center'> {item.hrInicial.substr(0,5)} </td>
                                                <td className='text-center'> {item.hrFinal.substr(0,5)} </td>
                                                <td> {item.andamento} </td>
                                                <td> {item.observacao} </td>
                                                <td className='text-center'>  
                                                    <Link to={`/alteracao/`+item.id+`/`+item.fkIntegrante+`/`+item.fkStatus} className="link btn btn-outline-light">
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
