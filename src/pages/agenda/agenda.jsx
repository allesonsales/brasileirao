import { useContext } from "react"
import { providerContext } from "../../provider"
import './style.css'

const Agenda = () => {
    const { timeSelecionado, timeConfirmado } = useContext(providerContext)

    const partidas = timeConfirmado.matches.filter((partida) => partida.competition.code === "BSA")

    return (
        <>
        <div className="gridPartidas">
            {partidas.map(({ awayTeam, homeTeam, score, utcDate }, index) => {
                return (
                    <div className="partida" key={index}>
                        <span>Rodada {index + 1}</span>
                        {homeTeam.name === timeSelecionado.name ? <small>Jogo em casa</small> : <small>Fora de casa</small>}
                        <div className="times">
                            <div className="casa">
                                <img src={homeTeam.crest} alt={homeTeam.name} />
                                <span>{homeTeam.name}</span>
                            </div>
                            <div className="placar">
                                <span>{score?.fullTime?.home ?? "0"}</span>
                                <i className="bi bi-x-lg"></i>
                                <span>{score?.fullTime?.away ?? "0"}</span>
                            </div>
                            <div className="visitante">
                                <img src={awayTeam.crest} alt={awayTeam.name} />
                                <span>{awayTeam.name}</span>
                            </div>
                        </div>
                        <small>{new Date(utcDate).toLocaleString('pt-BR', {day: 'numeric', month:'long' ,hour: '2-digit', minute: '2-digit', hour12: false})}</small>
                    </div>
                );
            })}
        </div>
        </>
    )
}

export default Agenda
