import { useSpring, animated } from "@react-spring/web"
import './style.css'

const Loading = () => {
        const estilo = useSpring({
            loop: true,
            from: { rotateZ: 0},
            to: { rotateZ: 360},
            config: { duration: 1000 },
        })

        return (
            <div className="loader-container">
                <animated.div className="loader" style={estilo}/>
            </div>
        )
}

export default Loading