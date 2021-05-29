import React, { Component }from 'react';
import '../bootstrap.css';

class Alerta extends Component{
    /*constructor(props){
        super(props);
    }*/

    render(){
        return (
            <div className={`alert alert-${this.props.tipo}`}>
                {this.props.texto}
            </div>
        )
    }
}

export default Alerta;