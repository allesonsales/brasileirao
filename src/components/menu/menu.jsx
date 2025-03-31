import { useContext, useState } from "react"
import './style.css'
import { Link } from "react-router-dom"
import { providerContext } from "../../provider"

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { timeSelecionado } = useContext(providerContext)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <nav>
            {timeSelecionado ? <img src={timeSelecionado?.crest} alt={timeSelecionado.name} /> :
            <img src="/brasileirao/logo2.png" alt="Brasileirão" />}
            <div className="menuMobile" onClick={toggleMenu}>
                {menuOpen ? <i className="bi bi-x"></i> : <i className="bi bi-list"></i>}
                {menuOpen ? (
                    <ul>
                        <li> <Link to="/tabela">Tabela</Link> </li>
                        <li> <Link to="/elenco">Elenco</Link> </li>
                        <li> <Link to="/estatisticas">Estatisticas</Link> </li>
                        <li> <Link to="/agenda">Agenda</Link> </li>
                    </ul>
            ) : null}
            </div> 
            <div className="menuDesktop">
                <ul>
                    <li> <Link to="/tabela">Tabela</Link> </li>
                    <li> <Link to="/elenco">Elenco</Link> </li>
                    <li> <Link to="/estatisticas">Estatisticas</Link> </li>
                    <li> <Link to="/agenda">Agenda</Link> </li>
                </ul>
            </div>     
        </nav>
    )
}

export default Menu