import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../componentes/home';
import Agendamento from '../site/Agendamento';

const Rotas = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>

                <Route exact path="/agendamento" component={Agendamento}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Rotas;