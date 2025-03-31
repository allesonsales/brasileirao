import { useEffect, useState } from "react";
import './style.css';
import Loading from "../../components/loading/loading";

const Tabela = () => {
    const [tabela, setTabela] = useState(null);
    const [timesOrdenados, setTimesOrdenados] = useState([]);

    useEffect(() => {
        fetch('https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/competitions/BSA/standings?season=2025', {
            method: 'GET',
            headers: {
                'X-Auth-Token': 'b7b6db3407ea451aa7857595a5307f2b'
            }
        })
        .then(response => response.json())
        .then(data => {
            setTabela(data);

            const timesOrdenados = [...data.standings[0].table].sort((a, b) => {
                if (a.points !== b.points) {
                    return b.points - a.points;
                } else {
                    return a.team.shortName.localeCompare(b.team.shortName); // Ordena alfabeticamente em caso de empate
                }
            });

            setTimesOrdenados(timesOrdenados); // Atualiza o estado com a tabela ordenada
        })
        .catch(error => console.error("Erro ao carregar os dados:", error)); // Caso ocorra algum erro com a requisição
    }, []); 

    if (!tabela) {
        return (
            <>
            <Loading />
            <p>Carregando...</p>
            </>
        )
    }

    return (
        <section id="tabela">        
            <table>
                <thead>
                    <tr>
                        <th>P</th>
                        <th>Time</th>
                        <th>PG</th>
                        <th>J</th>
                        <th>V</th>
                        <th>E</th>
                        <th>D</th>
                        <th>GP</th>
                        <th>GC</th>
                        <th>SG</th>
                    </tr>
                </thead>
                <tbody>
                    {timesOrdenados.map(({ team: { shortName, crest }, goalsFor, goalsAgainst, playedGames, points, won, draw, lost }, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}º</td>
                                <td><img src={crest} alt={shortName} />{shortName}</td>
                                <td>{points}</td>
                                <td>{playedGames}</td>
                                <td>{won}</td>
                                <td>{draw}</td>
                                <td>{lost}</td>
                                <td>{goalsFor}</td>
                                <td>{goalsAgainst}</td>
                                <td>{goalsFor - goalsAgainst}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
};

export default Tabela;
