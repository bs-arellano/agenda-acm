import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { backend_url } from '../../constans/constants'

const Signup = () => {
    const navigate = useNavigate()

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [navigate, isAuthenticated])

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "name": name,
            "email": email,
            "password": password
        }
        try {
            const response = await fetch(`${backend_url}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            if (response.status == 201) {
                navigate("/signin")
            }
            else { throw new Error('Error al iniciar sesion') }
        } catch (e) {
            navigate("/signup")
        }
    };

    return (
        <>
            <h1>Registrarse</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <br />
                <label>
                    Correo electrónico:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit">Registrarse</button>
            </form>
            <Link to={"/signin"}>Iniciar sesión</Link>
        </>
    );

}

export default Signup