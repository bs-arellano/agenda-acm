import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Calendar from "../../components/Calendar/Calendar"
import ListEvents from "../../components/Event/ListEvents"
import "./home.css"

const Home = () => {
    const navigate = useNavigate()
    const [viewingDate, setViewingDate] = useState(new Date())
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const handleDateChange = (date) => {
        setViewingDate(date)
    }
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/signin")
        }
    }, [navigate, isAuthenticated])


    return isAuthenticated?(
        <div className="home">
            <Calendar changeDate={handleDateChange} />
            <ListEvents date={viewingDate} />
        </div>
    ):null
}

export default Home