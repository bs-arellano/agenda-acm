import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { signin } from "../../reducers/authSlice"
import { backend_url } from "../../constans/constants"

const Signin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [navigate, isAuthenticated])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "email": email,
            "password": password
        }
        try {
            const response = await fetch(`${backend_url}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            if (response.status == 200) {
                const payload = await response.json()
                dispatch(signin(payload))
            } else {
                throw new Error('Error al iniciar sesion')
            }
        } catch (e) {
            navigate("/signin")
        }
    };

    return (
        <div className="page">
            <h1>Agenda ACM</h1>
            <form onSubmit={handleSubmit} className="form-auth">
                <h2>Iniciar sesión</h2>
                <label className="form-control">
                    Correo electrónico:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label className="form-control">
                    Contraseña:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit" className="btn-primary">Iniciar sesión</button>
            </form>
            <Link to={"/signup"}>Registrarse</Link>
        </div>
    );
}

export default Signin