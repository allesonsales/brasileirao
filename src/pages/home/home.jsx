import { useContext, useEffect } from "react"
import { providerContext } from "../../provider"
import { SelecionadoProvider } from "../../components/modalSelect/ModalSelect"
import Loading from "../../components/loading/loading"
import './style.css'


const Home = () => {    
    const { campeonato, timeConfirmado, timeSelecionado } = useContext(providerContext)
    useEffect(() => {
        if (timeConfirmado) {
            const className = timeSelecionado.shortName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')
            document.body.classList = ''
            document.body.classList.add(timeSelecionado.shortName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-' ))
        }
    }, [timeConfirmado])
    
    return (
        <>
            <div className="backgroundHome">
                <img src={timeSelecionado?.crest}/>
            </div>
            <p>{timeConfirmado ? `Bem-vindo torcedor do ${timeSelecionado.name}!` : <Loading />}</p>
            <div className="footerAviso">
                <small>Se quiser trocar de time, é só passar o mouse aqui a qualquer momento...</small>
                <i class="bi bi-hand-index"></i>
            </div>
        </>
    )
}
export default Home