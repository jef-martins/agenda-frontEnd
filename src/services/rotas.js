import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../componentes/home';
import Agendamento from '../site/Agendamento';
import Alteracao from '../site/Alteracao';
import AddFuncionario from'../site/addFuncionario';
import AddStatus from '../site/addStatus';

const Rotas = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>

                <Route exact path="/agendamento" component={Agendamento}/>
                <Route exact path="/alteracao/:id/:func/:status" component={Alteracao}/>
                <Route exact path="/addFuncionario" component={AddFuncionario}/>
                <Route exact path="/addStatus" component={AddStatus}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Rotas;