import { useContext } from "react"
import { providerContext } from "../../provider"
import './style.css'

const Elenco = () => {
    const { timeSelecionado } = useContext(providerContext)

    const goleiros = timeSelecionado.squad.filter(jogador => jogador.position === "Goalkeeper")
    const defesa = timeSelecionado.squad.filter(jogador => jogador.position === "Defence")
    const meioCampo = timeSelecionado.squad.filter(jogador => jogador.position === "Midfield")
    const ataque = timeSelecionado.squad.filter(jogador => jogador.position === "Offence")

    const positionTraduzido = (position) => {
        switch (position) {
            case "Goalkeeper":
                return "Goleiro"
            case "Defence":
                return "Defesa"
            case "Midfield":
                return "Meio-Campo"
            case "Offence":
                return "Ataque"
        }
    }

    return (
        <div className="gridElenco">
            {goleiros && goleiros.length > 0 && (
                <div className="posicaoGrid">
                    <div className="titulo">
                        <h2>Goleiros</h2>
                        <img className="imagemTitulo" src={timeSelecionado.crest} alt={timeSelecionado.name} />
                    </div>
                    <div className="posicao">
                        {goleiros.map(({name, position}, index) => (
                            <div className="jogador" key={index}>
                                <i className="bi bi-person-square"></i>
                                <span>{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {defesa && defesa.length >0 && (
                <div className="posicaoGrid">
                    <div className="titulo">
                        <h2>Defesa</h2>
                        <img className="imagemTitulo" src={timeSelecionado.crest} alt={timeSelecionado.name} />
                    </div>
                    <div className="posicao">
                        {defesa.map(({name, position}, index) => (
                            <div className="jogador" key={index}>
                                <i className="bi bi-person-square"></i>
                                <span>{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {meioCampo && meioCampo.length > 0 && (
                <div className="posicaiGrid">
                    <div className="titulo">
                        <h2>Meio-Campo</h2>
                        <img className="imagemTitulo" src={timeSelecionado.crest} alt={timeSelecionado.name} />
                    </div>
                    <div className="posicao">
                        {meioCampo.map(({name, position}, index) => (
                            <div className="jogador" key={index}>
                                <i className="bi bi-person-square"></i>
                                <span>{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {ataque && ataque.length > 0 && (
                <div className="posicaoGrid">
                    <div className="titulo">
                        <h2>Ataque</h2>
                        <img className="imagemTitulo" src={timeSelecionado.crest} alt={timeSelecionado.name} />
                    </div>
                    <div className="posicao">
                        {ataque.map(({name, position}, index) => (
                            <div className="jogador" key={index}>
                                <i className="bi bi-person-square"></i>
                                <span>{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

    )
}

export default Elenco