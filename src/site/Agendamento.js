import '../App.css';
import '../bootstrap.css';


function Agendamento() {
    return (
        <div>
            <form>
            <input className="form-control mb-3 mt-3 tamanho-input" type="text" placeholder="Nome da Atividade"/>
            
            <select className="form-select mb-3 tamanho-input">
                <option selected>Funcionário</option>
                <option value="1">Jefferson</option>
                <option value="2">Andú</option>
            </select>
            
            <label className="tamanho-input">&nbsp;Escolha o dia da atividade</label>
            <input className="form-control mb-3 tamanho-input" type="date"></input>

            <label className="tamanho-input">&nbsp;Escolha o horário da atividade</label>
            <div className="input-group tamanho-div mb-3">
                <input className="form-control" type="time"></input>
                <span className="input-group-text">à</span>
                <input type="time" className="form-control"></input>
            </div>
            <div className="tamanho-div d-grid gap-2 d-md-flex justify-content-md-end mb-2">
                <button type="button" class="btn btn-outline-danger">Voltar</button>
                <button type="button" class="btn btn-outline-success">Enviar</button>
            </div>
            </form>
        </div>
    );
}

export default Agendamento;