import { useEffect } from "react"

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Calendar from "../../components/Calendar/Calendar"

const Home = () => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/signin")
        }
    }, [navigate, isAuthenticated])


    return (
        <>
            <Calendar/>
        </>
    )
}

export default Home