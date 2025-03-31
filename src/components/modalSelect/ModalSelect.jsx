import { createContext, useContext, useEffect, useState } from "react"
import { providerContext } from "../../provider"
import './style.css'
import Loading from "../loading/loading"
export const SelecionadoProvider = createContext()

const ModalSelect = ({ children }) => {
    const { campeonato, fecharModal, fetchTime, modalOpen, timeSelecionado, timeConfirmado, selecionarImagem, setModalOpen } = useContext(providerContext)
    
    const handleButtonClick = () => {
        setModalOpen(false)
        fetchTime() 
    }

    if(!campeonato) {
        return (
            <Loading />
        )
    }

    return (
        <>
        {modalOpen && (
            <div className="backgroundModal">
                <div className="boxSelect">
                    <span>Selecione o seu time:</span>
                    <p>Bem vindo ao Brasileirão na palma da mão, aqui você encontra os números do seu time.</p>
                    {timeSelecionado && (
                        <img src={timeSelecionado.crest} alt={timeSelecionado.name} />
                    )}
                    <select onChange={selecionarImagem}>
                        {campeonato && campeonato.teams.sort((a,b) => a.name.localeCompare(b.name)).map(({shortName, name}, index) => 
                            <option key={index} value={shortName}>{name}</option>
                        ).sort()}
                    </select>
                    <button onClick={handleButtonClick}>Esse é o meu time!</button>
                </div>
            </div>
        )}
        <SelecionadoProvider.Provider value={{ timeConfirmado }}>
            {children}
        </SelecionadoProvider.Provider>
        </>
    )
}

export default ModalSelect