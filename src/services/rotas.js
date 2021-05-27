import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Visualizacao from '../site/visualizacao';
import Home from '../componentes/home';

const Rotas = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>

                <Route exact path="/visualizacao" component={Visualizacao}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Rotas;