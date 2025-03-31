import { useState, useEffect, useContext } from "react";
import Loading from "../../components/loading/loading";
import './style.css'
import { providerContext } from "../../provider";

const Estatisticas = () => {
    const { timeSelecionado } = useContext(providerContext)
    const [estatistica, setEstatistica] = useState(null)
    const [estatisticaTime, setEstatisticaTime] = useState(null)
    const [empates, setEmpates] = useState(0)
    const [vitorias, setVitorias] = useState(0)
    const [derrotas, setDerrotas] = useState(0)
    const [aproveitamento, setAproveitamento] = useState(0)

    useEffect(() => {
        fetch('https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/competitions/BSA/scorers?season=2025', {
            method: 'GET',
            headers: {
                'X-Auth-Token': import.meta.env.VITE_API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            setEstatistica(data);

        })
        .catch(error => {console.error("erro:", error)})
    }, [timeSelecionado])

    useEffect(() => {
        fetch('https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/competitions/BSA/matches?season=2025', {
            method: 'GET',
            headers: {
                'X-Auth-Token': import.meta.env.VITE_API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            setEstatisticaTime(data);

            let totalEmpate = 0
            let totalDerrotas = 0
            let totalVitorias = 0

            data.matches.forEach(partida => {
                if (partida.score.fullTime.home === null || partida.score.fullTime.away === null) {
                    return
                }

                const timeCasa = partida.homeTeam.name === timeSelecionado.name
                const timeFora = partida.awayTeam.name === timeSelecionado.name

                if(timeCasa || timeFora) {
                    if (partida.score.fullTime.home === partida.score.fullTime.away) {
                        totalEmpate++
                    } else if (timeCasa && partida.score.fullTime.home > partida.score.fullTime.away) {
                        totalVitorias++
                    } else if (timeFora && partida.score.fullTime.away > partida.score.fullTime.home) {
                        totalVitorias++
                    } else {
                        totalDerrotas++
                    }
                }
            })
            setEmpates(totalEmpate)
            setDerrotas(totalDerrotas)
            setVitorias(totalVitorias)

            const totalJogos = totalDerrotas + totalEmpate + totalVitorias

            if (totalJogos > 0) {
                const pontosGanhos = totalVitorias * 3 + totalEmpate
                const pontosPossiveis = totalJogos *3
                const calculoAproveitamento = ((pontosGanhos / pontosPossiveis) * 100).toFixed(2)

                setAproveitamento(calculoAproveitamento)
            }
        })
        .catch(error => {console.error("erro:", error)})
    }, [timeSelecionado])

    if (!estatistica || estatistica.scorers.length === 0) {
        return (
            <>
                <Loading />
                <p>Em breve as estatistícas estarão disponíveis...</p>
            </>
    )}

    return (
        <>
        <section id="estatisticas">
        <div className="estatisticaTime">
            <span>Vitórias: {vitorias}</span>
            <span>Empates: {empates}</span>
            <span>Derrotas: {derrotas}</span>
            <small>Aproveitamento {aproveitamento}%</small>
        </div>
        <div className="estatisticasGrid">
        <h2>Artilheiros</h2>
        <table>
                <thead>
                    <tr>
                        <th>Clube</th>
                        <th>Jogador</th>
                        <th>Gols</th>
                        <th>Assistências</th>
                    </tr>
                </thead>
                <tbody>
                {estatistica && estatistica.scorers.map (({ player,goals, team, assists },  index) => {
                    return (
                        <tr className="artilheiro" key={index}>
                        <td><img src={team.crest} alt="" /></td>
                        <td>{player.name}</td>
                        <td>{goals}</td>
                        <td>{assists || 0}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
        </section>
        </>
    )
}

export default Estatisticas