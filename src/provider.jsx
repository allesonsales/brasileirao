import { createContext, useEffect, useState } from "react"
export const providerContext = createContext()

const Provider = ({ children }) => {

    const [campeonato, setCampeonato] = useState(null)
    const [timeSelecionado, setTimeSelecionado] = useState(null)
    const [modalOpen, setModalOpen] = useState(true)
    const [timeConfirmado, setTimeConfirmado] = useState(null)

    const selecionarImagem = (e) => {
        const timeValue = e.target.value
        const timefinal = campeonato.teams.find(equipe => equipe.shortName === timeValue)
        setTimeSelecionado(timefinal)
    }

    const fecharModal = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        fetch('https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/competitions/BSA/teams', {
            method: 'GET',
            headers: {
                'X-Auth-Token': 'b7b6db3407ea451aa7857595a5307f2b'
            }
        })
        .then(response => response.json())
        .then(data => {
            setCampeonato(data)
        })
        .catch(error => {
            console.error('Erro na requisição:', error); 
        });
},[])

const fetchTime = () => {
    if (timeSelecionado) {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/teams/${timeSelecionado.id}/matches/`, {
            method: 'GET',
            headers: {
                'X-Auth-Token': 'b7b6db3407ea451aa7857595a5307f2b'
            }
        })
        .then(response => response.json())
        .then(data => {
            setTimeConfirmado(data)
        })
        .catch(error => console.error("erro", error))
    }
}

return (
    <providerContext.Provider value={{ campeonato, fetchTime, fecharModal, selecionarImagem, timeSelecionado, timeConfirmado, modalOpen, setModalOpen }}>
        {children}
    </providerContext.Provider>
)
}

export default Provider