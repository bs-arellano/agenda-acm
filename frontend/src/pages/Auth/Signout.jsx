import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signout } from "../../reducers/authSlice"
import { useEffect } from "react"

const Signout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(signout())
        navigate("/signin")
    }, [dispatch, navigate])
}

export default Signout