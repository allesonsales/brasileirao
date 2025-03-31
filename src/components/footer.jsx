import { useContext, useState } from "react"
import { providerContext } from "../provider"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import './style.css'

const Footer = () => {
    const [mouseEnter, setMouseEnter] = useState(false)
    const navigate = useNavigate()

    const handleMouseEnter = () => {
        setMouseEnter(true)
    }

    const handleMouseLeave = () => {
        setMouseEnter(false) 
    }

    const handleReload = () => {
        navigate('/brasileirao', { replace: true })
        window.location.reload()
    }

    return (
        <div className={`footer ${mouseEnter ? 'show' : 'hidden'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <span onClick={handleReload}><i class="bi bi-incognito"></i>Trocar de time</span>
        </div>
    )
}

export default Footer
